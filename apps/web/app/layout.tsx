import type { Metadata } from "next";
import { ReactQueryProvider } from "../lib/react-query";
import "./globals.css";

export const metadata: Metadata = {
  title: "protos-os",
  description: "Your personal operating system",
};

// Inline script runs before first paint to prevent flash of wrong theme.
// Reads localStorage "theme" → falls back to system preference.
const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  } catch (_) {}
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
