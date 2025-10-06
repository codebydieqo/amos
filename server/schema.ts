import { timestamp, pgTable, serial, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: text("user_id").unique().notNull(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name"),
  image_url: text("image_url"),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  article_id: serial("article_id")
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),
  content: text("content"),
});

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.user_id, { onDelete: "cascade" }),
  article_id: serial("article_id")
    .notNull()
    .references(() => articles.id, { onDelete: "cascade" }),
});

// Relations
export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.user_id],
    references: [users.user_id],
  }),
  article: one(articles, {
    fields: [comments.article_id],
    references: [articles.id],
  }),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.user_id],
    references: [users.user_id],
  }),
  article: one(articles, {
    fields: [likes.article_id],
    references: [articles.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  articles: many(articles),
  comments: many(comments),
  likes: many(likes),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  user: one(users, {
    fields: [articles.user_id],
    references: [users.user_id],
  }),
  comments: many(comments),
  likes: many(likes),
}));

// Types
export type InsertComment = typeof comments.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type InsertLike = typeof likes.$inferInsert;
export type Like = typeof likes.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;
export type Article = typeof articles.$inferSelect;
