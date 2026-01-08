import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// READ - Get all departments
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("departments").collect();
  },
});

// READ - Get single department
export const getById = query({
  args: { id: v.id("departments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// CREATE
export const create = mutation({
  args: {
    name: v.string(),
    code: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("departments", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// UPDATE
export const update = mutation({
  args: {
    id: v.id("departments"),
    name: v.string(),
    code: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

// DELETE
export const remove = mutation({
  args: { id: v.id("departments") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
