import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters"),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export default signupSchema;
