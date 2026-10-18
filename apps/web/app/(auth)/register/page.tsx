import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthSplitLayout } from "../../../domains/auth/components/auth-split-layout";
import { RegisterForm } from "../../../domains/auth/components/register-form";

export const metadata: Metadata = {
  title: "Rejestracja — protos-os",
};

export default function RegisterPage() {
  return (
    <AuthSplitLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Utwórz konto</h1>
          <p className="text-sm text-muted-foreground">
            Dołącz do protos-os i zacznij zarządzać swoim życiem.
          </p>
        </div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </AuthSplitLayout>
  );
}
