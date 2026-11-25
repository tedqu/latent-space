---
title: "Agent 每运行一次，推理费 4 美分。交付一个改动要花多少？"
summary: "iFood 披露了远程编程 Agent 的运行次数和平均推理费。评估团队是否省钱，还需要把重试、人工审查和最终通过验收的改动对应起来。"
question: "Q06"
published: "2026-11-25"
source:
  title: "How iFood scales coding agents across 15,000 repositories"
  author: "OpenAI 采访 iFood 高级软件工程师 Victor Coelho"
  publisher: "OpenAI"
  date: "2026-11-24"
  type: "案例研究"
  url: "https://openai.com/business/customer-stories/ifood/"
  locator: "见 Results at a glance 的运行统计，以及 How to tell whether the agent completed the task 对任务返回值的说明。"
---

iFood 的工程团队维护着超过 1.5 万个代码仓库。团队在 OpenAI 的客户访谈中说，内部平台已完成超过 2.5 万次运行，平均每次的模型推理费用为 **0.04 美元**。这是按运行次数摊开的推理费。一次改动可能要跑好几次，有些改动即使生成了也未必值得合并。[iFood 客户访谈，Results at a glance](https://openai.com/business/customer-stories/ifood/#results-at-a-glance)

一次运行结束后，平台把会话结果整理成约定的格式，成功和失败都可以返回。平台也负责把生成的改动提交为合并请求。这样，审查者既能看到运行如何结束，也能查看平台留下的改动。访谈没有给出这些请求最终通过验收的比例，也没有披露审查时间。[运行流程](https://openai.com/business/customer-stories/ifood/#a-coding-agent-in-the-cloud-accessible-through-an-api) · [结果如何返回](https://openai.com/business/customer-stories/ifood/#how-to-tell-whether-the-agent-completed-the-task)

## 阅读批注 · 按维护工单结一次账

假设要让 Agent 帮团队把一批项目迁到新版日志库。可以先给每张工单写好验收条件，例如项目能在新版本通过测试，预发布环境仍然能收到约定的日志字段。把这张工单触发的所有运行、测试、人工审查和返工都记在同一个编号下。多次重试只算一项交付。

月底算这批工作的单位成本时，把失败或放弃的工单花掉的钱也放入分子，再除以通过验收的工单数。同表保留每张工单占用的审查时间，和复杂度相近的人工维护记录对照。如果推理费用下降，审查却在排队，这张表能帮助负责人判断下一笔投入该用于换模型、改善验收测试，还是缩小交给 Agent 的任务范围。iFood 披露的 4 美分足够填写其中一栏，其余数字要从团队自己的流程取得。
