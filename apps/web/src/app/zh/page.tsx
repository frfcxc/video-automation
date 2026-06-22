import Link from "next/link";

const productCategories = [
  {
    title: "珠宝 & 手表展柜",
    description:
      "定制玻璃展示柜台、LED珠宝展柜、奢侈品手表陈列柜、高端黄金展示台，专为珠宝连锁和精品店打造。",
    icon: "💍",
    href: "/zh/products#jewelry",
  },
  {
    title: "化妆品 & 美妆展示",
    description:
      "品牌试妆台、背光货架、化妆品陈列台、香水展示柜、促销展示亭，服务美妆零售连锁品牌。",
    icon: "💄",
    href: "/zh/products#cosmetics",
  },
  {
    title: "眼镜展示柜",
    description:
      "镜框展示墙、LED眼镜展柜、验光台、眼镜店整店陈列方案，为眼镜零售连锁提供一站式服务。",
    icon: "👓",
    href: "/zh/products#optical",
  },
  {
    title: "服装展示架",
    description:
      "服装展示架、陈列桌、墙面系统、模特平台、配饰展示单元，适用于服装精品店和百货商场。",
    icon: "👗",
    href: "/zh/products#fashion",
  },
  {
    title: "电子产品展示台",
    description:
      "防盗展示柜、演示台、数码展柜、互动体验亭、品牌手机展示台（集成线缆管理），服务电子零售店。",
    icon: "📱",
    href: "/zh/products#electronics",
  },
  {
    title: "定制零售陈列",
    description:
      "全定制零售家具——超市货架、酒柜、药店陈列、快闪店展亭、博物馆展柜等。按图纸定制，100% 还原设计。",
    icon: "🏪",
    href: "/zh/products#custom",
  },
];

const advantages = [
  {
    title: "工厂直供",
    description:
      "自有18000m²制造工厂。无中间商，比本地供应商价格低 30-50%。",
  },
  {
    title: "美国合规",
    description:
      "CARB 认证板材、UL 认证 LED 系统、ASTM E84 防火材料。完全满足美国零售连锁要求。",
  },
  {
    title: "定制设计",
    description:
      "按您的图纸或我们出方案。任何材质、表面处理、尺寸、灯光配置均可定制。OEM/ODM 欢迎。",
  },
  {
    title: "全球物流",
    description:
      "FOB / CIF / DDP 多种运输方式。整柜或拼柜均可。设计确认后 25-35 天生产周期。准时交付有保障。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FRFCX",
  url: "https://frfcxcfurniturecustommadeshowcase.com/zh",
  description:
    "定制展柜和零售展示柜制造商——珠宝展柜、化妆品展示柜、眼镜展示柜、服装展示架等。",
  knowsAbout: [
    "定制展柜",
    "零售展示柜",
    "店铺陈列家具",
    "展示架",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["Chinese", "English"],
  },
};

export default function ZhHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
        {/* ── Hero ── */}
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-14 lg:px-10 lg:pb-20 lg:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-cyan-100">
                工厂直供 · 始于 2008
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                定制展柜 &amp; 零售展示柜制造商
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                FRFCX 专注制造高端定制展柜、零售展示柜和店铺陈列家具，服务珠宝、化妆品、眼镜、服装、电子等全球零售品牌。工厂直供价，美国合规材料，全球发货。
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/zh/products"
                  className="rounded-full bg-cyan-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  查看产品
                </Link>
                <Link
                  href="/zh/contact"
                  className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  获取报价
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { value: "16+", label: "年行业经验" },
                { value: "18,000m²", label: "工厂面积" },
                { value: "50+", label: "出口国家" },
                { value: "2,500+", label: "交付项目" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur"
                >
                  <div className="text-2xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 产品分类 ── */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
          <div className="mb-10 space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
              我们的产品
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              产品分类
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productCategories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
              >
                <div className="mb-3 text-3xl">{cat.icon}</div>
                <h3 className="mb-2 text-lg font-semibold group-hover:text-cyan-200">
                  {cat.title}
                </h3>
                <p className="text-sm leading-6 text-slate-400">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 我们的优势 ── */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
          <div className="mb-10 space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
              为什么选择 FRFCX
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              FRFCX 优势
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold">{adv.title}</h3>
                <p className="text-sm leading-6 text-slate-400">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 服务行业 ── */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-20 lg:px-10">
          <div className="mb-10 space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
              服务行业
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              我们的客户
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "珠宝 & 手表",
              "化妆品 & 美妆",
              "服装 & 时尚",
              "眼镜",
              "电子 & 手机",
              "百货商场",
              "超市 & 量贩",
              "药妆 & 健康",
              "酒类零售",
              "博物馆 & 文化零售",
              "机场 & 免税",
              "购物中心",
            ].map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300"
              >
                {industry}
              </span>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-950/50 to-slate-900/50 p-10 text-center sm:p-14">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              准备好讨论您的展示项目了吗？
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-slate-300">
              发送您的设计规格或告诉我们您的店铺概念。我们将在 48
              小时内提供定制报价——包含 3D 效果图、材料样品和运输方案。
            </p>
            <Link
              href="/zh/contact"
              className="inline-flex rounded-full bg-cyan-400 px-10 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              联系我们 →
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
