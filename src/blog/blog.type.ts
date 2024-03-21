

export type getReturn= {
    data: any[];
    total: number;
    limit: number;
    page: number;
}

export interface Iblog  {
    id: number;
    title: string;
    content: string;
    description: string;
    category: string;
    status: string;
     author: string;
    totalWord: number;
    images: string;
    createdAt: Date;
    updatedAt: Date;
    timestamps: boolean;
  }
