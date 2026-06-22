import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact FRFCX — Get a Quote for Custom Showcases",
  description:
    "Contact FRFCX for custom showcase and retail display manufacturing. Send your specs for a free quote within 48 hours. WhatsApp, email, or contact form.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
            Contact Us
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Get a Quote for Your Display Project
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            Tell us about your project and we&apos;ll respond within 48 hours
            with a custom quote, 3D renderings, and shipping options.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">Reach Us Directly</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">📧</span>
                <div>
                  <h3 className="font-medium text-white">Email</h3>
                  <p className="text-slate-400">
                    <a
                      href="mailto:sales@frfcx.com"
                      className="text-cyan-300 hover:underline"
                    >
                      sales@frfcx.com
                    </a>
                  </p>
                  <p className="text-sm text-slate-500">
                    For catalogs, quotes, and general inquiries
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">📱</span>
                <div>
                  <h3 className="font-medium text-white">WhatsApp</h3>
                  <p className="text-slate-400">
                    <a
                      href="https://wa.me/yourwhatsappnumber"
                      className="text-cyan-300 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +86 [Your WhatsApp Number]
                    </a>
                  </p>
                  <p className="text-sm text-slate-500">
                    Fastest response — message any time
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">🏭</span>
                <div>
                  <h3 className="font-medium text-white">Factory Address</h3>
                  <p className="text-slate-400">
                    [Your Factory Address]
                    <br />
                    Guangzhou, Guangdong, China
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-3 font-semibold">
                What to Include in Your Inquiry
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">1.</span>
                  Product type and quantity needed
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">2.</span>
                  Approximate dimensions or store layout
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">3.</span>
                  Material and finish preferences
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">4.</span>
                  Reference images or design drawings if available
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">5.</span>
                  Shipping destination (for freight estimate)
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form (HTML-only, no JS needed) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="mb-6 text-2xl font-semibold">
              Send Us a Message
            </h2>
            <form
              action="mailto:sales@frfcx.com"
              method="POST"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Your Store Name"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="Tell us about your project: product type, quantity, materials, timeline..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Send Inquiry →
              </button>
              <p className="text-center text-xs text-slate-500">
                Or email us directly at{" "}
                <a
                  href="mailto:sales@frfcx.com"
                  className="text-cyan-400 hover:underline"
                >
                  sales@frfcx.com
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
