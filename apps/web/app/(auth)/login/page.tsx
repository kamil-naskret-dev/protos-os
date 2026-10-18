import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthSplitLayout } from "../../../domains/auth/components/auth-split-layout";
import { LoginForm } from "../../../domains/auth/components/login-form";

export const metadata: Metadata = {
  title: "Logowanie — protos-os",
};

export default function LoginPage() {
  return (
    <AuthSplitLayout>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Zaloguj się</h1>
          <p className="text-sm text-muted-foreground">Podaj swoje dane, aby kontynuować.</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </AuthSplitLayout>
  );
}
