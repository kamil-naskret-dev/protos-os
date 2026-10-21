import { describe, expect, it } from "vitest";
import { loginSchema, newPasswordSchema, registerSchema, resetPasswordSchema } from "./schemas";

describe("loginSchema", () => {
  it("przepuszcza poprawne dane", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "anypassword",
      rememberMe: true,
    });
    expect(result.success).toBe(true);
  });

  it("odrzuca niepoprawny e-mail", () => {
    const result = loginSchema.safeParse({
      email: "not-an-email",
      password: "anypassword",
      rememberMe: false,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("email");
  });

  it("odrzuca puste hasło", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "",
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
      password: "StrongPass123",
      confirmPassword: "StrongPass123",
    });
    expect(result.success).toBe(true);
  });

  it("odrzuca gdy hasła się różnią", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "StrongPass123",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("confirmPassword");
  });

  it("odrzuca hasło krótsze niż 12 znaków", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "Short1",
      confirmPassword: "Short1",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("password");
  });

  it("odrzuca hasło bez wielkiej litery", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "alllowercase1",
      confirmPassword: "alllowercase1",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("password");
  });

  it("odrzuca hasło bez cyfry", () => {
    const result = registerSchema.safeParse({
      email: "user@example.com",
      password: "NoDigitsHere",
      confirmPassword: "NoDigitsHere",
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

describe("newPasswordSchema", () => {
  it("przepuszcza poprawne dane z pasującymi hasłami", () => {
    const result = newPasswordSchema.safeParse({
      password: "StrongPass123",
      confirmPassword: "StrongPass123",
    });
    expect(result.success).toBe(true);
  });

  it("odrzuca gdy hasła się różnią", () => {
    const result = newPasswordSchema.safeParse({
      password: "StrongPass123",
      confirmPassword: "different",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("confirmPassword");
  });

  it("odrzuca hasło krótsze niż 12 znaków", () => {
    const result = newPasswordSchema.safeParse({
      password: "Short1",
      confirmPassword: "Short1",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain("password");
  });
});
