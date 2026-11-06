import { getCollection } from "astro:content";

export async function getQuestions() {
  const entries = await getCollection("questions");
  return entries
    .map(({ id, data }) => ({
      ...data,
      id,
      url: "/research/" + data.slug + "/",
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export type Question = Awaited<ReturnType<typeof getQuestions>>[number];

export const sections = {
  perspectives: {
    title: "观点",
    english: "Perspectives",
    intro: "技术、产品与组织决策中的判断、理由与适用条件。",
    empty: "观点归档",
    unit: "篇观点",
    related: ["Q07", "Q08"],
  },
  signals: {
    title: "观察",
    english: "Signals",
    intro: "沿着论文、产品变化和一手资料，追踪研究问题的新线索。",
    empty: "观察归档",
    unit: "条观察",
    related: ["Q01", "Q02"],
  },
  lab: {
    title: "实验",
    english: "Lab",
    intro: "用有明确条件的实验，检验一个具体假设。",
    empty: "实验记录",
    unit: "项实验",
    related: ["Q03", "Q04"],
  },
};
