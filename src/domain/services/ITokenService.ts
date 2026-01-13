export interface TokenPayload {
    sub: string;
    email: string;
    role: string;
}

export interface ITokenService {
    generateToken(payload: TokenPayload): Promise<string>;
    verifyToken(token: string): Promise<TokenPayload | null>;
}
