# Latent Space

**Ted Qu 的个人研究与思考站：AI、产品、业务、商业与组织。**

围绕长期研究的问题，积累有来源的观察、经本人确认的判断、验证记录和观点修订。

## 站点信息

| 项目 | 信息 |
| --- | --- |
| 站点名称 | Latent Space |
| 作者 | Ted Qu |
| 正式域名 | [tedqu.cc](https://tedqu.cc) |
| GitHub | [@tedqu](https://github.com/tedqu) |
| 代码仓库 | [tedqu/latent-space](https://github.com/tedqu/latent-space) |
| 教育背景 | PolyU · 香港理工大学校友 |
| 内容语言 | 简体中文为主 |

**当前进度**　研究索引收录十个长期问题。「观察」刊载带原文链接和阅读批注的资料，并关联到相应研究问题。

## 本地预览

使用 Node.js 22.22 或更高版本，在项目目录执行以下命令。

```sh
npm ci
npm run dev
```

浏览器打开 [本地首页](http://127.0.0.1:4321/)。端口占用时以终端显示的 Local 地址为准。`npm run build` 生成静态文件到 `dist/`。

## 内容规划

- **Perspectives / 观点**：经本人确认的判断、论证、适用条件与反例。
- **Research / 研究**：长期问题、证据比较、未知项与判断变化。
- **Signals / 观察**：有价值的新信息、来源及与研究问题的关联。
- **Lab / 实验**：有明确验证状态的方法、结果与代码。
- **About / 关于**：背景、PolyU、研究兴趣与联系入口。

## 内容原则

- 定时检查来源，有价值才发布，以研究问题组织积累。
- 区分外部事实、来源观点、AI 假设与本人确认的判断。
- 用可追溯的材料和实际验证支撑观点，保留反例和修订。
- 私人候选和未确认观点保存在公开仓库之外。

## 仓库文件

- `site.config.json` 管理站点信息与栏目导航。
- `src/pages/` 和 `src/layouts/` 管理页面与共享版式。
- `src/data/questions.json` 保存研究问题，供首页、搜索、筛选与问题详情复用。
- `src/content/signals/` 保存公开的资料观察。来源日期与本站收录日期分别记录，问题、首页、归档和搜索均从同一条目取数。
- `.gitignore`：排除本地凭据、依赖、构建产物和缓存。

## 发布

Cloudflare Workers 托管 Astro 的静态输出。构建使用 `npm run build`，部署使用 `npx wrangler deploy`。`wrangler.jsonc` 声明站点资源目录、404 处理和主域名。
