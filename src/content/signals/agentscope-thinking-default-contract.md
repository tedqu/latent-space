---
title: "AgentScope 2.0.12：没设置思考参数，等于关闭思考吗？"
summary: "新版本把思考控制区分为默认、开启、关闭。通过请求参数和测试代码，检查界面选择、保存配置与模型实际收到的指令是否一致。"
question: Q09
published: "2026-11-17"
source:
  title: "AgentScope Python v2.0.12"
  author: "AgentScope 维护团队"
  publisher: "AgentScope"
  date: "2026-11-16"
  type: "版本发布"
  url: "https://github.com/agentscope-ai/agentscope/releases/tag/v2.0.12"
  locator: "发布说明中的 tri-state thinking controls；PR #3557；v2.0.12 src/agentscope/model/_openai_chat/_model.py 的 Parameters 与 _call_api；tests/model_openai_chat_test.py 的 test_thinking_enable_nullable。"
  openCopy:
    label: "PR #3557 · 三态控制变更"
    url: "https://github.com/agentscope-ai/agentscope/pull/3557"
---

## 一个开关需要表达三种意图

AgentScope Python 2.0.12 收录了三态思考控制：`thinking_enable` 可以为 `None`、`True` 或 `False`，界面提供 Default、On、Off。关联变更把“沿用默认”与“明确要求关闭”分别保存。[版本发布](https://github.com/agentscope-ai/agentscope/releases/tag/v2.0.12)、[PR #3557](https://github.com/agentscope-ai/agentscope/pull/3557)

以该版本的 OpenAI Chat 适配器为例：显式 `False` 会将请求中的 `reasoning_effort` 设为 `none`；其他情况下，有明确 effort 就转发，没有则不添加该参数。因此，`True` 本身也不保证发送某个固定的思考强度。[版本源码 · Parameters / _call_api](https://github.com/agentscope-ai/agentscope/blob/v2.0.12/src/agentscope/model/_openai_chat/_model.py#L277-L280)

对应测试组合了未传、空值、关闭、开启，以及不同 effort 值，并检查发给模拟客户端的参数。这证明测试关注的是请求构造契约；真实模型如何接受和执行参数仍需单独核对。[test_thinking_enable_nullable](https://github.com/agentscope-ai/agentscope/blob/v2.0.12/tests/model_openai_chat_test.py#L198-L226)

## 阅读批注 · 从界面选择追到实际请求

设想一个助手同时处理短回复和复杂分析。产品希望短回复控制等待时间，复杂分析允许更高的推理预算。如果保存配置时把空值统一转成 `false`，或模型切换后保留了不可见的旧参数，用户选择的策略就可能在传输中改变。

可以建立一张小型验收表：每个模型分别覆盖“未设置”“明确关闭”“设置指定强度”，记录界面值、持久化配置、最终请求字段和服务端响应；再重复保存、重新打开和切换模型。重点检查显式关闭是否被覆盖、旧配置是否仍影响请求、不支持的组合是否给出可见错误。

参数传对以后，再用同一组业务任务比较完成质量、首字等待和实际计费用量。这样才能决定哪些任务值得增加推理预算，而不是把界面的“开启”直接解释成更高质量，或把“关闭”直接解释成更便宜。

## 版本与验证边界

本文的请求映射仅针对 AgentScope Python 2.0.12 的上述适配器；其他厂商和模型未必接受同一组参数。这里阅读了固定版本源码和模拟测试，未执行这些测试、调用真实模型或测量成本。
