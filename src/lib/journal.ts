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

export const insightTopics = [
  { id: "technology", label: "前沿与工程", groups: ["能力前沿", "系统与交互", "研究转化"] },
  { id: "product", label: "产品与业务", groups: ["产品与业务"] },
  { id: "business", label: "商业与组织", groups: ["商业与组织"] },
];

export async function getSignals() {
  const entries = await getCollection("signals");
  const questions = new Map((await getQuestions()).map((q) => [q.id, q]));
  return entries
    .map((entry) => {
      const question = questions.get(entry.data.question.id);
      const topic = insightTopics.find((t) => t.groups.includes(question?.group ?? ""));
      if (!topic) throw new Error(`资料 ${entry.id} 缺少对应的研究主题`);
      return { ...entry, url: `/signals/${entry.id}/`, topic };
    })
    .sort((a, b) =>
      b.data.published.localeCompare(a.data.published) ||
      b.data.source.date.localeCompare(a.data.source.date) ||
      a.id.localeCompare(b.id)
    );
}

export type Signal = Awaited<ReturnType<typeof getSignals>>[number];
