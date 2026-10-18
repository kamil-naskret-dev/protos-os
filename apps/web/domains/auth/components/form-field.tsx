import { Label } from "@protos/ui";
import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string | undefined;
  warning?: string | undefined;
  labelSuffix?: ReactNode | undefined;
  children: ReactNode;
}

export function FormField({ id, label, error, warning, labelSuffix, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className={labelSuffix ? "flex items-center justify-between" : undefined}>
        <Label htmlFor={id}>{label}</Label>
        {labelSuffix}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : warning ? (
        <p id={`${id}-warning`} className="text-sm text-muted-foreground">
          {warning}
        </p>
      ) : null}
    </div>
  );
}
