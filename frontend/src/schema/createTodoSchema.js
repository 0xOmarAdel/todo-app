import { z } from "zod";

const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title should be at least 1 character" })
    .max(50, { message: "Title should be at most 50 characters" }),

  description: z
    .string()
    .min(1, { message: "Description should be at least 1 character" })
    .max(500, { message: "Description should be at most 500 characters" }),

  dueDate: z.coerce
    .date()
    .refine((value) => !isNaN(value), { message: "Invalid date format" }),
});

export default createTodoSchema;
