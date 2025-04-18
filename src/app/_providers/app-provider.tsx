"use client";


import { AppSessionProvider } from "@/src/entities/session/app-session-provider";
import { ThemeProvider } from "@/src/shared/components/theme-provider";
import { ToastProvider } from "@/src/shared/components/toast-provider";

import { ComposeChildren } from "@/src/shared/lib/react";
import React from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ComposeChildren>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange/>
          <AppSessionProvider/>
  
          {children}
      </ComposeChildren>
      <ToastProvider/>
    </>
  );
}