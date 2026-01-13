export type Role = 'ADMIN' | 'CITIZEN';

export interface UserProps {
    id?: string;
    email: string;
    password: string;
    name: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export class User {
    private props: UserProps;

    constructor(props: UserProps) {
        this.props = {
            ...props,
            id: props.id ?? crypto.randomUUID(),
            role: props.role ?? 'CITIZEN',
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        };
    }

    get id() { return this.props.id!; }
    get email() { return this.props.email; }
    get password() { return this.props.password; }
    get name() { return this.props.name; }
    get role() { return this.props.role; }
    get createdAt() { return this.props.createdAt!; }
    get updatedAt() { return this.props.updatedAt!; }

    public updateName(name: string) {
        this.props.name = name;
        this.props.updatedAt = new Date();
    }

    public updatePassword(password: string) {
        this.props.password = password;
        this.props.updatedAt = new Date();
    }

    toJSON() {
        return {
            ...this.props,
            id: this.id,
        };
    }
}
