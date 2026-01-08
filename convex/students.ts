import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// READ - Get all students with department info
export const getAll = query({
  handler: async (ctx) => {
    const students = await ctx.db.query("students").collect();

    return Promise.all(
      students.map(async (student) => {
        const department = await ctx.db.get(student.departmentId);
        return {
          ...student,
          department,
        };
      })
    );
  },
});

// READ - Get students by department
export const getByDepartment = query({
  args: { departmentId: v.id("departments") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("students")
      .withIndex("by_department", (q) =>
        q.eq("departmentId", args.departmentId)
      )
      .collect();
  },
});

// CREATE
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    departmentId: v.id("departments"),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("graduated")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("students", {
      ...args,
      enrollmentDate: Date.now(),
    });
  },
});
// UPDATE
export const update = mutation({
  args: {
    id: v.id("students"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    departmentId: v.id("departments"),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("graduated")
    ),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

// DELETE
export const remove = mutation({
  args: { id: v.id("students") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

