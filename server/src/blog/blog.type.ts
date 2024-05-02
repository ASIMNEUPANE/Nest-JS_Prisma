import { Category, Status, User } from '@prisma/client';

export type getReturn = {
  data: any[];
  total: number;
  limit: number;
  page: number;
};

export interface Iblog {
    id: number;
    title: string;
    content: string;
    description: string;
    category: Category;
    status: Status;
    totalWord: number;
    images?: string | null;
    created_By?: User | null;
    author: string;
}
