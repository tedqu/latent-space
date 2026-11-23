---
title: "修复已经上线，谁来确认用户遇到的故障消失了？"
summary: "OpenAI 的 Performance Factory 让独立的 Codex 会话质疑初步诊断，由工程师决定是否合并修复。一次图片下载故障说明，服务指标恢复和用户请求恢复可能发生在不同时间。"
question: "Q08"
published: "2026-11-23"
source:
  title: "How OpenAI’s Performance Factory keeps ChatGPT fast"
  author: "Okay Zed、Cyrus Forbes"
  publisher: "OpenAI"
  date: "2026-11-19"
  type: "技术文章"
  url: "https://openai.com/index/how-openai-performance-factory-keeps-chatgpt-fast/"
  locator: "Adversarial review strengthens the diagnosis 中的图片下载案例，以及 Fixing the regression is the hard part 末尾的上线后复核规则。"
---

## 一个被重新打开的调查

ChatGPT 的部分会话因为图片下载出错而失败。调查代理查到下载错误后，标记为已找到原因。另一个独立的 Codex 会话核对时间线，发现负责定位文件的内部服务已经恢复，图片请求却仍在失败。复核代理因此重开调查，并记录原解释还说不通的地方。[OpenAI 工程原文，Adversarial review strengthens the diagnosis](https://openai.com/index/how-openai-performance-factory-keeps-chatgpt-fast/)

这套流程把合并权交给工程师。工程师部署修复后，代理再把实际表现同故障前的基线比较。完全恢复就结案，部分恢复就关闭原工单、为残余问题新建工单，毫无改善则返回调查。这样一来，即使处理流程运转正常，原工单关闭时仍可能有用户受到影响。[原文，Fixing the regression is the hard part](https://openai.com/index/how-openai-performance-factory-keeps-chatgpt-fast/)

## 阅读批注 · 谁来接剩下的失败请求

如果把这个做法用在带图片的客服助手里，结案时值得问一句：最初报错的那类用户，现在发一张图，能顺利拿到回复吗？纯文字请求很多时，整体成功率很容易把图片问题冲淡。可以单独圈出图片请求，用相近流量时段的成功率和等待时间作基线，再核对修复上线后这一组的表现。

允许拆出新工单时，还可以把剩余失败的请求类型、样例、负责人和下次复查时间随单移交。团队复盘时按同一次用户故障统计从告警到恢复的时长。这样即使调查被拆成三张工单，同一批受影响的用户也只对应一条恢复时间线。

以上是从案例引出的验收办法。原文披露了 OpenAI 的内部分工，其他团队需要根据自己的流量、指标噪声和发布权限设定恢复条件。
