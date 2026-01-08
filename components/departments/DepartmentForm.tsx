"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function DepartmentForm({ department }: { department?: any }) {
  const create = useMutation(api.departments.create);
  const update = useMutation(api.departments.update);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(department?.name ?? "");
  const [code, setCode] = useState(department?.code ?? "");

  const handleSubmit = async () => {
    department
      ? await update({ id: department._id, name, code })
      : await create({ name, code });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">{department ? "Edit" : "Add Department"}</Button>
      </DialogTrigger>
      <DialogContent>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code" />
        <Button onClick={handleSubmit}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
