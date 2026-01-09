"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

type EventFormProps = {
  event?: any;
};

export default function EventForm({ event }: EventFormProps) {
  const createEvent = useMutation(api.events.create);
  const updateEvent = useMutation(api.events.update);
  const departments = useQuery(api.departments.getAll);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [date, setDate] = useState<Date | undefined>(
    event?.date ? new Date(event.date) : undefined
  );

  const [departmentId, setDepartmentId] =
    useState<Id<"departments"> | undefined>(
      event?.departmentId
    );

  const handleSave = async () => {
    if (!title || !description || !location || !date) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        title,
        description,
        location,
        date: date.getTime(),
        departmentId,
      };

      if (event) {
        await updateEvent({ id: event._id, ...payload });
      } else {
        await createEvent(payload);
      }

      setOpen(false);
    } catch (error) {
      console.error("Event save failed:", error);
      alert("Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{event ? "Edit" : "Add Event"}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add Event"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Event Title"
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
            className="rounded-md border"
          />

          {/* ✅ FIXED SELECT */}
          <Select
            value={departmentId ?? "none"}
            onValueChange={(value) =>
              setDepartmentId(
                value === "none"
                  ? undefined
                  : (value as Id<"departments">)
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department (Optional)" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">No Department</SelectItem>

              {departments?.map((dept) => (
                <SelectItem key={dept._id} value={dept._id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
