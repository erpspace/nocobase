# NocoBase Cluster Mode Implementation Plan

## Przegląd

Niniejszy dokument opisuje plan implementacji trybu klastrowego (multicore) dla
NocoBase, który umożliwi uruchamianie wielu instancji aplikacji z synchronizacją
stanu przez Redis. Implementacja będzie oparta na zmiennej środowiskowej
`CLUSTER_MODE=max`.

## Analiza Obecnego Stanu

### 1. Komponenty Wymagające Zmian

#### 1.1 Cache Manager (`packages/core/cache/`)

**Obecny stan:**

- Wspiera już Redis jako backend cache (`cache-manager-redis-yet`)
- Domyślnie używa pamięci (`memory`)
- Konfiguracja przez `CACHE_REDIS_URL`

**Wymagane zmiany:**

- W trybie klastrowym wymusić użycie Redis jako domyślnego store
- Dodać fallback do pamięci gdy Redis nie jest dostępny

#### 1.2 PubSub Manager (`packages/core/server/src/pub-sub-manager/`)

**Obecny stan:**

- Używa `MemoryPubSubAdapter` dla testów
- Brak implementacji Redis adaptera
- Komunikacja między instancjami niemożliwa

**Wymagane zmiany:**

- Implementacja `RedisPubSubAdapter`
- Automatyczne przełączanie na Redis w trybie klastrowym

#### 1.3 Event Queue (`packages/core/server/src/event-queue.ts`)

**Obecny stan:**

- `MemoryEventQueueAdapter` z Map/Set w pamięci
- Kolejki zapisywane do pliku przy zamknięciu
- Brak synchronizacji między instancjami

**Wymagane zmiany:**

- Implementacja `RedisEventQueueAdapter`
- Migracja stanu kolejek do Redis

#### 1.4 Lock Manager (`packages/core/lock-manager/`)

**Obecny stan:**

- `LocalLockAdapter` z Mutex w pamięci
- Brak dystrybuowanych locków

**Wymagane zmiany:**

- Implementacja `RedisLockAdapter`
- Wsparcie dla dystrybuowanych locków

#### 1.5 WebSocket Server (`packages/core/server/src/gateway/ws-server.ts`)

**Obecny stan:**

- `webSocketClients = new Map<string, WebSocketClient>()`
- Stan klientów w pamięci instancji

**Wymagane zmiany:**

- Synchronizacja stanu klientów przez Redis
- Broadcast wiadomości do wszystkich instancji

#### 1.6 Database State (`packages/core/database/src/database.ts`)

**Obecny stan:**

- Wiele Map/Set w pamięci:
  - `models = new Map<string, ModelStatic<Model>>()`
  - `repositories = new Map<string, RepositoryType>()`
  - `collections = new Map<string, Collection>()`
  - `operators = new Map()`
  - `fieldTypes = new Map()`
  - `fieldValueParsers = new Map()`

**Wymagane zmiany:**

- Cache metadanych kolekcji w Redis
- Synchronizacja zmian schematu między instancjami

#### 1.7 Plugin Manager (`packages/core/server/src/plugin-manager/`)

**Obecny stan:**

- `pluginInstances: Map<typeof Plugin, Plugin>`
- Stan pluginów w pamięci

**Wymagane zmiany:**

- Synchronizacja stanu pluginów między instancjami
- Koordynacja ładowania/wyłączania pluginów

#### 1.8 Cron Job Manager (`packages/core/server/src/cron/cron-job-manager.ts`)

**Obecny stan:**

- `_jobs: Set<CronJob> = new Set()`
- Zadania cron w pamięci każdej instancji

**Wymagane zmiany:**

- Tylko jedna instancja powinna wykonywać zadania cron
- Koordynacja przez Redis lock

#### 1.9 Background Job Manager (`packages/core/server/src/background-job-manager.ts`)

**Obecny stan:**

- `subscriptions: Map<string, BackgroundJobSubscription>`
- Kolejki zadań w pamięci

