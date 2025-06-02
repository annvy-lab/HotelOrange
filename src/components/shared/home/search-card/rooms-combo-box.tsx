"use client";

import * as React from "react";
import { Check, ChevronsUpDown, BedDouble, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { rooms } from "@/data/rooms";

const roomOptions = rooms.map((room) => ({
  label: room.title,
  stars: room.stars,
  price: room.pricePerNight,
  features: room.features,
  value: room.title.toLowerCase().replace(/\s/g, "-"),
}));

export default function MultiRoomsComboBox() {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const toggleValue = (val: string) => {
    setSelectedValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const selectedLabels = roomOptions
    .filter((opt) => selectedValues.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-9 justify-between bg-card hover:bg-card rounded-full"
        >
          <div className="flex items-center gap-3 ml-[-0.3rem]">
            <div className="bg-primary rounded-full flex items-center justify-center text-card w-6 h-6">
              <BedDouble className="w-4 h-4" />
            </div>
            <span className="truncate text-left text-sm max-w-[15rem] md:max-w-[30rem] md:text-base">
              {selectedLabels.length > 0
                ? selectedLabels.join(", ")
                : "Hospedagem"}
            </span>
          </div>
          <ChevronsUpDown className="opacity-50 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{
          width: triggerRef.current?.offsetWidth ?? "100%",
        }}
      >
        <Command>
          <CommandInput placeholder="Buscar quarto..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum quarto encontrado.</CommandEmpty>
            <CommandGroup>
              {roomOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggleValue(option.value)}
                    className="flex items-center gap-2 py-3"
                  >
                    <div className="flex flex-col text-sm w-full">
                      <span className="font-medium md:text-base">{option.label}</span>
                      <span className="text-xs text-muted-foreground md:text-sm">
                        {option.features.join(", ")}
                      </span>
                      <span className="flex items-center gap-1 justify-between text-emerald-700 text-xs md:text-base mt-1">
                        <div className="flex gap-1">
                          {[...Array(option.stars)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-3 w-3 fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <span>R$ {option.price.toFixed(2)}</span>
                      </span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "text-primary opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
