"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function DatePickerDemo({
  setNewUTCString,
}: {
  setNewUTCString: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [date, setDate] = React.useState<Date>();

  if (date != undefined) {
    const locStr = date.toLocaleDateString();
    const [d, m, y] = locStr.split("/");
    const [_dateString, time] = date.toISOString().split("T");
    const [_h, _mm, stz] = time.split(":");
    const [_s, tz] = stz.split(".");
    const newDateStr = `${y}-${m}-${d}` + "T16:30:00." + tz;
    setNewUTCString(newDateStr);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
