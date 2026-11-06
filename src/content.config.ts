import { defineCollection } from "astro:content";
import { file } from "astro/loaders";
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

export const collections = { questions };
