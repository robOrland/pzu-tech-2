import type { IPasswordHasher } from '../../domain/services/IPasswordHasher';

export class PasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await Bun.password.hash(password);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await Bun.password.verify(password, hash);
    }
}
