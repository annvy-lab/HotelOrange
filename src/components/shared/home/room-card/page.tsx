"use client";

import { rooms } from "@/data/rooms";
import {
  Star,
  BedSingle,
  Coffee,
  Tv,
  Gem,
  Share2,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RoomCard() {
  const router = useRouter();

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
    <div className="flex-1 overflow-auto px-6 mb-30 pb-8">
      <div id="rooms" className="space-y-2 grid grid-cols-2 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="h-fit bg-card rounded-2xl shadow-xl flex flex-col items-center"
          >
            <div
              className="rounded-t-2xl w-full h-20 bg-cover bg-center md:h-35"
              style={{ backgroundImage: "url('/imageRoom.png')" }}
            ></div>

            <div className="px-6 py-4 w-full flex flex-col items-center">
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

              <ul className="flex flex-col w-full space-y-1 text-sm md:text-base text-foreground/90 mt-1">
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
                  <span className="font-normal text-xs md:text-base">
                    diária
                  </span>
                </div>
                <div
                  className="flex gap-1 items-baseline w-fit justify-start text-muted-foreground cursor-pointer"
                  onClick={() => router.push(`/rooms/${room.id}`)}
                >
                  <span className="font-normal text-sm">Ver detalhes...</span>
                </div>
              </div>

              <div className="w-full flex items-center justify-between gap-4 mt-3">
                <Button
                  variant="outline"
                  className="rounded-full w-8 h-8 p-0 flex items-center justify-center"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full w-8 h-8 p-0 flex items-center justify-center"
                >
                  <Bookmark className="w-5 h-5" />
                </Button>
                <Button
                  className="w-full bg-foreground text-white h-8 rounded-full flex-1"
                  onClick={() => {
                    const existingCart = JSON.parse(
                      localStorage.getItem("cart") || "[]"
                    );
                    const index = existingCart.findIndex(
                      (item: any) => item.id === room.id
                    );
                    if (index > -1) {
                      existingCart[index].quantity =
                        (existingCart[index].quantity || 1) + 1;
                      localStorage.setItem(
                        "cart",
                        JSON.stringify(existingCart)
                      );
                    } else {
                      const roomWithQuantity = { ...room, quantity: 1 };
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...existingCart, roomWithQuantity])
                      );
                    }
                    toast.success("Adicionado ao carrinho!");
                  }}
                >
                  Reservar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