**Wymagane zmiany:**

- Dystrybucja zadań między instancjami
- Synchronizacja przez Redis

#### 1.10 Authentication & Sessions

**Obecny stan:**

- JWT blacklist w pamięci
- Cache użytkowników w pamięci
- Sesje w pamięci

**Wymagane zmiany:**

- JWT blacklist w Redis
- Cache sesji w Redis
- Synchronizacja wylogowań

### 2. Struktury Danych Wymagające Migracji

#### 2.1 Map/Set w pamięci:

```typescript
// Database
models = new Map<string, ModelStatic<Model>>();
repositories = new Map<string, RepositoryType>();
collections = new Map<string, Collection>();
operators = new Map();
fieldTypes = new Map();
fieldValueParsers = new Map();

// WebSocket
webSocketClients = new Map<string, WebSocketClient>();

// Plugin Manager
pluginInstances: Map<typeof Plugin, Plugin>;

// Event Queue
events: Map<string, QueueEventOptions>;
queues: Map<string, QueueMessage[]>;

// Background Jobs
subscriptions: Map<string, BackgroundJobSubscription>;

// Cron Jobs
_jobs: Set<CronJob>;

// Lock Manager
locks = new Map<string, MutexInterface>();
```

## Plan Implementacji

### Faza 1: Podstawowa Infrastruktura Redis

#### 1.1 Redis Adapters

```typescript
// packages/core/server/src/pub-sub-manager/redis-pub-sub-adapter.ts
export class RedisPubSubAdapter implements IPubSubAdapter {
    private redis: Redis;
    private subscriber: Redis;

    async connect() {
        this.redis = new Redis(process.env.REDIS_URL);
        this.subscriber = new Redis(process.env.REDIS_URL);
    }

    async publish(channel: string, message: string) {
        await this.redis.publish(channel, message);
    }

    async subscribe(channel: string, callback: PubSubCallback) {
        await this.subscriber.subscribe(channel);
        this.subscriber.on("message", (ch, msg) => {
            if (ch === channel) {
                callback(JSON.parse(msg));
            }
        });
    }
}

// packages/core/server/src/event-queue/redis-event-queue-adapter.ts
export class RedisEventQueueAdapter implements IEventQueueAdapter {
    private redis: Redis;

    async publish(channel: string, message: any, options: QueueMessageOptions) {
        const queueKey = `queue:${channel}`;
        const messageData = {
            id: randomUUID(),
            content: message,
            options,
            timestamp: Date.now(),
        };
        await this.redis.lpush(queueKey, JSON.stringify(messageData));
    }

    async subscribe(channel: string, event: QueueEventOptions) {
        // Implementacja konsumenta Redis
    }
}

// packages/core/lock-manager/src/redis-lock-adapter.ts
export class RedisLockAdapter implements ILockAdapter {
    private redis: Redis;

    async acquire(key: string, ttl: number) {
        const lockKey = `lock:${key}`;
        const lockValue = randomUUID();

        const result = await this.redis.set(
            lockKey,
            lockValue,
            "PX",
            ttl,
            "NX",
        );
        if (!result) {
            throw new LockAcquireError("Failed to acquire lock");
        }

        return async () => {
            const script = `
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      `;
            await this.redis.eval(script, 1, lockKey, lockValue);
        };
    }
}
```

#### 1.2 Cluster Mode Detection

```typescript
// packages/core/server/src/cluster-mode.ts
export class ClusterModeManager {
    static isEnabled(): boolean {
        return process.env.CLUSTER_MODE === "max";
    }

    static getRedisConfig() {
        if (!this.isEnabled()) {
            return null;
        }

        return {
            url: process.env.REDIS_URL || "redis://localhost:6379",
            keyPrefix: process.env.REDIS_KEY_PREFIX || "nocobase:",
            ttl: parseInt(process.env.REDIS_TTL) || 3600,
        };
    }
}
```

### Faza 2: Migracja Cache i Sesji

