import type { Metadata } from "next";
import { Outfit, Great_Vibes } from "next/font/google";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { RESTAURANT } from "@/constants/restaurant-data";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-great-vibes",
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
    <html lang="tr" className={`${outfit.variable} ${greatVibes.variable}`}>
      <head>
      </head>
      <body className={`${outfit.className} font-sans`}>
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
