import type { Metadata } from "next";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { RESTAURANT } from "@/constants/restaurant-data";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: RESTAURANT.seo.title,
  description: RESTAURANT.seo.description,
  keywords: RESTAURANT.seo.keywords,
  openGraph: {
    title: RESTAURANT.seo.title,
    description: RESTAURANT.seo.description,
    images: [RESTAURANT.seo.ogImage],
    url: RESTAURANT.seo.siteUrl,
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: RESTAURANT.seo.title,
    description: RESTAURANT.seo.description,
    images: [RESTAURANT.seo.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
      </head>
      <body className={`${lora.variable} font-serif`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            },
          }}
        />
      </body>
    </html>
  );
}