#### 2.1 Cache Manager Updates

```typescript
// packages/core/app/src/config/cache.ts
export const cacheManager = {
    defaultStore: ClusterModeManager.isEnabled()
        ? "redis"
        : (process.env.CACHE_DEFAULT_STORE || "memory"),
    stores: {
        memory: {
            store: "memory",
            max: parseInt(process.env.CACHE_MEMORY_MAX) || 2000,
        },
        redis: {
            url: process.env.CACHE_REDIS_URL || process.env.REDIS_URL,
            keyPrefix: ClusterModeManager.getRedisConfig()?.keyPrefix +
                "cache:",
        },
    },
} as CacheManagerOptions;
```

#### 2.2 Session Management

```typescript
// packages/core/auth/src/base/auth.ts
export class BaseAuth extends Auth {
    async checkToken() {
        const cache = this.ctx.cache as Cache;

        // W trybie klastrowym cache jest już Redis
        const user = userId
            ? await cache.wrap(
                this.getCacheKey(userId),
                () =>
                    this.userRepository.findOne({
                        filter: { id: userId },
                        raw: true,
                    }),
            )
            : null;

        // JWT blacklist w Redis
        const blocked = await this.jwt.blacklist.has(jti ?? token);
        // ...
    }
}
```

### Faza 3: Synchronizacja WebSocket

#### 3.1 WebSocket State Management

```typescript
// packages/core/server/src/gateway/redis-ws-manager.ts
export class RedisWebSocketManager {
    private redis: Redis;
    private pubsub: Redis;

    async addConnection(client: WebSocketClient) {
        const clientData = {
            id: client.id,
            tags: Array.from(client.tags),
            url: client.url,
            headers: client.headers,
            app: client.app,
            timestamp: Date.now(),
        };

        await this.redis.hset(
            `ws:clients:${client.app}`,
            client.id,
            JSON.stringify(clientData),
        );

        // Broadcast do innych instancji
        await this.pubsub.publish("ws:client:connected", {
            app: client.app,
            clientId: client.id,
            clientData,
        });
    }

    async removeConnection(clientId: string, app: string) {
        await this.redis.hdel(`ws:clients:${app}`, clientId);

        await this.pubsub.publish("ws:client:disconnected", {
            app,
            clientId,
        });
    }

    async sendToAllInstances(app: string, message: any) {
        await this.pubsub.publish(`ws:broadcast:${app}`, message);
    }
}
```

### Faza 4: Synchronizacja Database State

#### 4.1 Collection Metadata Cache

```typescript
// packages/core/database/src/redis-collection-cache.ts
export class RedisCollectionCache {
    private redis: Redis;

    async cacheCollection(collection: Collection) {
        const key = `collection:${collection.name}`;
        const data = {
            name: collection.name,
            options: collection.options,
            fields: collection.fields,
            indexes: collection.indexes,
            timestamp: Date.now(),
        };

        await this.redis.setex(key, 3600, JSON.stringify(data));
    }

    async getCollection(name: string): Promise<Collection | null> {
        const key = `collection:${name}`;
        const data = await this.redis.get(key);
        return data ? JSON.parse(data) : null;
    }

    async invalidateCollection(name: string) {
        await this.redis.del(`collection:${name}`);

        // Notify other instances
        await this.redis.publish("collection:invalidated", name);
    }
}
```

### Faza 5: Koordynacja Cron Jobs

#### 5.1 Distributed Cron Manager

```typescript
// packages/core/server/src/cron/redis-cron-manager.ts
export class RedisCronJobManager extends CronJobManager {
    private redis: Redis;
    private instanceId: string;
    private leaderElection: LeaderElection;

    constructor(app: Application) {
        super(app);
        this.instanceId = app.instanceId;
        this.leaderElection = new LeaderElection(this.redis, "cron:leader");
    }

    async start() {
        // Tylko leader wykonuje zadania cron
        if (await this.leaderElection.isLeader()) {
            super.start();
        }

        // Monitor leader election
        this.leaderElection.on("leader", () => {
            if (this.leaderElection.isLeader()) {
                super.start();
            } else {
                super.stop();
            }
        });
    }
}
```

