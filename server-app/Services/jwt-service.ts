
import { AppConfig } from '../app-config';
import { JWTRefreshTokenPayload, JwtPayload } from '../@Types/jwt-payloads';
import * as jwt from 'jsonwebtoken';

class JwtService {

    generateAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, AppConfig.jwt_access_token_secret!, {
            expiresIn: AppConfig.jwt_access_token_expiry,
            issuer: AppConfig.site,
            notBefore: "0", // token is not valid before this timestamp
            audience: AppConfig.jwt_audience,
            algorithm: "HS256"
        });
    };


    generateRefreshToken(payload: JWTRefreshTokenPayload): string {
        return jwt.sign(payload, AppConfig.jwt_refresh_token_secret!, {
            issuer: AppConfig.site,
            expiresIn: AppConfig.jwt_refresh_token_expiry,
            notBefore: "0", // token is not valid before this timestamp
            audience: AppConfig.jwt_audience,
            algorithm: "HS256"
        });
    };
    verifyAccessJwtToken(token: string) {
        const decoded = jwt.verify(token, AppConfig.jwt_access_token_secret!, {
            complete: true,
            audience: AppConfig.jwt_audience,
            issuer: AppConfig.site,
            // algorithms: ['HS256'],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false
        });
        return decoded.payload as JwtPayload

    }
    verifyRefreshJwtToken(token: string) {
        const decoded = jwt.verify(token, AppConfig.jwt_refresh_token_secret! as string, {
            complete: true,
            audience: AppConfig.jwt_audience,
            issuer: AppConfig.site,
            // algorithms: ['HS256'],
            clockTolerance: 0,
            ignoreExpiration: false,
            ignoreNotBefore: false
        });
        return decoded.payload as JWTRefreshTokenPayload;
    }
}

export const jwtService = new JwtService();