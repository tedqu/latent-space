---
title: "预测更准以后，谁把它变成一次补货决策？"
summary: "McKinsey 的需求计划案例把模型预测、业务审批和系统执行连在一起。评估 AI 的价值，可以沿着一次补货决定，检查信息是否及时改变了行动。"
question: Q06
published: "2026-11-16"
source:
  title: "Reinventing business planning with agentic AI"
  author: "Holger Hürtgen、Julian Fischer 等"
  publisher: "McKinsey QuantumBlack"
  date: "2026-11-10"
  type: "案例研究"
  url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/reinventing-business-planning-with-agentic-ai"
  locator: "Building a forecast worth trusting：轮胎企业的预测粒度与提前期；From better forecasts to a different planning process：建议、审批与执行；What changes for the planner：目标状态的限定。"
---

## 预测要赶得上业务做决定的时刻

McKinsey 在一项未具名轮胎企业案例中报告：团队把预测细化到物料和工厂，预测跨度对齐实际供货提前期，并增加 Agent 层解释预测变化。文章将「AI 提建议、人批准」与限定条件内自主执行分开，也明确完整的 Agent 化销售与运营计划仍处于早期。[原文 · Building a forecast worth trusting / From better forecasts to a different planning process](https://www.mckinsey.com/capabilities/quantumblack/our-insights/reinventing-business-planning-with-agentic-ai)

## 阅读批注 · 沿着一张补货单找瓶颈

设想一个生鲜商品的需求预测降低了，但采购订单已经过了调整截止时间。即使预测本身更准，这一轮也可能来不及减少损耗。接入 AI 时，可以先把预测生成、建议送达、审批完成和订单提交四个时间记在同一条记录里，检查究竟哪一步阻止了信息变成行动。

下一步要明确业务希望改善什么：是在相同供货水平下降低库存，还是在相同库存投入下减少缺货？两种目标可能导向不同的补货参数，不能交给「预测准确率提升」这个指标代替选择。

可以挑选供货周期和需求波动相近的商品做小范围验证，同时跟踪库存占用、缺货、损耗以及人工修改建议的原因。遇到促销、价格变化或供应延迟，应单独标记，避免把这些影响一起归给模型。若建议经审批后写入业务系统，还要核对实际提交的是否为获批版本，以及提交时库存、交期是否已改变。

这组检查能帮助区分三类问题：模型没有预测对、建议到达太晚、建议被采用后没有达到业务目标。对应的改进分别可能是调整模型、缩短审批与传递时间，或重新检查业务决策规则；具体效果仍需试点记录验证。

## 阅读边界

来源是咨询机构对客户实践的描述，客户未具名，本站没有独立核验其收益。原文中的完整 Agent 化目标也不能当成已经普遍实现的结果。上述补货场景与验证办法是阅读延伸，不代表 Ted 的实际项目或经验。
