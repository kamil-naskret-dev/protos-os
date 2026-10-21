import { z } from "zod";

const passwordSchema = z
  .string()
  .min(12, "Hasło musi mieć co najmniej 12 znaków")
  .regex(/[a-z]/, "Hasło musi zawierać małą literę")
  .regex(/[A-Z]/, "Hasło musi zawierać wielką literę")
  .regex(/[0-9]/, "Hasło musi zawierać cyfrę");

export const loginSchema = z.object({
  email: z.string().email("Podaj poprawny adres e-mail"),
  password: z.string().min(1, "Podaj hasło"),
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    email: z.string().email("Podaj poprawny adres e-mail"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą być identyczne",
  });

export const resetPasswordSchema = z.object({
  email: z.string().email("Podaj poprawny adres e-mail"),
});

export const newPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą być identyczne",
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;
