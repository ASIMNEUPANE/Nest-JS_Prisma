import { create } from 'zustand'

type Category = "Travel" | "Food" | "Lifestyle" | "TECHNOLOGY"
type Status = "Published" | "DRAFT"
type Blog = {
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
type blogAction = {
  blog: Blog[]
  addBlog:(newBlog:Blog)=> void

}

const blogStore = create<blogAction>((set) => ({
  blog: [],
  
  addBlog: (newBlog: Blog) =>
    set((state) => ({
      blog: [...state.blog, newBlog],
    })),
}))

export default blogStore