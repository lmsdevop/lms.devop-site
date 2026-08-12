"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { I18nProvider } from "@/i18n/provider";

export function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider initialLocale={locale}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!bg-bg-elevated !text-fg !border-line !rounded-xl !font-sans",
          }}
        />
      </I18nProvider>
    </ThemeProvider>
  );
}
