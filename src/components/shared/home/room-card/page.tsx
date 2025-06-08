"use client";
import { rooms } from "@/data/rooms";
import { Star, BedSingle, Coffee, Tv, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { use } from "react";

export default function RoomCard() {
  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes("cama"))
      return <BedSingle className="w-4 h-4 text-primary" />;
    if (feature.toLowerCase().includes("café"))
      return <Coffee className="w-4 h-4 text-primary" />;
    if (feature.toLowerCase().includes("tv"))
      return <Tv className="w-4 h-4 text-primary" />;
    return <Gem className="w-4 h-4 text-primary" />;
  };

  return (
    <div
      id="rooms"
      className="w-full flex flex-col items-center gap-4 md:gap-6"
    >
      {rooms.map((room) => (
        <div
          key={room.id}
          className="w-full h-fit max-h-100 bg-card rounded-2xl shadow-xl flex flex-col items-center md:max-w-140"
        >
          <div
            className="rounded-t-2xl w-full h-20 bg-cover bg-center md:h-35"
            style={{ backgroundImage: "url('/imageRoom.svg')" }}
          ></div>

          <div className="px-3 py-3 w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between gap-3">
              <h2 className="text-lg md:text-xl font-medium">{room.title}</h2>
              <div className="flex gap-1 items-center">
                {[...Array(room.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 md:h-4 md:w-4 fill-primary text-primary"
                  />
                ))}
              </div>
            </div>
            <ul className="flex flex-col w-full space-y-1 text-sm md:text-base text-muted-foreground mt-1">
              {room.features.map((feature, index) => {
                if (room.features.length > 3 && index === 2) return null;
                return (
                  <li key={index} className="flex items-center gap-2">
                    {getFeatureIcon(feature)}
                    <span>{feature}</span>
                  </li>
                );
              })}
            </ul>

            <div className="flex w-full justify-between items-center mt-2 mb-1">
              <div className="flex gap-1 items-baseline w-fit justify-start text-primary">
                <span className="font-bold text-sm">R$</span>
                <span className="font-bold text-xl md:text-2xl">
                  {room.pricePerNight.toFixed(2)}
                </span>
                <span className="font-normal text-xs md:text-base">diária</span>
              </div>
            </div>
            <Button
              className="bg-foreground w-full h-8 rounded-full mt-1 cursor-pointer"
              onClick={() => {
                const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
                const updatedCart = [...existingCart, room];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                alert("Reserva adicionada ao carrinho!");
              }}>
              Reservar
            </Button>

          </div>
        </div>
      ))}
    </div>
  );
}
