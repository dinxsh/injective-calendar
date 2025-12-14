import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "events calendar micro-site for ninjaHQ & injective 📆",
  description: "events calendar micro-site for ninjaHQ & injective 📆",
  openGraph: {
    title: "events calendar micro-site for ninjaHQ & injective 📆",
    description: "events calendar micro-site for ninjaHQ & injective 📆",
  },
  twitter: {
    card: "summary_large_image",
    title: "events calendar micro-site for ninjaHQ & injective 📆",
    description: "events calendar micro-site for ninjaHQ & injective 📆",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="nextjs-ui-theme">
          <SidebarConfigProvider>
            {children}
          </SidebarConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
