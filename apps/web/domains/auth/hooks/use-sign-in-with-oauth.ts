"use client";

import { useState } from "react";
import { createClient } from "../../../lib/supabase/client";
import { mapAuthError } from "../utils/map-auth-error";

type OAuthProvider = "google" | "github";

export function useSignInWithOAuth() {
  const [loading, setLoading] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function signInWithOAuth(provider: OAuthProvider) {
    setError(null);
    setLoading(provider);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(mapAuthError(error.message));
      setLoading(null);
    }
  }

  return { signInWithOAuth, loading, error };
}
