"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@protos/ui";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../hooks/use-update-password";
import { newPasswordSchema } from "../schemas";
import type { NewPasswordFormValues } from "../schemas";
import { FormField } from "./form-field";

const SHAKE_DURATION_MS = 500;

export function UpdatePasswordForm() {
  const { updatePassword, serverError, success } = useUpdatePassword();
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
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
  });

  async function onSubmit(values: NewPasswordFormValues) {
    const ok = await updatePassword(values);
    if (!ok) setShaking(true);
  }

  if (success) {
    return (
      <div className="space-y-3 rounded-xl border border-border bg-muted/40 px-6 py-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold">Hasło zostało zmienione</h2>
        <p className="text-sm text-muted-foreground">
          Możesz teraz zalogować się używając nowego hasła.
        </p>
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
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      data-shaking={shaking}
      className="space-y-4 data-[shaking=true]:animate-shake"
    >
      <FormField
        id="password"
        label="Nowe hasło"
        error={errors.password?.message}
        warning={capsLock ? "Caps Lock jest włączony" : undefined}
      >
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="min. 8 znaków"
            autoFocus
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

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Zapisywanie…
          </>
        ) : (
          "Ustaw nowe hasło"
        )}
      </Button>
    </form>
  );
}
