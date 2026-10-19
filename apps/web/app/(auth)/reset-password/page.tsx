import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthSplitLayout } from "../../../domains/auth/components/auth-split-layout";
import { ResetPasswordForm } from "../../../domains/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Resetowanie hasła — protos-os",
};

export default function ResetPasswordPage() {
  return (
    <AuthSplitLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Resetuj hasło</h1>
          <p className="text-sm text-muted-foreground">
            Podaj adres e-mail, a wyślemy Ci link do ustawienia nowego hasła.
          </p>
        </div>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </AuthSplitLayout>
  );
}
