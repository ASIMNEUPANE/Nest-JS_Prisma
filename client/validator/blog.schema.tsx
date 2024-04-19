import { z } from "zod";

export const blogSchemaValidator = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(["TECHNOLOGY", "Travel", "Food", "Lifestyle"]),
    totalWord: z.string().min(1),
    status: z.enum(["Published", "DRAFT"]),
    images: z
        .string()
        .refine(
            (value: any) => {
                const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
                const lowercasedValue = value.toLowerCase();

                return allowedExtensions.some((ext) => lowercasedValue.endsWith(ext));
            },
            {
                message:
                    "Invalid image file path. Supported formats: jpg, jpeg, png, gif",
            }
        ).optional(),

}).strict();