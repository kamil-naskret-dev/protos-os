import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Podaj poprawny adres e-mail"),
  password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    email: z.string().email("Podaj poprawny adres e-mail"),
    password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą być identyczne",
  });

export const resetPasswordSchema = z.object({
  email: z.string().email("Podaj poprawny adres e-mail"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
