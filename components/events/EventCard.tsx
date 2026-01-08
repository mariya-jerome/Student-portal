"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventForm } from "./EventForm";
import { useState } from "react";
import { format } from "date-fns";
import type { Id } from "@/convex/_generated/dataModel";

export function EventCard({ event, onUpdate, onDelete }: any) {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{event.title}</CardTitle>
            <Badge variant="outline">
              {format(new Date(event.date), "MMM dd, yyyy")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">
            {event.description}
          </p>
          <p className="text-sm mb-4">
            <strong>Location:</strong> {event.location}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {editing && (
        <Dialog open={editing} onOpenChange={setEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <EventForm
              initialData={{
                ...event,
                date: new Date(event.date).toISOString().slice(0, 16),
                departmentId: event.departmentId || "",
              }}
              submitLabel="Update"
              onSubmit={async (data) => {
                await onUpdate({ 
                  id: event._id, 
                  ...data,
                  departmentId: data.departmentId ? (data.departmentId as Id<"departments">) : undefined,
                });
                setEditing(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}