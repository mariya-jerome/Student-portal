"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import StudentTable from "@/components/students/StudentTable";
import StudentForm from "@/components/students/StudentForm";

export default function StudentsPage() {
  const students = useQuery(api.students.getAll);
  const departments = useQuery(api.departments.getAll);

  // ✅ IMPORTANT GUARD
  if (!students || !departments) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>

        {/* Add student button */}
        <StudentForm
          departments={departments}
          mode="create"
        />
      </div>

      <StudentTable
        students={students}
        departments={departments}
      />
    </div>
  );
}
