export abstract class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends DomainError {
    constructor(resource: string) {
        super(`${resource} not found`);
    }
}

export class ConflictError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}

export class UnauthorizedError extends DomainError {
    constructor(message: string = 'Unauthorized') {
        super(message);
    }
}

export class ValidationError extends DomainError {
    constructor(message: string) {
        super(message);
    }
}
