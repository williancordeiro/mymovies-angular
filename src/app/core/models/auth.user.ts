export interface AuthUser {
    id: number;
    email: string;
    username: string;
    role: string;
    handle: string;
    avatar_file: string;
    banner_file: string;
}
export interface JwtPayload {
    iss: string;
    iat: number;
    exp: number;
    data: AuthUser;
}