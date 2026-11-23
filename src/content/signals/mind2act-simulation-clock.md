---
title: "机器人要在 2.6 秒内按键，模型思考的时间算进去了吗？"
summary: "Mind2Act World 的限时任务按仿真时间评分，模型推理时场景暂停。把同一个按钮测试放进持续走时的环境，才会暴露动作正确却送达太晚的问题。"
question: "Q10"
published: "2026-11-23"
source:
  title: "Mind2Act World: A Diagnostic Benchmark for Embodied Mind, Physical Action, and Mind-Action Composition in Robotic Manipulation"
  author: "Yuzhi Huang 等"
  publisher: "arXiv"
  date: "2026-11-19"
  type: "预印本"
  url: "https://arxiv.org/abs/2611.26444"
  locator: "v1，§4.2 Episode Protocol and Timing、§7.1 Limitations、附录 F.2 的 DR2 Light-cued response 任务卡。"
  openCopy:
    label: "作者论文全文 · HTML v1"
    url: "https://arxiv.org/html/2611.26444v1"
---

## 先看秒表在哪些时候走动

Mind2Act World 有一道按灯操作的任务。困难档每轮亮起一个按钮，机器人要在 2.6 秒内按下亮灯的按钮，随后在 1 秒内松手。十轮信号都得正确完成，中途不能按到未亮的按钮。[论文附录 F.2，DR2 任务卡](https://arxiv.org/html/2611.26444v1#A6.SS2)

决定如何解释成绩的是计时协议。作者在模型推理期间暂停物理仿真，用仿真时钟判断是否错过任务期限，另用现实经过的时间记录推理耗时和总耗时。于是模型即使想了几秒，回到模拟场景时，亮灯后的按键窗口依然还在。这能考察系统看清信号后会不会完成动作。要判断同样的系统能否跟上实体设备，还需要让信号在推理期间继续变化。[论文 §4.2](https://arxiv.org/html/2611.26444v1#S4.SS2)、[作者列出的限制 §7.1](https://arxiv.org/html/2611.26444v1#S7.SS1)

## 阅读批注 · 把同一串灯闪两遍

从仿真走向设备试点前，可以在模拟器里固定十次亮灯的顺序和间隔。第一遍沿用论文的暂停规则，第二遍让场景按现实时间继续走。两遍使用同一模型、相同初始状态和动作接口。为每次亮灯记录观察采集、模型返回和按键生效三个时刻，同时保存动作针对的是哪次信号。

复盘时把“依然是这盏灯，但按晚了”“指令送达时已经换灯”“及时按下了错误的按钮”分开。第一种值得查排队和执行延迟，第二种值得检查系统会不会丢弃过期动作，第三种才直接指向识别或决策。一个总成功率很难告诉产品负责人下一笔工程投入该花在哪里。

这是根据预印本提出的对照测试。论文给出了暂停时钟下的结果，持续走时的对照与实体设备上的表现还需另行测量。
