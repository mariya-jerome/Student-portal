"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StudentForm({
  departments = [],   // ✅ DEFAULT VALUE
  student,
  mode = "create",
}: {
  departments?: any[];
  student?: any;
  mode?: "create" | "edit";
}) {
  const createStudent = useMutation(api.students.create);
  const updateStudent = useMutation(api.students.update);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(student?.name ?? "");
  const [email, setEmail] = useState(student?.email ?? "");
  const [departmentId, setDepartmentId] = useState(student?.departmentId ?? "");
  const [status, setStatus] = useState(student?.status ?? "active");

  const handleSubmit = async () => {
    if (mode === "create") {
      await createStudent({
        name,
        email,
        departmentId,
        status,
      });
    } else {
      await updateStudent({
        id: student._id,
        name,
        email,
        departmentId,
        status,
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          {mode === "edit" ? "Edit" : "Add Student"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Student" : "Add Student"}
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Select value={departmentId} onValueChange={setDepartmentId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>

          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d._id} value={d._id}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="graduated">Graduated</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSubmit}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
