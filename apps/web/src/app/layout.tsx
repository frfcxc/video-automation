import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://frfcxcfurniturecustommadeshowcase.com"),
  title: {
    default:
      "FRFCX — Custom Showcase & Retail Display Manufacturer | Factory Direct",
    template: "%s | FRFCX",
  },
  description:
    "FRFCX is a China-based manufacturer specializing in custom showcases, retail display cabinets, shop fitting furniture, and store fixtures. Serving jewelry, cosmetics, fashion, optical, and electronics retailers worldwide. Factory-direct pricing, CARB/UL compliant.",
  keywords: [
    "custom showcase",
    "display cabinet",
    "retail display",
    "store fixture",
    "shop fitting",
    "jewelry showcase",
    "cosmetics display",
    "optical display",
    "watch display",
    "gondola shelving",
    "custom retail furniture",
    "display counter",
    "glass showcase",
    "LED display cabinet",
    "retail shelving",
  ],
  authors: [{ name: "FRFCX" }],
  creator: "FRFCX",
  publisher: "FRFCX",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: "FRFCX Custom Showcase Manufacturer",
    title:
      "FRFCX — Custom Showcase & Retail Display Manufacturer | Factory Direct",
    description:
      "Factory-direct custom showcases, retail display cabinets, and shop fitting furniture. Serving global retail chains. CARB/UL compliant.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FRFCX — Custom Showcase Manufacturer China",
    description:
      "Factory-direct custom showcases and retail display cabinets. CARB/UL compliant, worldwide shipping.",
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", zh: "/zh" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 font-sans text-white">
        {children}
      </body>
    </html>
  );
}
