"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { mapAuthError } from "../utils/map-auth-error";
import type { NewPasswordFormValues } from "../schemas";

export function useUpdatePassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function updatePassword(values: NewPasswordFormValues): Promise<boolean> {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: values.password });

    if (error) {
      setServerError(mapAuthError(error.message));
      return false;
    }

    setSuccess(true);
    return true;
  }

  return { updatePassword, serverError, success };
}
