"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StudentForm from "./StudentForm";

export default function StudentTable({
  students,
  departments,
}: {
  students: any[];
  departments: any[];
}) {
  const deleteStudent = useMutation(api.students.remove);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4 w-[220px]">Name</TableHead>
            <TableHead className="px-6 py-4 w-[260px]">Email</TableHead>
            <TableHead className="px-6 py-4 w-[180px]">Department</TableHead>
            <TableHead className="px-6 py-4 w-[120px]">Status</TableHead>
            <TableHead className="px-6 py-4 text-right w-[220px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student._id}>
              <TableCell className="px-6 py-4 font-medium">
                {student.name}
              </TableCell>

              <TableCell className="px-6 py-4">
                {student.email}
              </TableCell>

              <TableCell className="px-6 py-4">
                {student.department?.name}
              </TableCell>

              <TableCell className="px-6 py-4">
                <Badge variant="outline">{student.status}</Badge>
              </TableCell>

              <TableCell className="px-6 py-4 text-right">
                <div className="flex justify-end gap-3">
                  <StudentForm
                    student={student}
                    departments={departments}
                    mode="edit"
                  />

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteStudent({ id: student._id })}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
