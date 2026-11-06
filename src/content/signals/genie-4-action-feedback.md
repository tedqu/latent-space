---
title: "Genie 4 下跳棋时，谁在判断这一步走对了？"
summary: "一次落子涉及三个问题。谁提议下一步，谁生成动作后的画面，又由谁检查棋局？三者决定了这个世界模型可以拿来测什么。"
question: Q02
published: "2026-11-06"
source:
  title: "Genie 4: A new generation of world simulation"
  author: "Google DeepMind"
  publisher: "Google DeepMind"
  date: "2026-10-27"
  type: "研究团队发布"
  url: "https://deepmind.google/blog/genie-4-a-new-generation-of-world-simulation/"
  locator: "可以先看 Apollo 机器人下跳棋的模拟演示，再读文末的 Understanding current limitations。"
---

## 顺着一次落子看模型分工

Google DeepMind 展示了一段 Apollo 人形机器人下跳棋的模拟。Gemini 4 Argon 把指令拆成步骤，步骤以文字说明穿插传给 Genie 4，后者据此生成接下来的画面。原文还描述了 Gemini 3.8 Flash 如何充当引导模型。它可以观察新生成的帧，检查进展，再决定下一步。读这两个例子时，要留意用的是哪一个模型。

要判断这种模拟能否用来练习决策，可以先问，上一步落子对下一步还有约束力吗？一枚棋子被吃掉后，它的位置和棋盘上剩余的棋子，都应在镜头转开再转回来时保持一致。团队也列出当前局限，包括场景运行较久或反复编辑后，物体和空间细节可能发生漂移。

## 阅读批注 · 给世界模型配一个裁判

可以给同一盘残局准备一份独立棋谱，让规则程序记录每步后的合法棋盘，再与生成画面逐步核对。特别值得记下的是**第一次分歧发生在哪一步，以及引导模型有没有察觉**。如果这项检查能稳定通过，再讨论它是否适合给决策模型当练习环境。原文中的机器人演示发生在模拟里，真实机械臂的抓取误差还需要另一组测试。
