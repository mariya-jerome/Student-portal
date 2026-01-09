"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EventCard from "@/components/events/EventCard";
import EventForm from "@/components/events/EventForm";

export default function EventsPage() {
  const events = useQuery(api.events.getAll);

  if (events === undefined) {
    return <div className="p-4">Loading events...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events</h1>
        <EventForm />
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <p className="text-muted-foreground">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
