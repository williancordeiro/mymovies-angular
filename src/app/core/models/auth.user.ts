export interface AuthUser {
    id: number;
    email: string;
    username: string;
    admin: number;
}
export interface JwtPayload {
    iss: string;
    iat: number;
    exp: number;
    data: AuthUser;
}