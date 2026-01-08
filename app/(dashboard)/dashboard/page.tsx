"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building2, CalendarDays } from "lucide-react";

export default function DashboardPage() {
  const students = useQuery(api.students.getAll);
  const departments = useQuery(api.departments.getAll);
  const events = useQuery(api.events.getAll);

  if (!students || !departments || !events) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of student portal data
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Students"
          count={students.length}
          icon={<Users className="h-8 w-8 text-blue-600" />}
        />

        <DashboardCard
          title="Departments"
          count={departments.length}
          icon={<Building2 className="h-8 w-8 text-green-600" />}
        />

        <DashboardCard
          title="Events"
          count={events.length}
          icon={<CalendarDays className="h-8 w-8 text-purple-600" />}
        />
      </div>
    </div>
  );
}

/* Reusable Card */
function DashboardCard({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-4xl font-bold">{count}</h2>
        </div>

        <div className="rounded-full bg-muted p-4">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
