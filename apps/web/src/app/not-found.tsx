import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <div className="space-y-6 px-6 text-center">
        <p className="text-8xl font-bold text-cyan-400/30">404</p>
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mx-auto max-w-md text-base leading-7 text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/"
            className="rounded-full bg-cyan-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Back to Home →
          </Link>
          <Link
            href="/products"
            className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            View Products
          </Link>
        </div>
      </div>
    </main>
  );
}
