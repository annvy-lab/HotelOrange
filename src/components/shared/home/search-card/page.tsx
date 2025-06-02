"use client";
import DestinationsComboBox from "./destinations-combo-box";
import { DateInput } from "./date-input";
import RoomsComboBox from "./rooms-combo-box";
import { Button } from "@/components/ui/button";

export default function SearchCard() {
  return (
    <div className="w-full h-fit py-8 flex flex-col items-center md:mb-20">
      <div className="w-full md:max-w-140 flex flex-col items-center gap-3">
      <h1 className="text-xl mt-2 md:mt-0 md:text-3xl font-semibold self-start md:mb-1 ml-1">Busca Rápida</h1>
      <DestinationsComboBox/>
      <DateInput/>
      <RoomsComboBox/>
      <Button  className="w-full bg-foreground rounded-full h-8 font-normal self-center">Buscar</Button>
      </div>
    </div>
  );
}
