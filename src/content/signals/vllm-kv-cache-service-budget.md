---
title: "vLLM 的 KV 缓存更大了，用户等待会更短吗？"
summary: "vLLM 0.34.0 默认采用预热后实测的显存来规划 KV 缓存。容量、吞吐与逐 token 延迟需要分开验证，尤其是在共享 GPU 和实时交互场景中。"
question: Q09
published: "2026-11-17"
source:
  title: "vLLM v0.34.0"
  author: "vLLM 维护团队"
  publisher: "vLLM"
  date: "2026-11-16"
  type: "版本发布"
  url: "https://github.com/vllm-project/vllm/releases/tag/v0.34.0"
  locator: "发布页 Before you upgrade / Extensible KV cache, on by default；补充核对 PR #56492 的 Overview、Compatibility，以及 v0.34.0 的 vllm/config/cache.py。发布日期为 GitHub UTC 日期。"
  openCopy:
    label: "v0.34.0 · 缓存配置源码"
    url: "https://github.com/vllm-project/vllm/blob/v0.34.0/vllm/config/cache.py"
---

## 版本里改变的是容量规划方式

vLLM 0.34.0 在支持的 CUDA、ROCm 配置中默认启用可扩展 KV 缓存：先预留地址空间，完成计算图捕获和预热，再依据实际剩余显存确定缓存容量。发布说明同时提醒，更大的缓存有利于高并发吞吐，但部分测试配置的逐 token 解码延迟会上升。[发布说明 · Extensible KV cache](https://github.com/vllm-project/vllm/releases/tag/v0.34.0)

该版本源码特别列出了测量范围之外的显存需求，例如稍后启动的其他进程、权重更新缓冲区，以及自行分配缓冲区的 KV connector。共享 GPU 时仍需要为这些资源明确留出空间。[缓存配置 · gpu_memory_utilization](https://github.com/vllm-project/vllm/blob/v0.34.0/vllm/config/cache.py#L216-L234)

## 阅读批注 · 先定义哪一种等待值得优化

对实时对话服务，可以把一次升级拆成三项验收：请求排队多久、多久出现第一个 token、后续输出是否持续流畅。批量摘要更关心单位时间完成多少任务；对话产品则可能对首字等待和输出停顿更敏感。缓存容量增加，尚不能直接回答用户体验有没有改善。

一种可执行的比较是固定模型、精度、输入与输出长度分布、并发和硬件，先对照已部署版本与新版本，再在新版本中切换缓存策略，避免把其他升级变化都归因于缓存。分别记录排队时间、首 token 延迟、逐 token 延迟的高分位数、完成请求数与显存不足失败数。

如果一张卡还承载其他服务，再增加“推理服务启动后，另一个进程开始申请显存”的检查。事先约定哪个服务优先、允许保留多少余量，以及哪项指标越线就回退，才能把显存利用率变成可管理的业务选择。

## 适用范围与回退

这次规划发生在启动预热阶段，不能据此假设系统会持续自动给其他进程腾挪显存。平台、显式缓存容量和 connector 配置也会影响是否启用该路径。[v0.34.0 · enable_extensible_kv_cache](https://github.com/vllm-project/vllm/blob/v0.34.0/vllm/config/cache.py#L395-L405)

发布说明提供 `--no-enable-extensible-kv-cache` 作为关闭该特性的选项；它只改变缓存策略，不会撤销版本中的其他变化。回退准备应同时保留旧镜像与实际启动配置。本文为发布说明和源码静态阅读，未运行 GPU 基准，也不推算本站场景的提速幅度。
