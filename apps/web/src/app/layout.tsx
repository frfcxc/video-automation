import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Automation Studio",
  description:
    "Browser-based MVP for automatic video clipping, English subtitles, and AI dubbing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 font-sans text-white">{children}</body>
    </html>
  );
}
