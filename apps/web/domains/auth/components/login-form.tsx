"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Label } from "@protos/ui";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSignIn } from "../hooks/use-sign-in";
import { loginSchema } from "../schemas";
import type { LoginFormValues } from "../schemas";
import { FormField } from "./form-field";

const CALLBACK_URL_PARAM = "callbackUrl";
const SHAKE_DURATION_MS = 500;

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get(CALLBACK_URL_PARAM) ?? "/";
  const { signIn, serverError } = useSignIn(callbackUrl);
  const [showPassword, setShowPassword] = useState(false);
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
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: true },
  });

  const rememberMe = useWatch({ control, name: "rememberMe", defaultValue: true });

  async function onSubmit(values: LoginFormValues) {
    const ok = await signIn(values);
    if (!ok) setShaking(true);
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

      <FormField
        id="password"
        label="Hasło"
        error={errors.password?.message}
        warning={capsLock ? "Caps Lock jest włączony" : undefined}
        labelSuffix={
          <Link
            href="/reset-password"
            className="text-sm text-primary transition-colors hover:text-primary/80"
          >
            Zapomniałeś hasła?
          </Link>
        }
      >
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
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

      <div className="flex items-center gap-2">
        <Checkbox
          id="remember-me"
          checked={rememberMe}
          onCheckedChange={(checked) => setValue("rememberMe", checked === true)}
          disabled={isSubmitting}
        />
        <Label htmlFor="remember-me" className="cursor-pointer font-normal">
          Zapamiętaj mnie
        </Label>
      </div>

      {serverError && (
        <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {serverError}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Logowanie…
          </>
        ) : (
          "Zaloguj się"
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Nie masz konta?{" "}
        <Link
          href="/register"
          className="font-medium text-primary transition-colors hover:text-primary/80"
        >
          Zarejestruj się
        </Link>
      </p>
    </form>
  );
}
