"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import EventForm from "@/components/events/EventForm";
import EventCard from "@/components/events/EventCard";

export default function EventsPage() {
  const events = useQuery(api.events.getAll);
  const departments = useQuery(api.departments.getAll);
  const createEvent = useMutation(api.events.create);

  // ✅ DO NOT RENDER until data exists
  if (!events || !departments) {
    return <div>Loading...</div>;
  }

  const handleCreate = async (data: {
    title: string;
    description: string;
    date: number;
    location: string;
    departmentId?: string;
  }) => {
    await createEvent({
      ...data,
      departmentId: data.departmentId as any,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>

        {/* Create */}
        <EventForm
          departments={departments}
          onSubmit={handleCreate}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            departments={departments}
          />
        ))}
      </div>
    </div>
  );
}
