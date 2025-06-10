"use client";

import { useParams } from "next/navigation";
import { rooms } from "@/data/rooms";
import {
  Star,
  BedSingle,
  Coffee,
  Tv,
  Gem,
  Share2,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import NavBar from "@/components/shared/home/navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Footer from "@/components/shared/footer";

export default function RoomDetailsPage() {
  const { id } = useParams();
  const room = rooms.find((room) => room.id === Number(id));

  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes("cama"))
      return <BedSingle className="w-5 h-5 text-primary" />;
    if (feature.toLowerCase().includes("café"))
      return <Coffee className="w-5 h-5 text-primary" />;
    if (feature.toLowerCase().includes("tv"))
      return <Tv className="w-5 h-5 text-primary" />;
    return <Gem className="w-5 h-5 text-primary" />;
  };

  if (!room) {
    return (
      <div className="text-center py-10 text-red-500">
        Quarto não encontrado.
      </div>
    );
  }

  return (
    <div>
      <div className="w-full min-h-screen px-6 flex items-center justify-center mb-[-6rem]">
        <NavBar />
        <div className="w-full flex items-start justify-between px-20">
          <div className="w-[48%]">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <img
                    src="/imageRoom.png"
                    alt={room.title}
                    className="w-full object-cover rounded-2xl"
                  />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="w-full md:w-[45%] h-full flex flex-col justify-between py-2 gap-4 md:pt-0">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-3xl font-semibold">
                  {room.title}
                </h2>
                <div className="flex gap-1">
                  {[...Array(room.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm md:text-sm text-muted-foreground">
                {room.description}
              </div>

              <ul className="flex flex-col gap-2 text-sm md:text-base text-muted-foreground">
                {room.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {getFeatureIcon(feature)}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-1">
                <div className="text-primary text-lg md:text-2xl font-bold flex gap-1 items-baseline">
                  <span className="text-sm md:text-md">R$</span>
                  {room.pricePerNight.toFixed(2)}
                  <span className="text-xs md:text-lg font-medium ml-1">
                    / diária
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <Button
                variant="outline"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              >
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              <Button
                className="bg-foreground text-white h-10 rounded-full flex-1"
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
                    localStorage.setItem("cart", JSON.stringify(existingCart));
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
      </div>
      <Footer />
    </div>
  );
}
