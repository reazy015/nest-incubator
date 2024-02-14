export declare class CryptoService {
    getConfirmationCode(): string;
    getHash(password: string, userSalt?: string): Promise<{
        salt: string;
        hash: string;
    }>;
    validatePasswordHash(password: string, hash: string): Promise<boolean>;
}
