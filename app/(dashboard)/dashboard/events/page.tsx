"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import EventForm from "@/components/events/EventForm";

export default function EventsPage() {
  const departments = useQuery(api.departments.getAll) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        {/* ✅ Pass mode and event props */}
        <EventForm mode="create" event={null} departments={departments} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Render your events list/cards here */}
      </div>
    </div>
  );
}
