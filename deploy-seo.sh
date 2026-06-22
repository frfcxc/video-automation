#!/bin/bash
# FRFCX SEO 一键部署脚本
# 在服务器上运行: bash deploy-seo.sh
set -e

echo "========================================="
echo "  FRFCX SEO 部署脚本"
echo "========================================="

# 1. 找到网站目录
echo ""
echo "[1/6] 查找网站目录..."

SITE_DIR=""
for dir in /var/www/frfcx* /var/www/html /opt/app /home/*/frfcx* /root/frfcx* /opt/frfcx*; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    SITE_DIR="$dir"
    echo "  找到: $SITE_DIR"
    break
  fi
done

if [ -z "$SITE_DIR" ]; then
  # 尝试从 nginx 配置推断
  SITE_DIR=$(grep -r "root\|proxy_pass" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | grep -oP '(?<=root |proxy_pass http://127.0.0.1:3000).*' | head -1 | tr -d ' ;')
  if [ -z "$SITE_DIR" ]; then
    # 尝试从 pm2 进程找
    SITE_DIR=$(pm2 list 2>/dev/null | grep -oP '/[^ ]+' | head -1 | xargs dirname 2>/dev/null)
  fi
  if [ -z "$SITE_DIR" ]; then
    echo "  ❌ 找不到网站目录！请手动输入："
    read -p "  网站完整路径: " SITE_DIR
  fi
fi

echo "  使用目录: $SITE_DIR"
cd "$SITE_DIR"

# 2. 备份当前版本
echo ""
echo "[2/6] 备份当前版本..."
BACKUP_DIR="/tmp/frfcx-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r "$SITE_DIR/src" "$BACKUP_DIR/src" 2>/dev/null || true
cp "$SITE_DIR/package.json" "$BACKUP_DIR/" 2>/dev/null || true
cp "$SITE_DIR/next.config.ts" "$BACKUP_DIR/" 2>/dev/null || true
cp "$SITE_DIR/next.config.js" "$BACKUP_DIR/" 2>/dev/null || true
echo "  备份到: $BACKUP_DIR"

# 3. 拉取最新代码
echo ""
echo "[3/6] 拉取最新 SEO 优化代码..."
if git rev-parse --git-dir > /dev/null 2>&1; then
  git fetch origin master
  git reset --hard origin/master
  echo "  ✅ 代码已更新"
else
  echo "  ⚠️  当前目录不是 git 仓库，将手动更新关键文件..."
fi

# 4. 修复 SEO 关键文件（如果 git pull 不可用）
echo ""
echo "[4/6] 应用 SEO 修复..."

# 修复 robots noindex 问题
find "$SITE_DIR/src" -name "layout.tsx" -o -name "layout.ts" | while read f; do
  if grep -q 'robots.*noindex' "$f" 2>/dev/null; then
    echo "  修复 $f (移除 noindex)..."
    sed -i 's/robots:.*noindex.*/robots: { index: true, follow: true },/' "$f"
  fi
  if grep -q 'robots:.*"noindex"' "$f" 2>/dev/null; then
    echo "  修复 $f (移除 noindex)..."
    sed -i 's/robots:[[:space:]]*{[[:space:]]*index:[[:space:]]*false/robots: { index: true/' "$f"
  fi
done

# 添加 robots.txt 生成
if [ ! -f "$SITE_DIR/src/app/robots.ts" ]; then
  cat > "$SITE_DIR/src/app/robots.ts" << 'ROBOTSEOF'
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://frfcxcfurniturecustommadeshowcase.com/sitemap.xml",
  };
}
ROBOTSEOF
  echo "  ✅ 创建 robots.ts"
fi

# 添加 sitemap 生成
if [ ! -f "$SITE_DIR/src/app/sitemap.ts" ]; then
  cat > "$SITE_DIR/src/app/sitemap.ts" << 'SITEMAPEOF'
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://frfcxcfurniturecustommadeshowcase.com";
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/zh`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/zh/products`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/zh/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/zh/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
SITEMAPEOF
  echo "  ✅ 创建 sitemap.ts"
fi

# 增强 metadata（修复 title 和 description）
ROOT_LAYOUT="$SITE_DIR/src/app/layout.tsx"
if [ -f "$ROOT_LAYOUT" ]; then
  # 更新 title
  if grep -q 'B2B展示\|鸿鑫' "$ROOT_LAYOUT" 2>/dev/null; then
    echo "  修复 layout.tsx 标题和描述..."
    sed -i 's/title:.*"B2B展示".*/title: { default: "FRFCX — Custom Showcase & Retail Display Manufacturer | Factory Direct", template: "%s | FRFCX" },/' "$ROOT_LAYOUT"
    sed -i 's/title:.*"鸿鑫全品类家具定制frfcxc".*/title: { default: "FRFCX — Custom Showcase & Retail Display Manufacturer | Factory Direct", template: "%s | FRFCX" },/' "$ROOT_LAYOUT"
    sed -i 's/description:.*"B2B 产品展示与询盘".*/description: "FRFCX is a China-based manufacturer specializing in custom showcases, retail display cabinets, shop fitting furniture, and store fixtures. Factory-direct pricing, CARB\/UL compliant.",/' "$ROOT_LAYOUT"
  fi
fi

# 5. 安装依赖并构建
echo ""
echo "[5/6] 安装依赖并构建..."
npm install --legacy-peer-deps 2>&1 | tail -3
npx next build 2>&1 | tail -10

# 6. 重启服务
echo ""
echo "[6/6] 重启 Next.js 服务..."
if command -v pm2 &> /dev/null && pm2 list 2>/dev/null | grep -q .; then
  pm2 restart all
  echo "  ✅ pm2 已重启"
elif systemctl is-active --quiet frfcx 2>/dev/null; then
  sudo systemctl restart frfcx
  echo "  ✅ systemd frfcx 已重启"
elif systemctl is-active --quiet nextjs 2>/dev/null; then
  sudo systemctl restart nextjs
  echo "  ✅ systemd nextjs 已重启"
else
  echo "  ⚠️  未检测到进程管理器，请手动重启："
  echo "     pm2 restart all"
  echo "     或"
  echo "     sudo systemctl restart <your-service>"
fi

echo ""
echo "========================================="
echo "  ✅ 部署完成！"
echo "========================================="
echo ""
echo "验证步骤："
echo "  1. curl -I https://frfcxcfurniturecustommadeshowcase.com"
echo "  2. curl https://frfcxcfurniturecustommadeshowcase.com/robots.txt"
echo "  3. curl https://frfcxcfurniturecustommadeshowcase.com/sitemap.xml"
echo "  4. 去 Google Search Console 提交 sitemap"
echo ""
echo "如果 robots 仍显示 noindex，检查 nginx 配置："
echo "  grep -r 'noindex' /etc/nginx/"
echo ""
