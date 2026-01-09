"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventForm from "./EventForm";

export default function EventCard({
  event,
  departments,
}: {
  event: any;
  departments: any[];
}) {
  const remove = useMutation(api.events.remove);

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="space-y-1">
        <h3 className="text-lg font-semibold">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {new Date(event.date).toLocaleDateString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm">
          {event.description}
        </p>

        <p className="text-sm">
          📍 {event.location}
        </p>

        <div className="flex gap-3 pt-2">
          <EventForm
            event={event}
            departments={departments}
            mode="edit"
          />

          <Button
            size="sm"
            variant="destructive"
            onClick={() => remove({ id: event._id })}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
