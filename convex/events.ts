import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// READ - Get all events
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

// CREATE
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.number(), // timestamp
    location: v.string(),
    departmentId: v.optional(v.id("departments")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// UPDATE
export const update = mutation({
  args: {
    id: v.id("events"),
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
    departmentId: v.optional(v.id("departments")),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

// DELETE
export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
