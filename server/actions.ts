"use server";

import { cache } from "react";
import { db } from "./db";
import { Article, articles } from "./schema";
import { eq } from "drizzle-orm";

export const getArticles = cache(async (): Promise<Article[]> => {
  const data = await db.query.articles.findMany({
    orderBy: (articles, { desc }) => [desc(articles.created_at)],
  });

  return data;
});

// export const getArticle = cache(async (id: string): Promise<Article> => {
//   const data = await db.select().from(articles).where(eq(articles.id), id)
// })