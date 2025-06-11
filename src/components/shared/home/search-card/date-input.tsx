"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * DateInput p/ formulário.
 * Props:
 * - value: { from: Date | undefined, to: Date | undefined }
 * - onChange: (range: DateRange | undefined) => void
 */
export function DateInput({
  value,
  onChange,
  className,
}: {
  value?: DateRange;
  onChange?: (val: DateRange | undefined) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [internalDate, setInternalDate] = React.useState<DateRange | undefined>(
    value ?? {
      from: new Date(2022, 0, 20),
      to: addDays(new Date(2022, 0, 20), 20),
    }
  );
  React.useEffect(() => {
    if (
      value &&
      (value.from !== internalDate?.from || value.to !== internalDate?.to)
    ) {
      setInternalDate(value);
    }
  }, [value]);

  function handleSelect(val: DateRange | undefined) {
    setInternalDate(val);
    if (onChange) onChange(val);
  }

  return (
    <div className={cn("grid gap-2 w-full", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full bg-card rounded-full h-9 justify-start hover:bg-card text-left font-normal pl-2 gap-3 md:text-base",
              !internalDate && "text-muted-foreground"
            )}
          >
            <div className="bg-primary rounded-full flex items-center justify-center text-card w-6 h-6">
              <CalendarIcon />
            </div>
            {internalDate?.from ? (
              internalDate.to ? (
                <>
                  {format(internalDate.from, "LLL dd, y")} -{" "}
                  {format(internalDate.to, "LLL dd, y")}
                </>
              ) : (
                format(internalDate.from, "LLL dd, y")
              )
            ) : (
              <span className="text-foreground">Selecionar data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          side="bottom"
          align="center"
          avoidCollisions={false}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={internalDate?.from}
            selected={internalDate}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
