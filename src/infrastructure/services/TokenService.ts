import * as jose from 'jose';
import type { ITokenService, TokenPayload } from '../../domain/services/ITokenService';

export class TokenService implements ITokenService {
    private readonly secret: Uint8Array;

    constructor() {
        const secretText = process.env.JWT_SECRET || 'secret-key-pzu-tech-2-wow-so-secure';
        this.secret = new TextEncoder().encode(secretText);
    }

    async generateToken(payload: TokenPayload): Promise<string> {
        return await new jose.SignJWT({ ...payload })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(this.secret);
    }

    async verifyToken(token: string): Promise<TokenPayload | null> {
        try {
            const { payload } = await jose.jwtVerify(token, this.secret);
            return payload as unknown as TokenPayload;
        } catch (error) {
            return null;
        }
    }
}

