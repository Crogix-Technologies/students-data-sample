
import { Algorithm } from "jsonwebtoken";

export type JwtPayload = {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
};

export type JwtConfig = {
    expiresIn: string,
    notBefore: string, // Cannot use before now, can be configured to be deferred.
    algorithm: Algorithm,
    audience: string,
    issuer: string
}

export type JWTRefreshTokenPayload = {
    id: number
}