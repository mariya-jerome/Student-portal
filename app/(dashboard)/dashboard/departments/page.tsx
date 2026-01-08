"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DepartmentForm from "@/components/departments/DepartmentForm";
import DepartmentTable from "@/components/departments/DepartmentTable";

export default function DepartmentsPage() {
  const departments = useQuery(api.departments.getAll);

  if (!departments) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Departments</h1>
        <DepartmentForm />
      </div>

      <DepartmentTable departments={departments} />
    </div>
  );
}
