"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EventForm from "@/components/events/EventForm";
import EventCard from "@/components/events/EventCard";

export default function EventsPage() {
  const events = useQuery(api.events.getAll);
  const departments = useQuery(api.departments.getAll);

  if (!events || !departments) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <EventForm departments={departments} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
