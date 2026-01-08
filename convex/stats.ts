import { query } from "./_generated/server";

export const getDashboardStats = query({
  handler: async (ctx) => {
    const departments = await ctx.db.query("departments").collect();
    const students = await ctx.db.query("students").collect();
    const events = await ctx.db.query("events").collect();

    return {
      totalDepartments: departments.length,
      totalStudents: students.length,
      upcomingEvents: events.filter(
        (e) => e.date > Date.now()
      ).length,
    };
  },
});
