export interface Tag {
    id: number;
    description: string;
    created_at: string;
}

export interface TagResponse {
    page: number;
    tags: Tag[];
    total: number;
}