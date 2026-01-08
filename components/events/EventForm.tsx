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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

export default function EventForm({
  departments = [],   // ✅ SAFE DEFAULT
  event,
  mode = "create",
  onSubmit,
}: {
  departments?: any[];
  event?: any;
  mode?: "create" | "edit";
  onSubmit?: (data: any) => Promise<void>;
}) {
  const createEvent = useMutation(api.events.create);
  const updateEvent = useMutation(api.events.update);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [date, setDate] = useState<Date | undefined>(
    event ? new Date(event.date) : undefined
  );
  const [departmentId, setDepartmentId] = useState<string | undefined>(
    event?.departmentId
  );
const handleSubmit = async () => {
  if (mode === "edit") {
    await updateEvent({ id: event._id, ...payload });
  } else {
    await createEvent(payload);
  }
};

  import { Id } from "@/convex/_generated/dataModel";

const payload = {
  title,
  description,
  location,
  date: Number(date),
  departmentId: departmentId ? (departmentId as Id<"departments">) : undefined,
};

if (mode === "edit") {
  await updateEvent({ id: event._id as Id<"events">, ...payload });
} else {
  await createEvent(payload);
}


    

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          {mode === "edit" ? "Edit" : "Add Event"}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Event" : "Add Event"}
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
        />

        <Select
          value={departmentId}
          onValueChange={setDepartmentId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Department (Optional)" />
          </SelectTrigger>

          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept._id} value={dept._id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSubmit}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
