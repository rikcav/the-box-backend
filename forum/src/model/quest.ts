import { Tag } from "./dto/tag";

export interface Quest {
    title: string;
    body: string;
    user_id: string;
    tags: Tag[];
}