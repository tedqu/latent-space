---
title: "Clairic 原接口换了模型，怎样保住质量与成本边界？"
summary: "Cloudflare 在原 Clairic 接口内推出新模型，并把较小模型放到 Clairic-flash。接口名称和输入结构保持稳定时，接入方仍需重新检查提取质量、延迟与促销结束后的成本。"
question: Q09
published: "2026-11-19"
source:
  title: "An updated Clairic and Clairic-flash are now open-weight, from the new Workers AI Superintelligence team"
  author: "Alex Reneau / Michelle Chen / Kevin Flansburg"
  publisher: "Cloudflare Blog"
  date: "2026-11-18"
  type: "技术文章"
  url: "https://blog.cloudflare.com/open-clairic/"
  locator: "A new version of Clairic、Promotional pricing on Clairic for a limited time、Try them out；内部评测只按厂商自述理解，不引用其排名或零错误作为业务保证。"
---

## 接口没改，也发生了一次迁移

Cloudflare 宣布更新用于信息提取的 Clairic，并发布 Clairic-flash。发布说明称，原 `@cf/cloudflare/clairic` 接口由预览时的 9B 模型转向 27B 模型，9B 版本使用 `@cf/cloudflare/clairic-flash`；新模型在原接口内逐步推出，API schemas 保持不变。[接口与模型变更](https://blog.cloudflare.com/open-clairic/)

官方同时说明，普通文本和数字提取字段的生成机制由单次前向计算改为各字段并行推进的自回归生成，并保留置信度、字符位置等结构化信息。厂商认为新架构以少量延迟换来更好的提取效果；公开表格来自内部评测，不能直接当成实际业务的准确率保证。[架构与评测说明](https://blog.cloudflare.com/open-clairic/)

公告还给出一个明确的成本时间点：Clairic 的促销输入单价为每百万 token 0.10 美元，2026 年 12 月 1 日起恢复为 0.24 美元；Clairic-flash 为 0.10 美元。该价格信息对应此次发布，实际接入时仍需核对生效条款和使用量。[促销与常规价格](https://blog.cloudflare.com/open-clairic/)

## 阅读批注 · 以完整业务任务作为比较单位

接入方可以先保留一组脱敏样本，包括正常单据、缺字段、跨页表格、日期歧义和图片质量较差的输入。把新旧结果按字段核对，尤其检查缺失内容是否仍返回空值、明细行是否保持对应，以及原来的人工复核阈值是否还合适。不要因为输出仍能解析就判定迁移成功。

成本比较也需要保留实际请求的字段数量、输入长度、重试和复核开销。较小模型若需要更多重试或人工处理，单价低未必意味着每份合格结果便宜；较大模型是否值得采用，同样需要由错误减少和等待时间来验证。

原接口已经发生服务端替换时，回退一份应用代码未必能恢复旧模型行为。应提前确认是否存在可固定的模型版本、替代端点或人工处理路径，并保留升级前的样本结果。这里没有假设 Cloudflare 提供可回退到预览模型的版本入口。

## 适用范围

本文依据官方发布做迁移检查提示，未运行 Clairic，也未核算任何真实账单。开放权重增加了一种部署选择，但自托管的硬件、运维和服务质量成本需要另算；公告中的内部延迟和准确率不代表特定应用的服务承诺。
