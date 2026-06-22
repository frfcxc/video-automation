import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系 FRFCX — 获取定制展柜报价",
  description:
    "联系 FRFCX 获取定制展柜和零售展示柜制造服务。发送您的规格，48小时内获取免费报价。WhatsApp、邮件或联系表单。",
};

export default function ZhContactPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_32%),linear-gradient(180deg,_#020617_0%,_#0f172a_52%,_#111827_100%)] text-white">
      <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="mb-12 space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-100/80">
            联系我们
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            获取您的展示项目报价
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-400">
            告诉我们您的项目需求，我们将在48小时内回复——包含定制报价、3D效果图和运输方案。
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold">直接联系我们</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">📧</span>
                <div>
                  <h3 className="font-medium text-white">电子邮件</h3>
                  <p className="text-slate-400">
                    <a
                      href="mailto:sales@frfcx.com"
                      className="text-cyan-300 hover:underline"
                    >
                      sales@frfcx.com
                    </a>
                  </p>
                  <p className="text-sm text-slate-500">获取产品目录、报价和一般咨询</p>
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
                      +86 [您的 WhatsApp 号码]
                    </a>
                  </p>
                  <p className="text-sm text-slate-500">最快响应——随时留言</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">🏭</span>
                <div>
                  <h3 className="font-medium text-white">工厂地址</h3>
                  <p className="text-slate-400">
                    [您的工厂地址]
                    <br />
                    中国广东省广州市
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-3 font-semibold">询价时请包含以下信息</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">1.</span>
                  产品类型和需求数量
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">2.</span>
                  大致尺寸或店铺平面图
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">3.</span>
                  材料和表面处理偏好
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">4.</span>
                  参考图片或设计图纸（如有）
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-400">5.</span>
                  运输目的地（用于运费估算）
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h2 className="mb-6 text-2xl font-semibold">发送消息</h2>
            <form
              action="mailto:sales@frfcx.com"
              method="POST"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="zh-name"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  姓名 *
                </label>
                <input
                  type="text"
                  id="zh-name"
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="张三"
                />
              </div>
              <div>
                <label
                  htmlFor="zh-email"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  邮箱 *
                </label>
                <input
                  type="email"
                  id="zh-email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="zhangsan@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="zh-company"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  公司名称
                </label>
                <input
                  type="text"
                  id="zh-company"
                  name="company"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="您的店铺名称"
                />
              </div>
              <div>
                <label
                  htmlFor="zh-message"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  项目详情 *
                </label>
                <textarea
                  id="zh-message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                  placeholder="请描述您的项目：产品类型、数量、材料、时间要求..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                发送询价 →
              </button>
              <p className="text-center text-xs text-slate-500">
                或直接发送邮件至{" "}
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
