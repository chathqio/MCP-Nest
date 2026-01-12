import { OAuthModuleOptions } from '../providers/oauth-provider.interface';
export interface JwtPayload {
    sub: string;
    azp?: string;
    client_id?: string;
    scope?: string;
    resource?: string;
    type: 'access' | 'refresh' | 'user';
    user_data?: any;
    user_profile_id?: string;
    iss?: string;
    aud?: string | string[];
    jti?: string;
    iat?: number;
    exp?: number;
}
export interface TokenPair {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
}
export declare class JwtTokenService {
    private readonly jwtSecret;
    private readonly issuer;
    private readonly accessTokenExpiresInSeconds;
    private readonly refreshTokenExpiresInSeconds;
    private readonly enableRefreshTokens;
    constructor(options: OAuthModuleOptions);
    generateTokenPair(userId: string, clientId: string, scope?: string, resource?: string, extras?: {
        user_profile_id?: string;
        user_data?: any;
    }): TokenPair;
    validateToken(token: string): JwtPayload | null;
    refreshAccessToken(refreshToken: string): TokenPair | null;
    generateUserToken(userId: string, userData: any): string;
    private parseDurationToSeconds;
}
//# sourceMappingURL=jwt-token.service.d.ts.map