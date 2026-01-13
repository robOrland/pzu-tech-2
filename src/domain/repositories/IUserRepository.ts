import { User } from '../entities/User';

export interface IUserRepository {
    create(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}
