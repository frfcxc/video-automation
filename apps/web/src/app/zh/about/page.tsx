import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 FRFCX — 定制展柜制造商",
  description:
    "FRFCX 是领先的定制展柜和零售展示柜制造商，位于中国。16+年经验，18,000m²工厂，出口50+国家。CARB/UL合规。",
};

export default function ZhAboutPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
            关于我们
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            我们制造能推动销售的展示柜
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            FRFCX 自2008年起制造定制展柜和零售展示家具。从小作坊到18,000m²工厂，我们已向50+国家的零售商交付了2,500+个项目。
          </p>
        </div>

        <div className="mb-16 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">我们的故事</h2>
            <p className="text-base leading-7 text-slate-300">
              2008年创立时，FRFCX 只是一家为本地珠宝店服务的小木工坊。多年来，我们拓展到化妆品、眼镜、时装和电子产品零售领域——以质量、可靠性和设计灵活性建立了声誉。
            </p>
            <p className="text-base leading-7 text-slate-300">
              如今，我们拥有18,000m²的现代化工厂，配备CNC数控机床、封边机、喷漆房和LED组装线。200多人的团队包括设计师、木工、金工、电工和质检专员——共同交付符合国际标准的零售展示产品。
            </p>
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">为什么选择我们</h2>
            <ul className="space-y-4">
              {[
                "16+年专业展示柜制造经验",
                "18,000m²工厂，配备CNC、金属、木材和LED车间",
                "CARB认证板材，UL认证LED系统，ASTM E84合规",
                "生产前3D效果图和打样",
                "每个订单配备专属项目经理",
                "全流程质检——原材料、过程、成品",
                "FOB、CIF、DDP全球运输方案",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base leading-7 text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="mb-4 text-2xl font-semibold">合规与认证</h2>
          <p className="mb-6 max-w-3xl text-base leading-7 text-slate-300">
            我们理解美国、欧盟和中东零售连锁对材料和安全的严格要求。所有产品均可按以下标准制造：
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "CARB Phase 2 加州甲醛标准",
              "UL 认证 LED驱动和灯带",
              "ASTM E84 表面阻燃测试",
              "ADA 无障碍法案合规",
              "FSC 可持续林业认证（应要求）",
              "CE / RoHS 欧盟合规",
              "ISO 9001 质量管理体系",
              "Prop 65 加州安全材料",
              "EN 14749 家具耐久性测试",
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

        <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-950/50 to-slate-900/50 p-10 text-center sm:p-14">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            让我们一起打造
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-slate-300">
            无论您是开一家店还是500家连锁，我们都准备好成为您的展示柜制造伙伴。
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
  );
}
