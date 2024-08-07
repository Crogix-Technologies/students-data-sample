require("dotenv").config();

export class AppConfig {
    public static readonly server_port: number = parseInt(process.env.SERVER_PORT as string) || 8000;
    public static readonly mongodb_url: string = process.env.MONGODB_URL || "";
    public static readonly jwt_refresh_token_secret: string = process.env.JWT_REFRESH_TOKEN_EXPIRATION as string;
    public static readonly jwt_access_token_secret: string = process.env.JWT_ACCESS_TOKEN_SECRET as string;
    public static readonly jwt_access_token_expiry: string = process.env.JWT_ACCESS_TOKEN_EXPIRATION as string;
    public static readonly jwt_refresh_token_expiry: string = process.env.JWT_REFRESH_TOKEN_EXPIRATION as string;
    public static readonly site: string = process.env.SITE as string;
    public static readonly jwt_audience: string = process.env.JWT_AUDIENCE as string;

}