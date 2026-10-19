import { describe, expect, it } from "vitest";
import { mapAuthError } from "./map-auth-error";

describe("mapAuthError", () => {
  it("mapuje 'Invalid login credentials' na komunikat po polsku", () => {
    expect(mapAuthError("Invalid login credentials")).toBe("Nieprawidłowy e-mail lub hasło.");
  });

  it("działa gdy błąd jest częścią dłuższego komunikatu", () => {
    expect(mapAuthError("AuthApiError: Invalid login credentials")).toBe(
      "Nieprawidłowy e-mail lub hasło.",
    );
  });

  it("mapuje 'Email not confirmed' na komunikat po polsku", () => {
    expect(mapAuthError("Email not confirmed")).toBe(
      "Potwierdź swój adres e-mail przed zalogowaniem.",
    );
  });

  it("mapuje 'Too many requests' na komunikat po polsku", () => {
    expect(mapAuthError("Too many requests")).toBe("Zbyt wiele prób. Spróbuj ponownie za chwilę.");
  });

  it("zwraca fallback dla nieznanego błędu", () => {
    expect(mapAuthError("Something unexpected happened")).toBe("Wystąpił błąd. Spróbuj ponownie.");
  });

  it("mapuje 'User already registered' na komunikat po polsku", () => {
    expect(mapAuthError("User already registered")).toBe(
      "Konto z tym adresem e-mail już istnieje.",
    );
  });

  it("zwraca fallback dla pustego stringa", () => {
    expect(mapAuthError("")).toBe("Wystąpił błąd. Spróbuj ponownie.");
  });

  it("mapuje 'Password should be different from old password' na komunikat po polsku", () => {
    expect(mapAuthError("Password should be different from old password")).toBe(
      "Nowe hasło musi różnić się od poprzedniego.",
    );
  });
});
