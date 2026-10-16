import type { Metadata } from "next";
import { ReactQueryProvider } from "../lib/react-query";
import "./globals.css";

export const metadata: Metadata = {
  title: "protos-os",
  description: "Your personal operating system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
