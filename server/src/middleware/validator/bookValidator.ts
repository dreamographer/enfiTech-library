import { z } from "zod";
//scheme for book validation
export const bookSchema = z.object({
  name: z.string().min(2, "Book name must have at least 2 characters"),
  description: z
    .string()
    .min(10, "Description must have at least 10 characters"),
  publishDate: z.string(),
  price: z.number().positive({ message: "Price must be a positive number" }),
});
