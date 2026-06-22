import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FRFCX — Custom Showcase Manufacturer",
  description:
    "FRFCX is a leading custom showcase and retail display manufacturer based in China. 16+ years experience, 18,000m² factory, exporting to 50+ countries. CARB/UL compliant.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
            About Us
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            We Build Displays That Sell
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            FRFCX has been manufacturing custom showcases and retail display
            furniture since 2008. From a small workshop to an 18,000m² factory,
            we&apos;ve delivered over 2,500 projects to retailers in 50+
            countries.
          </p>
        </div>

        {/* Story */}
        <div className="mb-16 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-base leading-7 text-slate-300">
              Founded in 2008, FRFCX started as a small woodworking shop serving
              local jewelry stores. Over the years, we expanded into cosmetics,
              optical, fashion, and electronics retail — building a reputation
              for quality, reliability, and design flexibility.
            </p>
            <p className="text-base leading-7 text-slate-300">
              Today, we operate a modern 18,000m² facility equipped with CNC
              routers, edge banders, spray booths, and LED assembly lines. Our
              team of 200+ includes designers, carpenters, metalworkers,
              electricians, and QC specialists — all working together to deliver
              retail displays that meet international standards.
            </p>
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">Why Work With Us</h2>
            <ul className="space-y-4">
              {[
                "16+ years of specialized display manufacturing experience",
                "18,000m² factory with in-house CNC, metal, wood, and LED shops",
                "CARB-certified MDF, UL-listed LED systems, ASTM E84 compliant",
                "3D rendering and prototyping before production",
                "Dedicated project manager for every order",
                "QC inspection at every stage — raw material, in-process, final",
                "FOB, CIF, and DDP shipping options worldwide",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base leading-7 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compliance */}
        <div className="mb-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="mb-4 text-2xl font-semibold">
            Compliance &amp; Certifications
          </h2>
          <p className="mb-6 max-w-3xl text-base leading-7 text-slate-300">
            We understand that US, EU, and Middle East retail chains have strict
            material and safety requirements. All our products can be
            manufactured to comply with:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "CARB Phase 2 — California formaldehyde",
              "UL Listed — LED drivers and strips",
              "ASTM E84 — Surface flame spread",
              "ADA — Accessibility compliance",
              "FSC — Sustainable forestry (on request)",
              "CE / RoHS — European compliance",
              "ISO 9001 — Quality management",
              "Proposition 65 — California safe materials",
              "EN 14749 — Furniture durability",
            ].map((cert, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-white/5 px-4 py-3 text-sm text-slate-300"
              >
                <span className="text-cyan-400">✓</span>
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-950/50 to-slate-900/50 p-10 text-center sm:p-14">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Let&apos;s Build Something Together
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-slate-300">
            Whether you&apos;re opening one store or rolling out 500, we&apos;re
            ready to be your display manufacturing partner.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-cyan-400 px-10 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </main>
  );
}
