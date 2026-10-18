"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { mapAuthError } from "../utils/map-auth-error";
import type { RegisterFormValues } from "../schemas";

export function useSignUp() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  async function signUp(values: RegisterFormValues): Promise<boolean> {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setServerError(mapAuthError(error.message));
      return false;
    }

    setEmailSent(true);
    return true;
  }

  return { signUp, serverError, emailSent };
}
