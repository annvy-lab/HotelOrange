"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
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
import { destinations } from "@/data/destinations";

const locationOptions = destinations.map((loc) => ({
  label: `${loc.cidade} - ${loc.estado} (${loc.bairro})`,
  value: `${loc.cidade}-${loc.estado}`.toLowerCase().replace(/\s/g, "-"),
}));

export default function DestinationsComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);

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
          <div className="flex items-center gap-3 ml-[-0.3rem] md:text-base">
            <div className="bg-primary rounded-full flex items-center justify-center text-card w-6 h-6">
              <MapPin />
            </div>
            {value
              ? locationOptions.find((option) => option.value === value)?.label
              : "Local"}
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
          <CommandInput placeholder="Buscar cidade ou bairro..." className="h-9" />
          <CommandList>
            <CommandEmpty>Nenhum local encontrado.</CommandEmpty>
            <CommandGroup>
              {locationOptions.map((option) => (
                <CommandItem className="md:text-base"
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "text-primary opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
