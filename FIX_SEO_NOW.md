# 🚨 紧急：修复网站 SEO — robots: noindex 问题

## 当前问题

你的网站 `frfcxcfurniturecustommadeshowcase.com` 目前每条页面都有：
```html
<meta name="robots" content="noindex"/>
```

这条标签**告诉 Google 不要收录你的网站**。无论你做多少 SEO 优化，有这个标签在，Google 永远不会收录。

---

## 解决方法（3选1）

### 方法 A：SSH 到服务器运行一键脚本（推荐）

```bash
# 1. SSH 到服务器
ssh root@47.83.234.186

# 2. 下载并运行修复脚本
curl -fsSL https://raw.githubusercontent.com/frfcxc/video-automation/master/deploy-seo.sh | bash
```

### 方法 B：手动修复（如果知道网站目录）

```bash
# SSH 到服务器后：
cd /你的网站目录

# 1. 找到所有 layout 文件
grep -r "noindex" src/ --include="*.tsx" --include="*.ts"

# 2. 编辑那个文件，把
#    robots: { index: false }
#    或
#    robots: "noindex"
#    改成
#    robots: { index: true, follow: true }

# 3. 重新构建
npm run build

# 4. 重启
pm2 restart all
```

### 方法 C：在 nginx 层面修复（临时方案）

如果找不到源代码，可以先在 nginx 配置中去掉 noindex：

```bash
# 编辑 nginx 配置
sudo nano /etc/nginx/sites-enabled/default

# 添加这个来移除 noindex（在 server block 里）：
# sub_filter 'noindex' 'index, follow';
# sub_filter_once off;

# 重启 nginx
sudo nginx -s reload
```

---

## GitHub 仓库已有 SEO 优化代码

你的 GitHub 仓库 `frfcxc/video-automation` 的 master 分支已经有完整的 SEO 优化：
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ 完整 meta 标签 (title/description/keywords/OG/Twitter)
- ✅ JSON-LD 结构化数据
- ✅ 中英双语页面
- ✅ 动态 OG 图片生成

**只需要在服务器上 `git pull` + `npm run build` + 重启即可。**

---

## 修复后验证

```bash
# 检查 robots.txt
curl https://frfcxcfurniturecustommadeshowcase.com/robots.txt

# 检查页面 head
curl -sL https://frfcxcfurniturecustommadeshowcase.com | grep -i robots

# 应该看到：
# <meta name="robots" content="index, follow"/>

# 去 Google Search Console 提交 sitemap:
# https://search.google.com/search-console
```

---

## 如果完全不知道服务器信息

提供以下信息我可以继续帮你：
1. 服务器购买渠道（阿里云？腾讯云？）
2. 是否有服务器管理面板（宝塔？1Panel？）
3. 谁帮你部署的网站？联系那个人
