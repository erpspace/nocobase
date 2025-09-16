export declare function aesEncrypt(text: string, ivString?: string): Promise<unknown>;
export declare function aesDecrypt(encrypted: string, ivString?: string): Promise<unknown>;
export declare function aesEncryptSync(text: string, ivString?: string): string;
export declare function aseDecryptSync(encrypted: string, ivString?: string): string;
export declare function aesCheckKey(): void;
export declare function checkValueAndIv(type: 'Decrypt' | 'Encrypt', value: string, iv: string): void;
