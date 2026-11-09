---
title: "AgentScope 2.0 接进业务后，谁决定工具能不能执行？"
summary: "按 Python 2.0.11 的官方资料，串起工具权限、执行环境和服务会话。用一份客服助手的退款请求，检查自主执行的边界。"
question: Q03
published: "2026-11-09"
source:
  title: "AgentScope Python v2.0.11"
  author: "AgentScope 团队"
  publisher: "AgentScope"
  date: "2026-10-27"
  type: "版本发布"
  url: "https://github.com/agentscope-ai/agentscope/releases/tag/v2.0.11"
  locator: "版本发布日期见发布页。正文机制按 2.0.11 文档中的 Permission System、Workspace 和 Agent Service 梳理。"
  openCopy:
    label: "AgentScope Python 2.0.11 · 官方文档"
    url: "https://docs.agentscope.io/en/versions/2.0.11"
---

## 一次工具调用，要经过哪些决定

AgentScope 2.0 的权限系统把工具调用交给规则、全局模式和工具自身的参数检查处理，产生允许、拒绝或请求确认三种结果。2.0.11 的决策表说明，拒绝规则优先匹配，`DONT_ASK` 模式会把需要询问的动作转成拒绝。读这个表能看清，一个无人值守任务遇到不确定操作时会怎样结束。[权限系统文档](https://docs.agentscope.io/en/versions/2.0.11/building-blocks/permission-system/overview)

工具获准执行后，Workspace 提供具体运行环境、工具资源和上下文卸载存储。选择 `LocalWorkspace` 时使用宿主文件系统，选择 Docker、E2B 等后端时使用相应隔离环境。部署时需要根据文件共享范围和工具能力选择后端。[Workspace 文档](https://docs.agentscope.io/en/versions/2.0.11/building-blocks/workspace/overview)

再往外一层，Agent Service 通过 FastAPI 承接请求，管理会话、持久化和后台任务。官方服务文档说明，资源归属按请求中的 `user_id` 检查，身份解析由接入方提供。落地时，登录身份怎样进入这个服务，是需要明确接好的一个环节。[Agent Service 文档](https://docs.agentscope.io/en/versions/2.0.11/deploy/agent-service)

## 阅读批注 · 让退款申请穿过完整流程

设想客服助手先查订单，再拟一段回复，最后申请退款。可以按动作定义业务权限——订单查询只开放给当前客户，回复草稿允许自动生成，退款申请由接口校验订单归属、金额和当前状态，再根据业务规则进入审批。这样能把每一次执行决定落到可检查的条件上。

如果审批期间退款金额被修改，原先的确认还适用于哪份申请？一种可以验证的做法，是把确认结果关联到申请编号与参数版本。真正提交时再次核对金额、收款对象和订单状态，变化后重新进入审批。框架负责把请求停下来，业务负责定义“用户到底同意了什么”。

从团队协作角度，还可以把这些规则交给业务负责人一起评审。一个新增工具要开放哪些动作、由谁确认、失败后谁处理，会直接影响助手能承担多大的工作范围。

## 版本与阅读边界

本文采用 Python 2.0.11。官网将 2.0 标为相对 1.0 的破坏性升级，迁移时需对照对应版本的 API。以上是文档阅读与接入建议，运行表现需要实测。[2.0.11 版本介绍](https://docs.agentscope.io/en/versions/2.0.11)

Java 团队另有一篇从 `ReActAgent` 与 `HarnessAgent` 讲起的官方长文，适合结合 Java 或 Spring Boot 服务阅读。[AgentScope Java 2.0 官方讲解](https://github.com/agentscope-ai/agentscope-java/blob/main/docs/v2/en/blogs/agentscope-v2-explained.md)
