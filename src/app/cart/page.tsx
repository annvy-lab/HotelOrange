"use client";

import { useEffect, useState } from "react";
import { Star, BedSingle, Coffee, Tv, Gem, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Room {
  id: number;
  title: string;
  pricePerNight: number;
  stars: number;
  features: string[];
  quantity: number;
}

const getFeatureIcon = (feature: string) => {
  if (feature.toLowerCase().includes("cama"))
    return <BedSingle className="w-4 h-4 text-primary" />;
  if (feature.toLowerCase().includes("café"))
    return <Coffee className="w-4 h-4 text-primary" />;
  if (feature.toLowerCase().includes("tv"))
    return <Tv className="w-4 h-4 text-primary" />;
  return <Gem className="w-4 h-4 text-primary" />;
};

export default function CartPage() {
  const [cart, setCart] = useState<Room[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart: Room[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: number) => {
    const updatedCart = cart.map((room) =>
      room.id === id ? { ...room, quantity: room.quantity + 1 } : room
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id: number) => {
    const updatedCart = cart
      .map((room) =>
        room.id === id ? { ...room, quantity: room.quantity - 1 } : room
      )
      .filter((room) => room.quantity > 0); // Remove itens com quantity 0
    updateCart(updatedCart);
  };

  const total = cart.reduce(
    (acc, room) => acc + room.pricePerNight * room.quantity,
    0
  );

  return (
    <div className="p-6 space-y-4">
      <div>
        <button
          className="flex items-center gap-2 mb-4"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-lg font-semibold">Voltar</span>
        </button>
      </div>

      <h1 className="pl-10 mt-10 text-2xl font-bold">Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p className="p-10 m-10 justify-center itens-center text-center">
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4">
            {cart.map((room) => (
              <div
                key={room.id}
                className="w-full h-fit max-h-100 bg-card rounded-2xl justify-center shadow-xl flex flex-col items-center md:max-w-140"
              >
                <div
                  className="rounded-t-2xl w-full h-20 bg-cover bg-center md:h-35"
                  style={{ backgroundImage: "url('/imageRoom.svg')" }}
                ></div>
                <div className="w-full ml-2 py-2 flex justify-between  items-center gap-3">
                  <h2 className="text-lg md:text-xl font-medium">
                    {room.title}
                  </h2>
                </div>

                <ul className="ml-3 flex flex-col w-full space-y-1 text-sm md:text-base text-muted-foreground mt-1">
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

                <div className="ml-3 flex w-full justify-between items-center mt-2 mb-1">
                  <div className="flex gap-1 items-baseline w-fit justify-start text-primary">
                    <span className="font-bold text-sm">R$</span>
                    <span className="font-bold text-xl md:text-2xl">
                      {room.pricePerNight.toFixed(2)}/ noite
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => decreaseQuantity(room.id)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-semibold min-w-[24px] text-center">
                    {room.quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => increaseQuantity(room.id)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col justify-evenly items-center border-t mt-4">
            <span className="text-xl font-semibold m-4">
              Total: R$ {total.toFixed(2)}
            </span>
            <Button onClick={() => alert("Reserva confirmada!")}>
              Confirmar Reserva
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
