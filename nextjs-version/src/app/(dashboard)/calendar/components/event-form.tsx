"use client"

import { useState } from "react"
import { CalendarIcon, Clock, MapPin, Users, Type, Tag } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { type CalendarEvent } from "../types"

interface EventFormProps {
  event?: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (event: Partial<CalendarEvent>) => void
  onDelete?: (eventId: number) => void
}

const eventTypes = [
  { value: "meeting", label: "Meeting", color: "bg-blue-500" },
  { value: "event", label: "Event", color: "bg-green-500" },
  { value: "personal", label: "Personal", color: "bg-pink-500" },
  { value: "task", label: "Task", color: "bg-orange-500" },
  { value: "reminder", label: "Reminder", color: "bg-purple-500" }
]

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"
]

const durationOptions = [
  "15 min", "30 min", "45 min", "1 hour", "1.5 hours", "2 hours", "3 hours", "All day"
]

// View-only event popup with markdown and read more/scrollable
import ReactMarkdown from "react-markdown";
export function EventForm({ event, open, onOpenChange }: EventFormProps) {
  const [expanded, setExpanded] = useState(false);
  if (!event) return null;
  const isLong = event.description && event.description.length > 600;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", event.color)} />
            {event.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
            <span>{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{event.time} ({event.duration})</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <span>Attendees:</span>
              <div className="flex -space-x-2">
                {event.attendees.map((attendee: string, index: number) => (
                  <Avatar key={index} className="w-6 h-6 border-2 border-background">
                    <AvatarFallback className="text-xs">{attendee}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn("text-white", event.color)}>
              {event.type}
            </Badge>
          </div>
          <div className="mt-4">
            <div className={isLong && !expanded ? "max-h-48 overflow-hidden relative" : "max-h-[60vh] overflow-y-auto"}>
              <ReactMarkdown>{event.description || "No description provided."}</ReactMarkdown>
              {isLong && !expanded && (
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent flex items-end justify-center">
                  <button className="text-primary font-medium py-2 px-4 bg-background rounded shadow" onClick={() => setExpanded(true)}>
                    Read more
                  </button>
                </div>
              )}
            </div>
            {isLong && expanded && (
              <div className="flex justify-center mt-2">
                <button className="text-primary font-medium py-1 px-3 bg-background rounded shadow" onClick={() => setExpanded(false)}>
                  Show less
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
