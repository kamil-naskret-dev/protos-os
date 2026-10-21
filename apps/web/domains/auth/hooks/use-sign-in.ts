"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { mapAuthError } from "../utils/map-auth-error";
import type { LoginFormValues } from "../schemas";

export function useSignIn(callbackUrl = "/") {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  async function signIn(values: LoginFormValues, captchaToken?: string): Promise<boolean> {
    setServerError(null);
    const supabase = createClient({ persistSession: values.rememberMe });
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
      ...(captchaToken && { options: { captchaToken } }),
    });

    if (error) {
      setServerError(mapAuthError(error.message));
      return false;
    }

    router.push(callbackUrl);
    router.refresh();
    return true;
  }

  return { signIn, serverError };
}
