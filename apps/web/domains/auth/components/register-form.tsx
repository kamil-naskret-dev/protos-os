"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@protos/ui";
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignInWithOAuth } from "../hooks/use-sign-in-with-oauth";
import { useSignUp } from "../hooks/use-sign-up";
import { registerSchema } from "../schemas";
import type { RegisterFormValues } from "../schemas";
import { FormField } from "./form-field";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const SHAKE_DURATION_MS = 500;

export function RegisterForm() {
  const { signUp, serverError, emailSent } = useSignUp();
  const { signInWithOAuth, loading: oauthLoading, error: oauthError } = useSignInWithOAuth();
  const [captchaToken, setCaptchaToken] = useState<string | undefined>();
  const turnstileRef = useRef<TurnstileInstance>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (!shaking) return;
    const timer = setTimeout(() => setShaking(false), SHAKE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [shaking]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      const ok = await signUp(values, captchaToken);
      if (!ok) {
        setShaking(true);
        turnstileRef.current?.reset();
        setCaptchaToken(undefined);
      }
    },
    [signUp, captchaToken],
  );

  const formHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit],
  );

  if (emailSent) {
    return (
      <div className="space-y-3 rounded-xl border border-border bg-muted/40 px-6 py-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold">Sprawdź skrzynkę</h2>
        <p className="text-sm text-muted-foreground">
          Wysłaliśmy link aktywacyjny na{" "}
          <span className="font-medium text-foreground">{getValues("email")}</span>. Kliknij go, aby
          aktywować konto.
        </p>
        <p className="text-xs text-muted-foreground">Nie widzisz e-maila? Sprawdź folder spam.</p>
        <Link
          href="/login"
          className="mt-2 inline-block text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Przejdź do logowania
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={formHandler}
      noValidate
      data-shaking={shaking}
      className="space-y-4 data-[shaking=true]:animate-shake"
    >
      <FormField id="email" label="E-mail" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="ty@example.com"
          autoFocus
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="password"
        label="Hasło"
        error={errors.password?.message}
        warning={capsLock ? "Caps Lock jest włączony" : undefined}
      >
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="min. 8 znaków"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "password-error" : capsLock ? "password-warning" : undefined
            }
            className="pr-10"
            onKeyDown={(e) => setCapsLock(e.getModifierState("CapsLock"))}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isSubmitting}
            aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </FormField>

      <FormField id="confirmPassword" label="Powtórz hasło" error={errors.confirmPassword?.message}>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            disabled={isSubmitting}
            aria-required="true"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            className="pr-10"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            disabled={isSubmitting}
            aria-label={showConfirm ? "Ukryj hasło" : "Pokaż hasło"}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            {showConfirm ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </FormField>

      {serverError && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setCaptchaToken}
          onExpire={() => setCaptchaToken(undefined)}
          options={{ theme: "auto" }}
        />
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting || (!!TURNSTILE_SITE_KEY && !captchaToken)}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Tworzenie konta…
          </>
        ) : (
          "Utwórz konto"
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">lub</span>
        </div>
      </div>

      {oauthError && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {oauthError}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => signInWithOAuth("github")}
          disabled={!!oauthLoading}
        >
          {oauthLoading === "github" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <svg className="size-4" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          )}
          GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => signInWithOAuth("google")}
          disabled={!!oauthLoading}
        >
          {oauthLoading === "google" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <svg className="size-4" aria-hidden="true" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          )}
          Google
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Masz już konto?{" "}
        <Link
          href="/login"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          Zaloguj się
        </Link>
      </p>
    </form>
  );
}
