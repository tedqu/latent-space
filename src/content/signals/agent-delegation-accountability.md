---
title: "Agent 代用户办事，网站怎样知道该信任谁？"
summary: "Cloudflare 对代理访问的讨论，把平台身份、用户授权和责任追踪分开。接入业务时，可以先检查一次操作能否追溯到具体用户和授权范围。"
question: Q05
published: "2026-11-09"
source:
  title: "Agents aren’t humans (but they kinda are)"
  author: "Bryan Becker"
  publisher: "Cloudflare Blog"
  date: "2026-11-05"
  type: "技术文章"
  url: "https://blog.cloudflare.com/trusted-agent-delegation/"
  locator: "重点阅读 The intermediary problem、Identities、On open source and local Agents 和 What’s next。"
---

## 一个代理，可能代表不同的人

Cloudflare 这篇文章讨论的是托管在用户设备之外的个人 Agent。当许多人通过同一代理平台访问网站时，站点看到的平台身份，未必足以区分背后的用户。作者以混合流量为例：针对其中一个人的滥用封禁整个代理，可能影响其他正常用户。[原文 · The intermediary problem](https://blog.cloudflare.com/trusted-agent-delegation/)

文中提出 Web Bot Auth 可以帮助识别 Agent 及其运营方，但多层代理之间怎样传递身份仍需完善。Cloudflare 同时宣布 Trusted Agent Delegation 联盟，推动相关问题和协议的讨论。应把它读作正在推进的协作方向；文章也明确，本地运行的 Agent 不是这次讨论的首要对象。[原文 · Identities / What’s next](https://blog.cloudflare.com/trusted-agent-delegation/)

## 阅读批注 · 从一张订单反查授权

设想一个采购助手替多名员工订购设备。接入验收可以从一张订单反向追问：哪个账号提出需求，批准的是哪个商品和金额，执行时是否仍在额度内，最后由哪个服务提交？这是一种可尝试的业务检查方法，本文没有对它做运行验证。

一个具体的测试是：员工撤销授权后，让仍在排队的订单继续尝试提交，检查业务接口是否拦截，并确认历史记录还能解释当时的决定。再用另一位员工的正常订单作对照，观察撤销或风控是否误伤了整个助手。

产品界面也可以据此呈现“这次允许做什么、如何撤回、哪里查看结果”。这些信息能帮助用户判断交给助手的工作范围。团队则需要明确谁维护授权规则、谁处理异常订单，以及什么情况下交回人工。

## 阅读边界

以上批注是从原文问题延伸的接入建议，不是 Cloudflare 已交付的完整采购方案，也不是法律责任结论。是否采用某个协议，仍要核对当前实现、接入成本和业务要求。