### Faza 6: Background Jobs Distribution

#### 6.1 Distributed Background Jobs

```typescript
// packages/core/server/src/background-job-manager.ts
export class BackgroundJobManager {
    private redis: Redis;

    async publish(topic: string, payload: any) {
        const jobData = {
            topic,
            payload,
            timestamp: Date.now(),
            instanceId: this.app.instanceId,
        };

        // Dodaj do kolejki Redis
        await this.redis.lpush("background:jobs", JSON.stringify(jobData));

        // Notify workers
        await this.redis.publish("background:new_job", topic);
    }

    private async processJobs() {
        while (true) {
            const result = await this.redis.brpop("background:jobs", 5);
            if (result) {
                const jobData = JSON.parse(result[1]);
                await this.processJob(jobData);
            }
        }
    }
}
```

## Konfiguracja Środowiska

### Zmienne Środowiskowe

```bash
# Włączenie trybu klastrowego
CLUSTER_MODE=max

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_KEY_PREFIX=nocobase:
REDIS_TTL=3600

# Cache Configuration (fallback)
CACHE_DEFAULT_STORE=redis
CACHE_REDIS_URL=redis://localhost:6379

# Lock Configuration
LOCK_ADAPTER_DEFAULT=redis

# PubSub Configuration
PUBSUB_ADAPTER=redis
```

### Docker Compose Example

```yaml
version: "3.8"
services:
    redis:
        image: redis:7-alpine
        ports:
            - "6379:6379"
        command: redis-server --appendonly yes
        volumes:
            - redis_data:/data

    nocobase1:
        build: .
        environment:
            - CLUSTER_MODE=max
            - REDIS_URL=redis://redis:6379
            - PORT=3000
        depends_on:
            - redis

    nocobase2:
        build: .
        environment:
            - CLUSTER_MODE=max
            - REDIS_URL=redis://redis:6379
            - PORT=3001
        depends_on:
            - redis

volumes:
    redis_data:
```

## Przypadki Testowe

### 1. Test Podstawowej Synchronizacji

**Scenariusz:** Dwie instancje NocoBase z Redis **Kroki:**

1. Uruchom instancję A na porcie 3000
2. Uruchom instancję B na porcie 3001
3. Zaloguj się na instancji A
4. Sprawdź czy sesja jest widoczna na instancji B
5. Wyloguj się na instancji A
6. Sprawdź czy wylogowanie jest widoczne na instancji B

**Oczekiwany rezultat:** Synchronizacja sesji między instancjami

### 2. Test WebSocket Broadcast

**Scenariusz:** Komunikacja real-time między instancjami **Kroki:**

1. Połącz się z WebSocket na instancji A
2. Połącz się z WebSocket na instancji B
3. Wyślij wiadomość z instancji A
4. Sprawdź czy wiadomość dotarła do klienta na instancji B

**Oczekiwany rezultat:** Wiadomości są broadcastowane do wszystkich instancji

### 3. Test Cache Synchronizacji

**Scenariusz:** Cache danych między instancjami **Kroki:**

1. Załaduj dane na instancji A
2. Sprawdź cache na instancji B
3. Zaktualizuj dane na instancji A
4. Sprawdź czy cache na instancji B został zaktualizowany

**Oczekiwany rezultat:** Cache jest synchronizowany między instancjami

### 4. Test Cron Jobs

**Scenariusz:** Tylko jedna instancja wykonuje zadania cron **Kroki:**

1. Uruchom dwie instancje z zadaniami cron
2. Sprawdź logi - tylko jedna instancja powinna wykonywać zadania
3. Zatrzymaj instancję z zadaniami
4. Sprawdź czy druga instancja przejęła wykonywanie zadań

**Oczekiwany rezultat:** Leader election działa poprawnie

