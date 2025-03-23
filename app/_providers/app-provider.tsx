"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ComposeChildren } from "@/lib/react";
import React from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange/>
        {children}
    </ComposeChildren>
  );
}