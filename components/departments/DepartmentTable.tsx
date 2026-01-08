"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DepartmentForm from "./DepartmentForm";

export default function DepartmentTable({
  departments,
}: {
  departments: any[];
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4 w-[240px]">
              Name
            </TableHead>
            <TableHead className="px-6 py-4 w-[180px]">
              Code
            </TableHead>
            <TableHead className="px-6 py-4">
              Description
            </TableHead>
            <TableHead className="px-6 py-4 text-right w-[180px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {departments.map((dept) => (
            <TableRow
              key={dept._id}
              className="hover:bg-muted/50"
            >
              <TableCell className="px-6 py-4 font-medium">
                {dept.name}
              </TableCell>

              <TableCell className="px-6 py-4">
                {dept.code}
              </TableCell>

              <TableCell className="px-6 py-4">
                {dept.description ?? "-"}
              </TableCell>

              <TableCell className="px-6 py-4 text-right">
                <DepartmentForm department={dept} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
