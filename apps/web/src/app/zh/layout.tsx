import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:
      "FRFCX — 定制展柜、零售展示柜、店铺陈列家具制造商 | 工厂直供",
    template: "%s | FRFCX",
  },
  description:
    "FRFCX 专注定制珠宝展柜、化妆品展示柜、眼镜展示柜、服装展示架、电子展示柜。服务全球零售连锁品牌。工厂直供价，CARB/UL 美国合规，全球发货。",
  keywords: [
    "定制展柜",
    "展示柜",
    "珠宝展柜",
    "化妆品展示柜",
    "眼镜展示柜",
    "服装展示架",
    "店铺陈列",
    "货架",
    "零售展示",
    "陈列道具",
    "展示柜工厂",
    "展柜制造商",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    siteName: "FRFCX 定制展柜制造商",
    title: "FRFCX — 定制展柜、零售展示柜、店铺陈列家具制造商 | 工厂直供",
    description:
      "FRFCX 专注定制珠宝展柜、化妆品展示柜、眼镜展示柜。工厂直供价，服务全球零售品牌。",
  },
  alternates: {
    canonical: "/zh",
    languages: { en: "/" },
  },
};

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 font-sans text-white">
        {children}
      </body>
    </html>
  );
}
