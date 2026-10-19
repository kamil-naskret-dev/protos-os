import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthSplitLayout } from "../../../../domains/auth/components/auth-split-layout";
import { UpdatePasswordForm } from "../../../../domains/auth/components/update-password-form";

export const metadata: Metadata = {
  title: "Nowe hasło — protos-os",
};

export default function ResetPasswordConfirmPage() {
  return (
    <AuthSplitLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Ustaw nowe hasło</h1>
          <p className="text-sm text-muted-foreground">Wprowadź nowe hasło dla swojego konta.</p>
        </div>
        <Suspense>
          <UpdatePasswordForm />
        </Suspense>
      </div>
    </AuthSplitLayout>
  );
}
