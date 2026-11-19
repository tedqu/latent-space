---
title: "Genie 4 开放体验后，谁来决定世界里的下一步？"
summary: "Project Genie 开始向符合条件的订阅用户开放 Genie 4，支持探索中修改世界，并可引入 Gemini 提议或触发事件。产品验收需要区分用户操作、模型建议与自动发生的变化。"
question: Q02
published: "2026-11-19"
source:
  title: "Genie 4 is now available"
  author: "Diego Rivas / Pavan Kumar"
  publisher: "Google DeepMind / Google Labs"
  date: "2026-11-18"
  type: "产品发布"
  url: "https://deepmind.google/blog/genie-4-is-now-available/"
  locator: "Google 官方正文的 Experience Genie 4 in Project Genie、Create new interactive experiences、Learn how we are building responsibly、Try Project Genie today；不采用页面内 AI-generated summary。"
  openCopy:
    label: "Google · Project Genie 更新原文"
    url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/"
---

## 从演示走向可交互的产品

Google 宣布向符合条件的 Google AI Ultra 订阅用户推出新版 Project Genie，包含 Genie 4 和社区作品画廊；AI Pro 用户可加入候补名单。这次公告的新增点是产品开放与交互入口，不能理解为所有用户都已获得访问权限。[开放范围](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/)

官方介绍，用户能在探索过程中用提示词改变天气、加入角色或调整事件，Genie 4 同时生成随场景变化的音频。Project Genie agent 可以编排多模态模型来创建世界；会话中引入的 Gemini 则可观察屏幕、提供下一步建议，或自动触发世界内事件。[交互与创作功能](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/)

这些是官方公布的产品能力。团队仍把镜头延迟、复杂物理交互、实时音频精度和长期场景保持列为正在解决的问题，开放体验不等于这些问题已经解决。[当前研究边界](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/genie-4-now-available-project-genie/)

## 阅读批注 · 给每次变化留下可辨认的原因

设想用户正在探索一座虚拟建筑，输入“停在门口”，与此同时辅助模型提出进入房间，场景里又自动出现一个角色。需要验收的首先是控制关系：哪些变化来自用户明确操作，哪些只是建议，哪些由系统自动触发？后来的指令能否取消仍在等待执行的旧动作？

可以为交互事件记录来源、提出时间、允许生效的场景状态和实际生效时间。回放一次探索时，检查用户改变方向后，旧建议是否仍触发事件；暂停或切换场景后，音频与画面是否还在响应上一条指令。这是针对交互产品的测试建议，并非公告已经提供的日志、取消或回放功能。

产品定位也会改变验收标准。自由探索可以容纳意外变化；如果用来练习操作流程，就需要固定任务规则、记录偏离，并能解释为什么失败。可生成、可分享的世界与可靠的训练环境，仍需分别验证。

## 这次更新没有回答什么

本站此前关注的是[世界模型演示中由谁判断动作正确](https://tedqu.cc/signals/genie-4-action-feedback/)。这次关注的是用户、创作 Agent 与世界模型同时参与时的控制关系。本文未登录体验，也没有测量响应时间、物理准确性或真实训练收益；不把社区作品展示当作这些能力的证明。
