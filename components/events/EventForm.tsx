"use client";

import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

export default function EventForm({ mode, event, departments }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [departmentId, setDepartmentId] = useState<Id<"departments"> | undefined>(undefined);

  const updateEvent = useMutation(api.events.update);
  const createEvent = useMutation(api.events.create);

  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      location,
      date: date ? date.getTime() : Date.now(),
      departmentId,
    };

    if (mode === "edit") {
      await updateEvent({ id: event._id as Id<"events">, ...payload });
    } else {
      await createEvent(payload);
    }
    setOpen(false);
  };

  // ✅ Now the return is inside the component
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">{mode === "edit" ? "Edit" : "Add Event"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "edit" ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>

        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

        <Calendar mode="single" selected={date} onSelect={setDate} />

        <Select value={departmentId} onValueChange={(val) => setDepartmentId(val as Id<"departments">)}>
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
