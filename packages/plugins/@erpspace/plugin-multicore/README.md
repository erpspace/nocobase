# @erpspace/plugin-multicore

NocoBase Multicore Plugin - Enables cluster mode with Redis adapters without
modifying core code.

## Features

- 🚀 **Zero Code Changes**: Works without modifying NocoBase core code
- 🔄 **Redis Adapters**: Automatically switches to Redis for PubSub, EventQueue,
  and LockManager
- 📦 **Plug & Play**: Simply install and enable the plugin
- 🎯 **Cluster Mode**: Enables true multicore/cluster functionality
- 🔧 **Configurable**: Easy configuration via environment variables

## Installation

1. Install the plugin:

```bash
npm install @erpspace/plugin-multicore
```

2. Add to your NocoBase configuration:

```typescript
// nocobase.conf
{
  "plugins": [
    "@erpspace/plugin-multicore"
  ]
}
```

## Configuration

Set the following environment variables:

```bash
# Redis configuration
REDIS_URL=redis://localhost:6379

# Optional: Custom Redis options
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_password
REDIS_DB=0
```

## How It Works

The plugin automatically:

1. **Registers Redis Adapters**: Adds Redis implementations for PubSub,
   EventQueue, and LockManager
2. **Switches Adapters**: Automatically switches from local to Redis adapters
3. **Configures Cache**: Sets up Redis-based caching
4. **Enables Synchronization**: Provides inter-instance communication

## Architecture

```
┌─────────────────┐    ┌─────────────────┐
│   NocoBase      │    │   NocoBase      │
│   Instance 1    │    │   Instance 2    │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────┬───────────┘
                     │
            ┌─────────────────┐
            │      Redis      │
            │   (Shared)      │
            └─────────────────┘
```

## Benefits

- **Scalability**: Run multiple NocoBase instances
- **High Availability**: Instance failures don't affect the system
- **Load Distribution**: Distribute load across multiple instances
- **Real-time Sync**: Instant synchronization between instances

## License

MIT
