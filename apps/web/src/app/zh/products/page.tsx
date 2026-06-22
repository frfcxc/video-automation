import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "产品 — 定制展柜与零售展示架",
  description:
    "浏览 FRFCX 产品分类：珠宝展柜、化妆品展示、眼镜展示架、服装展示道具、电子展示台、定制零售陈列家具。中国工厂直供。",
};

const productSections = [
  {
    id: "jewelry",
    title: "珠宝 & 手表展柜",
    icon: "💍",
    description:
      "高端珠宝店和手表精品店定制展柜。玻璃展示柜台、LED灯展柜、壁挂式展示架和独立式展示塔。",
    features: [
      "钢化玻璃面板，带锁推拉门",
      "集成 3000K/4000K LED 照明，可调光驱动",
      "微纤维内饰托盘和展示台",
      "定制表面处理：木皮、烤漆、不锈钢、黄铜",
      "隐藏式线缆管理和通风设计",
    ],
  },
  {
    id: "cosmetics",
    title: "化妆品 & 美妆展示",
    icon: "💄",
    description:
      "美妆连锁和化妆品精品店品牌零售展示。试妆台、背光货架、香水展示塔和促销展示亭。",
    features: [
      "带边缘照明的背光亚克力层板",
      "集成试妆台和镜子",
      "丝印或UV印刷品牌面板",
      "带锁储物隔层和抽屉",
      "模块化设计，便于店面布局调整",
    ],
  },
  {
    id: "optical",
    title: "眼镜展示柜",
    icon: "👓",
    description:
      "眼镜店整店陈列方案。镜框展示墙、验光台、太阳镜展示塔和接待台，服务眼镜零售连锁。",
    features: [
      "磁性镜框展示面板，方便重新排列",
      "带海绵垫的带锁镜框抽屉",
      "带集成水槽开孔的验光台",
      "带可调照明的试镜站",
      "每个展示区的品牌标识面板",
    ],
  },
  {
    id: "fashion",
    title: "服装展示架",
    icon: "👗",
    description:
      "服装精品店和时装零售展示道具。衣架、折叠桌、墙面系统、配饰展示单元和模特平台。",
    features: [
      "可调节高度的独立衣架",
      "带储物抽屉的可堆叠展示桌",
      "板条墙和网格墙面板系统",
      "帽子和配饰展示架和托盘",
      "带集成包装台的收银台",
    ],
  },
  {
    id: "electronics",
    title: "电子产品展示台",
    icon: "📱",
    description:
      "电子零售店安全展示架。演示桌、报警展柜、手机展示台和集成线缆管理的互动体验亭。",
    features: [
      "带可伸缩线缆的安全报警绳",
      "集成电源和USB充电接口",
      "触摸屏演示支架",
      "通电设备通风展示隔层",
      "带LED光环照明的品牌标识牌",
    ],
  },
  {
    id: "custom",
    title: "定制零售陈列",
    icon: "🏪",
    description:
      "全定制零售家具，适用于任何行业。超市货架、酒柜、药店陈列、快闪店展亭、博物馆展柜——完全按您的规格制造。",
    features: [
      "100% 定制尺寸、材料和表面处理",
      "多种材料选择：木材、金属、玻璃、亚克力、石材",
      "集成照明：LED灯带、射灯、背光",
      "图案和品牌标识应用",
      "生产前提供3D效果图和打样",
    ],
  },
];

export default function ZhProductsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
            我们的产品
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            定制展柜 &amp; 零售展示解决方案
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            每件产品都按您的设计规格定制。选择您的材料、表面处理、尺寸和照明。我们为您的店铺精准制造。
          </p>
        </div>

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
                核心特性
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

        <div className="mt-16 rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-950/50 to-slate-900/50 p-10 text-center sm:p-14">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            没看到您需要的？
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-slate-300">
            每个项目都是定制的。发送您的图纸、照片，甚至草图——我们将它变成制造现实。每次报价附赠免费3D效果图。
          </p>
          <Link
            href="/zh/contact"
            className="inline-flex rounded-full bg-cyan-400 px-10 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            获取报价 →
          </Link>
        </div>
      </section>
    </main>
  );
}
