import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // =========================
  // USERS TABLE
  // =========================
  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("student")
    ),
  }).index("by_email", ["email"]),

  // =========================
  // DEPARTMENTS TABLE
  // =========================
  departments: defineTable({
    name: v.string(),
    code: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }),

  // =========================
  // STUDENTS TABLE
  // =========================
  students: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    departmentId: v.id("departments"),
    enrollmentDate: v.number(),
    status: v.union(
      v.literal("active"),
      v.literal("inactive"),
      v.literal("graduated")
    ),
  }).index("by_department", ["departmentId"]),

  // =========================
  // EVENTS TABLE
  // =========================
  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.number(),
    location: v.string(),
    departmentId: v.optional(v.id("departments")),
    createdAt: v.number(),
  }),
});
