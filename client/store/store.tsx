import { create } from 'zustand'

type  Category ="Travel" | "Food" | "Lifestyle" | "TECHNOLOGY"
type Status = "Published" | "DRAFT"
type blog ={
        id: number;
        title: string;
        content: string;
        description: string;
        category: Category;
        status: Status;
        totalWord: number;
        images?: string | null;
        author: string;
    
}
export const blogStore = create((set) => ({
  blog:{
    title:'nepal',
    content:'nepal is beutiful'
  },
updateBlog:(newBlog:any)=> set((state:any)=>({
    blog: {...state.user, ...newBlog}
}))
}))