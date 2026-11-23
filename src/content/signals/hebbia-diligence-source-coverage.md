---
title: "每条引用都切题，尽调报告还可能漏掉什么？"
summary: "Hebbia 同时检查金融研究助手引对了哪些段落、有没有找齐回答问题所需的资料类型。这两项指标能发现不同的错误。"
question: "Q05"
published: "2026-11-23"
source:
  title: "Hebbia sees improvements in financial research with GPT‑6 Astra"
  author: "OpenAI（采访 Hebbia 团队）"
  publisher: "OpenAI"
  date: "2026-11-20"
  type: "案例研究"
  url: "https://openai.com/business/customer-stories/hebbia/"
  locator: "From source documents to presentations 一节中关于测试口径、领域专家和幻灯片脚注的段落。"
---

## 引对了什么，还漏了什么

据 OpenAI 发布的客户案例，Hebbia 在 2026 年 8 至 9 月测试了预发布版 GPT‑6 Astra。参与比较的模型回答同一批金融研究问题，使用相同评分标准。领域专家对照原始文件编写或审核这些标准。[Hebbia 客户案例，测试方法](https://openai.com/business/customer-stories/hebbia/)

在 Hebbia 的测试里，GPT‑6 Astra 引用的摘录中，99.5% 与问题相关。这个分母只包含已经引出的段落。Hebbia 还检查回答是否引用了题目要求的资料类型，在这项指标上，它领先所测的最佳替代模型 13.6 个百分点。案例没有给出题目和摘录的总数。读者可以从生成的幻灯片脚注回到原始材料，核查某个数字来自哪张表、对应哪个报告期。[原文「From source documents to presentations」](https://openai.com/business/customer-stories/hebbia/)

## 阅读批注 · 给评测加一份会改变结论的文件

假设收购方要查一份客户合同的到期日。主合同写明十二月到期，补充协议把日期提前到九月。只引用主合同的回答，给出的每条引文都可能与问题相关，投委会读到的到期日却比实际晚了三个月。

可以用同一问题做两轮验收。第一轮只放主合同，第二轮加入补充协议。事先写明每轮应查的文件、有效日期和结论，再看助手是否找到了补充协议、是否修改答案、脚注是否指向生效条款。把这三项分别计数，才能区分检索遗漏、读错条款和引用错位。

如果采购目标是节省分析师时间，还要记录查漏、改稿和再次签核花了多久。Hebbia 披露的是模型评测，节省了多少复核工时，仍需从实际交付记录里取得证据。
