export interface ErrorsResponse {
    message: string;
    errors?: Record<string, string | string[]>;
    code?: number;
}
