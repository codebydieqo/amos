"use server";

import { cache } from "react";
import { db } from "./db";
import { Article } from "./schema";

export const getPosts = cache(async (): Promise<Article[]> => {
  const data = await db.query.articles.findMany();

  return data;
});
