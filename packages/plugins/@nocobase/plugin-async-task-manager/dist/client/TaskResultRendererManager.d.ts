import React from 'react';
export declare class TaskResultRendererManager {
    private renderers;
    register(type: string, renderer: React.ComponentType<any>): void;
    get(type: string): React.ComponentType<any>;
}