### 5. Test Background Jobs

**Scenariusz:** Dystrybucja zadań między instancjami **Kroki:**

1. Uruchom dwie instancje
2. Wyślij zadania background z instancji A
3. Sprawdź czy zadania są wykonywane na obu instancjach
4. Sprawdź czy zadania nie są duplikowane

**Oczekiwany rezultat:** Zadania są dystrybuowane bez duplikacji

### 6. Test Lock Management

**Scenariusz:** Dystrybuowane locki **Kroki:**

1. Uruchom dwie instancje
2. Zablokuj zasób na instancji A
3. Spróbuj zablokować ten sam zasób na instancji B
4. Sprawdź czy lock jest respektowany między instancjami

**Oczekiwany rezultat:** Locki działają między instancjami

### 7. Test Failover

**Scenariusz:** Odporność na awarie **Kroki:**

1. Uruchom dwie instancje
2. Zatrzymaj Redis
3. Sprawdź czy aplikacje przełączają się na tryb fallback
4. Uruchom Redis ponownie
5. Sprawdź czy synchronizacja zostaje przywrócona

**Oczekiwany rezultat:** Graceful degradation i recovery

## Monitoring i Debugging

### 1. Redis Monitoring

```bash
# Monitor Redis commands
redis-cli monitor

# Check Redis memory usage
redis-cli info memory

# List all keys
redis-cli keys "nocobase:*"
```

### 2. Application Logs

```typescript
// packages/core/server/src/cluster-mode.ts
export class ClusterModeLogger {
    static log(message: string, data?: any) {
        if (ClusterModeManager.isEnabled()) {
            console.log(`[CLUSTER] ${message}`, data);
        }
    }
}
```

### 3. Health Checks

```typescript
// packages/core/server/src/health-check.ts
export class ClusterHealthCheck {
    async checkRedisConnection(): Promise<boolean> {
        try {
            const redis = new Redis(process.env.REDIS_URL);
            await redis.ping();
            await redis.quit();
            return true;
        } catch {
            return false;
        }
    }

    async checkClusterStatus(): Promise<{
        redis: boolean;
        instances: number;
        leader: string | null;
    }> {
        return {
            redis: await this.checkRedisConnection(),
            instances: await this.getActiveInstances(),
            leader: await this.getCurrentLeader(),
        };
    }
}
```

## Bezpieczeństwo

### 1. Redis Security

- Użycie Redis AUTH
- Szyfrowanie połączeń (TLS)
- Ograniczenie dostępu do Redis

### 2. Data Isolation

- Prefiksy kluczy dla różnych aplikacji
- TTL dla wszystkich kluczy
- Regularne czyszczenie starych danych

### 3. Error Handling

- Graceful degradation gdy Redis nie jest dostępny
- Retry logic dla operacji Redis
- Circuit breaker pattern

## Performance Considerations

### 1. Redis Optimization

- Connection pooling
- Pipeline operations
- Lazy loading
- Compression dla dużych danych

### 2. Memory Management

- TTL dla wszystkich kluczy
- Monitoring użycia pamięci
- Cleanup starych danych

### 3. Network Optimization

- Lokalny Redis dla każdego regionu
- Compression dla danych
- Batch operations

## Podsumowanie

Implementacja trybu klastrowego NocoBase wymaga:

1. **Infrastruktura Redis** - Adaptery dla PubSub, EventQueue, LockManager
2. **Synchronizacja stanu** - WebSocket, Cache, Sessions, Database metadata
3. **Koordynacja zadań** - Cron jobs, Background jobs
4. **Monitoring** - Health checks, logging, debugging
5. **Bezpieczeństwo** - Redis security, data isolation
6. **Performance** - Optimization, memory management

Implementacja będzie stopniowa, z możliwością włączenia trybu klastrowego przez
zmienną środowiskową `CLUSTER_MODE=max`. Wszystkie zmiany będą backward
compatible i nie wpłyną na działanie w trybie single-instance.
