import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters"),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  password: z.string().min(6, "Password should be at least 6 characters"),
});

export default signupSchema;
