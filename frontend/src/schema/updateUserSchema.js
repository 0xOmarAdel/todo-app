import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters").nullable(),
  email: z.string().email({ message: "Invalid email format" }).nullable(),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Invalid phone number")
    .nullable(),
  password: z
    .string()
    .min(6, "Password should be at least 6 characters")
    .nullable(),
});

export default updateUserSchema;
