---
title: "模型安全分数提高了，还是评分器变宽松了？"
summary: "Anthropic 提醒，评分模型也可能随版本变化而漂移。评估一次模型升级时，可以把被测模型变化与评分器变化分开检查。"
question: Q01
published: "2026-11-15"
source:
  title: "Building strong safety evaluations"
  author: "Ruth Appel 等"
  publisher: "Anthropic"
  date: "2026-11-13"
  type: "技术文章"
  url: "https://www.anthropic.com/research/building-strong-safety-evaluations"
  locator: "Run → Keep measures internally valid：评分器漂移、重新评分与人工盲标；Report → Document everything：版本、提示词与配置的可比性。"
---

## 评分器也需要被检查

Anthropic 的评测方法文章提醒：LLM 评分器可能在底层模型更新后改变松紧尺度，故障时也可能继续输出分数。作者建议用另一评分模型或调整后的规则重评样本，并将评分结果与人工盲标比较；若人工之间也存在明显分歧，先澄清判定标准。[原文 · Run / Keep measures internally valid](https://www.anthropic.com/research/building-strong-safety-evaluations)

## 阅读批注 · 把两种升级拆开

设想客服 Agent 升级模型后，离线通过率上升。一次可执行的核查是：保存旧、新模型对同一批任务的完整输出，再分别交给固定版本的旧、新评分器，得到四组结果。输入资料、工具权限与采样设置也要保留，才能知道具体改变了什么。

如果两版输出在新评分器下都涨分，就需要排查评分尺度变化；如果新模型在两套评分器下都有改善，再抽查差异样本，确认业务行为确实改变。这些现象提供排查方向，不能单独证明因果。

业务验收可以把“越权执行”和“本应处理却拒绝”分开看，并保留双方判断相反的样本供复核。上线门槛还应说明哪些错误足以阻止发布，避免一个平均分掩盖少量高代价错误。

## 适用边界

原文讨论安全评测方法，并非对某个客服系统的验证。上述交叉评分是阅读延伸，本站未运行该实验。即使离线分数稳定，也仍需在目标产品的实际工具和交互条件下核查。
