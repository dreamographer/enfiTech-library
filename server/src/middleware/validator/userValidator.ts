import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(5, "Full name must have at least 5 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(
      8,
      "Password must have at least 8 characters with alphanumber combination"
    )
    .refine(
      (password: string) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/.test(
          password
        ), //regex Validation for password
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one special character and one number.",
      }
    ),
});
