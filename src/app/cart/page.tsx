"use client";

import { useEffect, useState, useRef } from "react";
import {
  BedSingle,
  Coffee,
  Tv,
  Gem,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  Barcode,
  Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/shared/home/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { DateInput } from "@/components/shared/home/search-card/date-input";
import DestinationsComboBox from "@/components/shared/home/search-card/destinations-combo-box";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";

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
  const [payment, setPayment] = useState("credito");
  const dateRef = useRef<{
    from: Date | undefined;
    to: Date | undefined;
  } | null>(null);
  const locationRef = useRef<{ value: string } | null>(null);

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
      .filter((room) => room.quantity > 0);
    updateCart(updatedCart);
  };

  const total = cart.reduce(
    (acc, room) => acc + room.pricePerNight * room.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("O carrinho está vazio.");
      return;
    }
    const date = dateRef.current;
    const location = locationRef.current?.value;
    if (!date?.from || !date.to) {
      toast.error("Selecione um intervalo de datas.");
      return;
    }
    if (!location) {
      toast.error("Selecione um local para a reserva.");
      return;
    }
    if (!payment) {
      toast.error("Selecione uma forma de pagamento.");
      return;
    }
    toast.success("Reserva confirmada com sucesso!");
  };

  return (
    <div className="max-w-screen min-h-screen px-4 md:px-10 py-24 pb-0">
      <NavBar />
      <h1 className="text-2xl font-bold">Carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">
          Seu carrinho está vazio.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-8 mt-4"
        >
          <ScrollArea className="w-full md:w-1/2 h-[calc(100vh-200px)] pr-2 overflow-y-auto border rounded-lg p-4">
            <div className="space-y-4">
              {cart.map((room) => (
                <div
                  key={room.id}
                  className="bg-card p-4 rounded-2xl shadow-md space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">{room.title}</h2>
                    <div className="flex items-baseline text-primary">
                      <span className="text-sm font-bold">R$</span>
                      <span className="text-lg font-bold ml-1">
                        {room.pricePerNight.toFixed(2)}
                      </span>
                      <span className="text-xs ml-1">/ diária</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-muted-foreground text-sm">
                      {room.features.join(", ")}
                    </span>

                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => decreaseQuantity(room.id)}
                        className="w-6 h-6"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-6 text-center font-semibold text-sm">
                        {room.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => increaseQuantity(room.id)}
                        className="w-6 h-6"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="w-full md:w-1/2 bg-muted bg-card rounded-lg p-6 space-y-4 px-8 pt-0">
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="date" className="text-base">
                Data: <span className="text-red-700">*</span>
              </Label>
              <DateInput ref={dateRef} />
            </div>
            <div className="flex flex-col items-start gap-1">
              <Label htmlFor="location" className="text-base">
                Local <span className="text-red-700">*</span>
              </Label>
              <DestinationsComboBox ref={locationRef} />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <Label className="text-base">
                Forma de Pagamento: <span className="text-red-700">*</span>
              </Label>
              <RadioGroup
                value={payment}
                onValueChange={setPayment}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="flex items-center justify-between gap-4 border rounded-lg p-4 cursor-pointer transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-muted bg-card">
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <Label
                      htmlFor="credito"
                      className="font-medium cursor-pointer"
                    >
                      Cartão de Crédito
                    </Label>
                  </div>
                  <RadioGroupItem value="credito" id="credito" />
                </div>

                <div className="flex items-center justify-between gap-4 border rounded-lg p-4 cursor-pointer transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-muted bg-card">
                  <div className="flex items-center gap-1">
                    <Banknote className="w-5 h-5 text-primary" />
                    <Label
                      htmlFor="debito"
                      className="font-medium cursor-pointer"
                    >
                      Cartão de Débito
                    </Label>
                  </div>
                  <RadioGroupItem value="debito" id="debito" />
                </div>

                <div className="flex items-center justify-between gap-4 border rounded-lg p-4 cursor-pointer transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-muted bg-card">
                  <div className="flex items-center gap-1">
                    <Landmark className="w-5 h-5 text-primary" />
                    <Label htmlFor="pix" className="font-medium cursor-pointer">
                      PIX
                    </Label>
                  </div>
                  <RadioGroupItem value="pix" id="pix" />
                </div>

                <div className="flex items-center justify-between gap-4 border rounded-lg p-4 cursor-pointer transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-muted bg-card">
                  <div className="flex items-center gap-1">
                    <Barcode className="w-5 h-5 text-primary" />
                    <Label
                      htmlFor="boleto"
                      className="font-medium cursor-pointer"
                    >
                      Boleto Bancário
                    </Label>
                  </div>
                  <RadioGroupItem value="boleto" id="boleto" />
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4 border-t mt-4">
              <span className="text-lg font-semibold block mb-2">
                Total: R$ {total.toFixed(2)}
              </span>
              <Button type="submit" className="w-full">
                Confirmar Reserva
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
