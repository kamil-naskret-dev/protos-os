const AUTH_ERRORS = new Map<string, string>([
  ["Invalid login credentials", "Nieprawidłowy e-mail lub hasło."],
  ["Email not confirmed", "Potwierdź swój adres e-mail przed zalogowaniem."],
  ["Too many requests", "Zbyt wiele prób. Spróbuj ponownie za chwilę."],
]);

const FALLBACK_ERROR = "Wystąpił błąd. Spróbuj ponownie.";

export function mapAuthError(message: string): string {
  for (const [key, value] of AUTH_ERRORS) {
    if (message.includes(key)) return value;
  }
  return FALLBACK_ERROR;
}
