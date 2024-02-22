import { z } from "zod";

const createTodoSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(500),
  dueDate: z.coerce.date(),
});

export default createTodoSchema;
