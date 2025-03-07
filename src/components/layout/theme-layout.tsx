import React from 'react';
import { ThemeProvider } from "../provider/theme-provider";

function ThemeLayout({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

export default ThemeLayout
