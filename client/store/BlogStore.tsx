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
type BlogStateType = {
  blogs: Blog[]


}
type BlogActonsType = {
  setBlogs: (newBlog: Blog[]) => void
}

export type BlogStoreType = BlogStateType & BlogActonsType;

const BlogStore = create<BlogStoreType>((set) => ({
  blogs: [],

  setBlogs: (blogs: Blog[]) =>
    set({ blogs })
}))
export default BlogStore;