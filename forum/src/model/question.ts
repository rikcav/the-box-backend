import { Tag } from "./dto/tag";

export interface Question {
    title: string;
    body: string;
    user_id: string;
    tags: Tag[];
}