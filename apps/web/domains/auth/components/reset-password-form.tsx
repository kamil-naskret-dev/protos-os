"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@protos/ui";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../hooks/use-reset-password";
import { resetPasswordSchema } from "../schemas";
import type { ResetPasswordFormValues } from "../schemas";
import { FormField } from "./form-field";

const SHAKE_DURATION_MS = 500;

export function ResetPasswordForm() {
  const { resetPassword, serverError, emailSent } = useResetPassword();
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
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    const ok = await resetPassword(values);
    if (!ok) setShaking(true);
  }

  if (emailSent) {
    return (
      <div className="space-y-3 rounded-xl border border-border bg-muted/40 px-6 py-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold">Sprawdź skrzynkę</h2>
        <p className="text-sm text-muted-foreground">
          Wysłaliśmy link do resetowania hasła na{" "}
          <span className="font-medium text-foreground">{getValues("email")}</span>. Kliknij go, aby
          ustawić nowe hasło.
        </p>
        <p className="text-xs text-muted-foreground">Nie widzisz e-maila? Sprawdź folder spam.</p>
        <Link
          href="/login"
          className="mt-2 inline-block text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Wróć do logowania
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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

      {serverError && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Wysyłanie…
          </>
        ) : (
          "Wyślij link resetujący"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Pamiętasz hasło?{" "}
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
