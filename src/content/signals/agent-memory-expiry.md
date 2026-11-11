---
title: "Agent 记住旧规则以后，怎样让它及时失效？"
summary: "Anthropic 的记忆实验提示，持久化的笔记也会持久化错误。接入业务时，可以把来源、有效期和冲突后的处理方式一起纳入记忆设计。"
question: Q03
published: "2026-11-11"
source:
  title: "The components of agent memory"
  author: "Lance Martin"
  publisher: "Anthropic"
  date: "2026-11-06"
  type: "技术文章"
  url: "https://www.anthropic.com/research/components-of-agent-memory"
  locator: "Memory notes；Dreaming can correct memory；Dreaming can promote notes up the memory hierarchy；Thinking backward, looking forward。"
---

## 记下来的规则，也需要复核

Anthropic 在这里把记忆定义为跨会话保存、以后可以读取的上下文。文章展示了用原始会话记录复核笔记的做法，并提醒：错误或过时的笔记可能在后续会话中反复被信任；持续检查记忆又需要计算成本。[原文 · Memory notes / Dreaming can correct memory / Thinking backward, looking forward](https://www.anthropic.com/research/components-of-agent-memory)

## 阅读批注 · 用一次规则变更检查记忆

设想客服助手曾记住“这类订单可以退款”，随后业务调整了规则。可以构造一次跨会话检查：保留旧笔记，更新知识库，再询问同类订单，观察回答是否仍沿用旧结论。

需要核对的对象包括笔记引用的制度版本、适用商品或租户、生效时间，以及当前查询返回的依据。遇到冲突时，应能回到有效来源重新判断；涉及真实退款，还要由业务接口检查当前条件，不能只凭助手的记忆执行。

还可以分别测量错误规则被再次采用的次数、人工复核量，以及维护记忆所需的调用成本。这能帮助团队决定哪些内容值得长期保存，哪些内容应该在使用时重新查询。产品上若允许用户纠正记忆，也要检查纠正后是否仍有旧副本参与回答。

## 阅读边界

原文是厂商报告的任务实验，不能据此保证任意业务里的记忆都可靠。上述规则变更检查是阅读延伸，本站没有运行该实验，也不把后台整理笔记当作授权或版本管理的替代品。
