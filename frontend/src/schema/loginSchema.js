import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export default loginSchema;
