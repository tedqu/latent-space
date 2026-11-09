---
title: "DeepSeek Harness 做到一半被打断，下一步该从哪里继续？"
summary: "从 0.2.2-rc.1 的恢复与后台任务改动，看长任务真正需要记录什么，以及哪些外部动作需要业务自己核对。"
question: Q09
published: "2026-11-09"
source:
  title: "DeepSeek Harness v0.2.2-rc.1"
  author: "DeepSeek-AI"
  publisher: "DeepSeek"
  date: "2026-11-04"
  type: "版本发布"
  url: "https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.2-rc.1"
  locator: "先找 sdk-minimal 的恢复记录、后台任务等待和 Trajectory 错误原文这三项改动，再读同版本架构说明。"
  openCopy:
    label: "同版本架构说明 · Profiles and bundles"
    url: "https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.2-rc.1/docs/architecture.md"
---

## 先看运行时怎么组合

DeepSeek Harness 用 Cordis 组合模型适配、工具、会话日志和 Agent 循环。官方架构文档把一组运行配置叫作 profile，分别提供 Web、无界面运行和 SDK 等入口。其中 `sdk-minimal` 用自己的 bundle 组装完整运行环境。读变更记录时，必须留意某项行为适用于哪个 profile。[同版本架构说明](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.2-rc.1/docs/architecture.md)

## 这一版补了什么

11 月 4 日发布的 0.2.2-rc.1 有三项改动值得连起来读。`sdk-minimal` 会在模型请求或工具执行前保存恢复记录，保存失败就停止相关操作。等待后台输出时，用户插话可以立即结束等待、取回当前输出，后台任务则继续运行。Trajectory 也开始保留失败工具实际返回的文本，方便追查失败位置。它们分别处理了执行前留记录、等待中接收新意图，以及失败后查看证据的问题。[官方版本说明](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.2.2-rc.1)

## 阅读批注 · 把外部结果也接回来

设想 Agent 正在批量处理售后工单，已经向业务系统提交了退款申请，却在接收回执前断线。恢复后，它需要回答两件事——原申请到底有没有成功，这次重试会不会再次提交。可以由业务接口提供稳定的请求编号，并允许按编号查询处理结果，Agent 恢复时先查再决定下一步。

这里的工程取舍是，让 Harness 负责保存会话过程，让业务接口返回可核查的执行状态。评估一个新框架时，可以把断线点放在“服务端已完成、客户端尚未收到回执”的瞬间，检查恢复后的重复动作、状态核查耗时和人工介入次数。

产品界面也要表达清楚后台任务的状态。用户说“换一个条件重新查”时，旧查询仍可能返回结果。为任务记录输入版本，并在完成时核对它是否仍然适用，有助于避免把过期结果写回当前对话。这是由发布说明引出的业务接入建议，效果需要在目标系统里测试。

## 版本与阅读边界

本条核对的是预发布版本 `dsh-v0.2.2-rc.1`。该版本 README 标注开发者预览，并说明后续可能出现兼容性变更。本文记录官方设计与改动，文中的故障场景是待验证方案。[该版本 README](https://github.com/deepseek-ai/deepseek-harness/blob/dsh-v0.2.2-rc.1/README.md)
