import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const questions = defineCollection({
  loader: file("src/data/questions.json"),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    group: z.string(),
    topic: z.string(),
    lenses: z.array(z.enum(["技术", "产品", "业务", "商业", "组织"])),
    prompt: z.string(),
    evidence: z.array(z.string()),
  }),
});

const signals = defineCollection({
  loader: glob({ base: "./src/content/signals", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    question: reference("questions"),
    published: z.iso.date(),
    source: z.object({
      title: z.string(),
      author: z.string(),
      publisher: z.string(),
      date: z.iso.date(),
      type: z.enum(["研究团队发布", "期刊论文", "版本发布", "技术文章", "预印本", "研究报告", "观点文章", "案例研究"]),
      url: z.url({ protocol: /^https$/ }),
      locator: z.string(),
      openCopy: z.object({
        label: z.string(),
        url: z.url({ protocol: /^https$/ }),
      }).optional(),
    }),
  }),
});

export const collections = { questions, signals };
