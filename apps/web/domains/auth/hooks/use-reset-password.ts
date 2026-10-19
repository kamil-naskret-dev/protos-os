"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { mapAuthError } from "../utils/map-auth-error";
import type { ResetPasswordFormValues } from "../schemas";

export function useResetPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  async function resetPassword(values: ResetPasswordFormValues): Promise<boolean> {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password/confirm`,
    });

    if (error) {
      setServerError(mapAuthError(error.message));
      return false;
    }

    setEmailSent(true);
    return true;
  }

  return { resetPassword, serverError, emailSent };
}
