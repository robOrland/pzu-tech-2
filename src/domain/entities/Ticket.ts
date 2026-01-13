export type TicketStatus = 'PENDENTE' | 'EM_ANALISE' | 'RESOLVIDO';

export interface TicketProps {
    id?: string;
    category: string;
    description: string;
    photoUrl?: string | null;
    address: string;
    status: TicketStatus;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Ticket {
    private props: TicketProps;

    constructor(props: TicketProps) {
        this.props = {
            ...props,
            id: props.id ?? crypto.randomUUID(),
            status: props.status ?? 'PENDENTE',
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        };
    }

    get id() { return this.props.id!; }
    get category() { return this.props.category; }
    get description() { return this.props.description; }
    get photoUrl() { return this.props.photoUrl; }
    get address() { return this.props.address; }
    get status() { return this.props.status; }
    get userId() { return this.props.userId; }
    get createdAt() { return this.props.createdAt!; }
    get updatedAt() { return this.props.updatedAt!; }

    public updateStatus(status: TicketStatus) {
        this.props.status = status;
        this.props.updatedAt = new Date();
    }

    public updateDescription(description: string) {
        this.props.description = description;
        this.props.updatedAt = new Date();
    }

    toJSON() {
        return {
            ...this.props,
            id: this.id,
        };
    }
}
