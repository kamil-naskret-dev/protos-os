import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema, resetPasswordSchema } from "./schemas";

describe("loginSchema", () => {
  it("przepuszcza poprawne dane", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "secret123",
      rememberMe: true,
    });
    expect(result.success).toBe(true);
  });

  it("odrzuca niepoprawny e-mail", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "secret123",
      rememberMe: false,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("email");
  });

  it("odrzuca hasło krótsze niż 6 znaków", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "123",
      rememberMe: true,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("password");
  });
});

describe("registerSchema", () => {
  it("przepuszcza poprawne dane z pasującymi hasłami", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "strongpass",
      confirmPassword: "strongpass",
    });
    expect(result.success).toBe(true);
  });

  it("odrzuca gdy hasła się różnią", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "strongpass",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("confirmPassword");
  });

  it("odrzuca hasło krótsze niż 8 znaków", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "short",
      confirmPassword: "short",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("password");
  });
});

describe("resetPasswordSchema", () => {
  it("przepuszcza poprawny e-mail", () => {
    const result = resetPasswordSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });

  it("odrzuca niepoprawny e-mail", () => {
    const result = resetPasswordSchema.safeParse({ email: "invalid" });
    expect(result.success).toBe(false);
  });
});
