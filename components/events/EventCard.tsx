"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card>
      <CardContent className="space-y-2">
        <h3 className="font-bold">{event.title}</h3>
        <p>{event.description}</p>
        <p>{new Date(event.date).toLocaleDateString()}</p>

        <div className="flex gap-2">
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
