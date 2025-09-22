export declare class RedisWebSocketManager {
    private instanceId;
    private redisUrl;
    private redis;
    private subscriber;
    private connected;
    private clients;
    constructor(instanceId: string, redisUrl?: string);
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    addClient(clientId: string, clientInfo: any): Promise<void>;
    removeClient(clientId: string): Promise<void>;
    broadcast(type: string, data: any, targetInstance?: string): Promise<void>;
    getClients(): Promise<Map<string, any>>;
    getAllInstances(): Promise<string[]>;
    private handleWebSocketMessage;
}
