"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type EventFormProps = {
  mode: "create" | "edit";
  event?: {
    _id: Id<"events">;
    title: string;
    description: string;
    location: string;
    date: number;
    departmentId?: Id<"departments">;
  };
};

export default function EventForm({ mode, event }: EventFormProps) {
  const createEvent = useMutation(api.events.create);
  const updateEvent = useMutation(api.events.update);

  const [title, setTitle] = useState(event?.title ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [date, setDate] = useState(
    event?.date
      ? new Date(event.date).toISOString().substring(0, 10)
      : ""
  );
  const [departmentId, setDepartmentId] = useState<string>(
    event?.departmentId ?? ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title,
      description,
      location,
      date: new Date(date).getTime(),
      departmentId: departmentId
        ? (departmentId as Id<"departments">)
        : undefined,
    };

    if (mode === "edit" && event?._id) {
      await updateEvent({
        id: event._id as Id<"events">,
        ...payload,
      });
    } else {
      await createEvent(payload);
    }

    // optional: reset form
    setTitle("");
    setDescription("");
    setLocation("");
    setDate("");
    setDepartmentId("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      {/* Department ID input (usually select dropdown in real apps) */}
      <input
        type="text"
        placeholder="Department ID"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {mode === "edit" ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
}
