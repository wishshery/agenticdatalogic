import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "AssistAI — Your AI-Powered Virtual Assistant Team",
    template: "%s | AssistAI",
  },
  description:
    "AssistAI provides 24/7 AI-powered virtual assistants for entrepreneurs, freelancers, and small businesses. Handle admin, scheduling, email, research, social media, and more.",
  keywords: ["AI assistant", "virtual assistant", "SaaS", "productivity", "automation", "scheduling"],
  authors: [{ name: "AssistAI Team" }],
  creator: "AssistAI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://assistai.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "AssistAI — Your AI-Powered Virtual Assistant Team",
    description: "AI agents that handle your business tasks 24/7",
    siteName: "AssistAI",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AssistAI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AssistAI",
    description: "Your AI-Powered Virtual Assistant Team",
    images: ["/og-image.png"],
    creator: "@assistai",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AssistAI",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: { background: "#1E293B", color: "#F1F5F9", border: "1px solid #334155" },
              success: { iconTheme: { primary: "#10B981", secondary: "#fff" } },
              error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
