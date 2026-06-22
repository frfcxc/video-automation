import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Custom Showcases & Retail Displays",
  description:
    "Browse FRFCX product categories: jewelry showcases, cosmetics displays, optical fixtures, fashion racks, electronics counters, and custom retail furniture. Factory-direct from China.",
};

const productSections = [
  {
    id: "jewelry",
    title: "Jewelry & Watch Showcases",
    icon: "💍",
    description:
      "Premium custom showcases for jewelry stores and luxury watch boutiques. Glass display counters, LED-lit cabinets, wall-mounted displays, and freestanding towers.",
    features: [
      "Tempered glass panels with lockable sliding doors",
      "Integrated 3000K/4000K LED lighting with dimmable drivers",
      "Microfiber-lined interior trays and display risers",
      "Custom finishes: wood veneer, lacquer, stainless steel, brass",
      "Hidden cable management and ventilation",
    ],
    imageAlt: "Jewelry showcase display counter with LED lighting",
  },
  {
    id: "cosmetics",
    title: "Cosmetics & Beauty Displays",
    icon: "💄",
    description:
      "Branded retail displays for beauty chains and cosmetic boutiques. Tester bars, backlit gondola shelving, fragrance towers, and promotional kiosks.",
    features: [
      "Backlit acrylic shelves with edge lighting",
      "Integrated tester stations with mirrors",
      "Branding panels with silkscreen or UV printing",
      "Lockable storage compartments and drawers",
      "Modular design for easy store layout changes",
    ],
    imageAlt: "Cosmetics display counter with tester bar and backlit shelves",
  },
  {
    id: "optical",
    title: "Optical & Eyewear Displays",
    icon: "👓",
    description:
      "Complete optical shop fitting solutions. Frame display walls, dispensing counters, sunglass towers, and reception desks for eyewear retail chains.",
    features: [
      "Magnetic frame display panels for easy rearrangement",
      "Lockable frame drawers with foam padding",
      "Prescription counter with integrated sink cutout",
      "Mirror stations with adjustable lighting",
      "Branding header panels for each display zone",
    ],
    imageAlt: "Optical eyewear display cabinet with frame wall",
  },
  {
    id: "fashion",
    title: "Fashion & Apparel Fixtures",
    icon: "👗",
    description:
      "Display fixtures for clothing boutiques and fashion retailers. Garment racks, folding tables, wall systems, accessory units, and mannequin platforms.",
    features: [
      "Freestanding garment rails with height adjustability",
      "Stackable display tables with storage drawers",
      "Slatwall and gridwall panel systems",
      "Hat/accessory display stands and trays",
      "POS counter with integrated wrap station",
    ],
    imageAlt: "Fashion boutique garment display rack and shelving",
  },
  {
    id: "electronics",
    title: "Electronics & Mobile Counters",
    icon: "📱",
    description:
      "Security display fixtures for electronics retailers. Demo tables, alarmed showcases, phone display counters, and interactive kiosks with cable management.",
    features: [
      "Security alarm tethers with retractable cables",
      "Integrated power supply and USB charging ports",
      "Touchscreen demo mounts and brackets",
      "Ventilated display compartments for powered devices",
      "Branded header signage with LED halo lighting",
    ],
    imageAlt: "Mobile phone display counter with security showcases",
  },
  {
    id: "custom",
    title: "Custom Retail Displays",
    icon: "🏪",
    description:
      "Fully bespoke retail furniture for any industry. Supermarket shelving, wine racks, pharmacy displays, pop-up kiosks, museum showcases — built to your exact specifications.",
    features: [
      "100% custom dimensions, materials, and finishes",
      "Multiple material options: wood, metal, glass, acrylic, stone",
      "Integrated lighting: LED strips, spotlights, backlighting",
      "Graphics and branding application",
      "Prototyping and 3D rendering before production",
    ],
    imageAlt: "Custom retail display furniture built to specification",
  },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
            Our Products
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Custom Showcases &amp; Retail Display Solutions
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            Every product is custom-made to your design specifications. Choose
            your materials, finishes, dimensions, and lighting. We build exactly
            what your store needs.
          </p>
        </div>

        {/* Product Sections */}
        <div className="space-y-16">
          {productSections.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-20 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <span className="text-3xl">{section.icon}</span>
                <h2 className="text-2xl font-semibold sm:text-3xl">
                  {section.title}
                </h2>
              </div>
              <p className="mb-6 max-w-3xl text-base leading-7 text-slate-300">
                {section.description}
              </p>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-100/80">
                Key Features
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {section.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-6 text-slate-400"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/60" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-950/50 to-slate-900/50 p-10 text-center sm:p-14">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            Don&apos;t See Exactly What You Need?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-slate-300">
            Every project is custom. Send us your drawings, photos, or even a
            sketch — we&apos;ll turn it into a manufactured reality. Free 3D
            renderings with every quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-full bg-cyan-400 px-10 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Request a Quote →
          </Link>
        </div>
      </section>
    </main>
  );
}
