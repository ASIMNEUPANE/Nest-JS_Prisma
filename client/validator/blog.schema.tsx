import { z } from "zod";

export const blogSchemaValidator = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(["TECHNOLOGY", "Travel", "Food", "Lifestyle"]),
    totalWord: z.number().min(1),
    status: z.enum(["Published", "DRAFT"]),
    author:z.string(),
    

})