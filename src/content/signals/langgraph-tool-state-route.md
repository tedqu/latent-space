---
title: "同一个工具，换条调用路径，拿到的状态还一样吗？"
summary: "LangGraph 1.2.23 与 prebuilt 1.1.3 修复了工具通过 Send 调度时的状态差异。升级需要验收的不只是调用成功，还包括工具读到的结构、字段范围和子图状态。"
question: Q09
published: "2026-11-19"
source:
  title: "langgraph 1.2.23 / langgraph-prebuilt 1.1.3"
  author: "LangChain / LangGraph maintainers"
  publisher: "LangGraph"
  date: "2026-11-19"
  type: "版本发布"
  url: "https://github.com/langchain-ai/langgraph/releases/tag/1.2.23"
  locator: "两份 release 的 #9728；PR 的 Problem、Fix、Compatibility；prebuilt 1.1.3 tool_node.py 的 _extract_state；新增的路径对照和嵌套图状态测试。"
  openCopy:
    label: "PR #9728 · 状态传递修复与测试"
    url: "https://github.com/langchain-ai/langgraph/pull/9728"
---

## 调用成功不代表上下文一致

LangGraph 在 1.2.23 和 langgraph-prebuilt 1.1.3 中共同修复了一个差异：通过 `Send("tools", [tool_call])` 把裸工具调用列表交给 ToolNode 时，Pydantic 或 dataclass 图中的工具此前可能拿到普通字典；经普通图边到达相同工具时，拿到的则是按状态定义转换后的对象。嵌套的结构化字段也可能因此呈现不同类型。[修复说明 · Problem](https://github.com/langchain-ai/langgraph/pull/9728)

新实现为这条 Send 路径提供与普通图边一致的状态读取方式。维护者说明，TypedDict 图在这条路径下也会按工具节点的输入字段取值，而不是读取全部通道；没有托管值的常见 `create_agent` 图保持原来的状态表现。旧版 LangGraph 没有提供新的读取能力时，ToolNode 仍走旧逻辑，因此需要一起核对两个包的版本。[兼容范围与版本说明](https://github.com/langchain-ai/langgraph/pull/9728)

补丁还给其他任务清空该读取入口，避免嵌套图误用父任务的状态读取方式。新增测试分别比较 Send 与普通图边拿到的类型，以及子图工具是否拿到子图自己的状态。这些是上游代码与测试所表达的约束，本站只进行了静态阅读。[补丁与测试](https://github.com/langchain-ai/langgraph/pull/9728/files)

## 阅读批注 · 把调用路径纳入接口验收

设想一个订单查询工具依赖结构化的筛选条件。若直接调用时拿到对象，换成动态分发后变成字典，工具可能报错，也可能因为兼容代码而遗漏条件。只确认最终回答有内容，容易错过后一种情况。

可以让同一个只读工具分别经普通图边和 Send 执行，记录实际输入的类型、嵌套字段、可见字段集合和查询条件，逐项比较；再让父图与子图携带不同的订单标识，检查工具使用的是哪个。这里的订单场景是验收示例，并非本次修复已证实的业务故障。

如果工具依赖客户范围或其他必需条件，测试还应包含缺失字段时的处理，明确是否停止查询或请求补充。框架恢复了状态传递约定，并不替应用完成业务权限判断。

## 升级的适用范围

先确认应用是否使用裸工具调用列表的 Send 路径，以及实际状态定义和依赖组合，再决定回归范围。本文未运行上游测试，也未接入真实订单系统；不能据此承诺所有工具调用路径或旧版本组合都具有相同表现。
