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
  ShoppingBag,
  UserRound,
  MapPin,
  Check,
  Calendar,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

import NavBar from "@/components/shared/home/navbar";
import { DateInput } from "@/components/shared/home/search-card/date-input";
import DestinationsComboBox from "@/components/shared/home/search-card/destinations-combo-box";
import { FormProvider } from "react-hook-form";

interface Room {
  id: number;
  title: string;
  pricePerNight: number;
  stars: number;
  features: string[];
  quantity: number;
}

const checkoutSchema = z.object({
  nomeCompleto: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  cpf: z.string().min(11, "CPF deve ter 11 dígitos").max(14, "CPF inválido"),
  cep: z.string().min(8, "CEP deve ter 8 dígitos"),
  endereco: z.string().min(5, "Endereço é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(2, "Bairro é obrigatório"),
  cidade: z.string().min(2, "Cidade é obrigatória"),
  estado: z.string().min(2, "Estado é obrigatório"),
  numeroCartao: z.string().min(16, "Número do cartão deve ter 16 dígitos"),
  nomeCartao: z.string().min(2, "Nome no cartão é obrigatório"),
  validadeCartao: z.string().min(5, "Validade é obrigatória (MM/AA)"),
  cvv: z.string().min(3, "CVV deve ter 3 dígitos").max(4, "CVV inválido"),
  solicitacoesEspeciais: z.string().optional(),
  aceitaTermos: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos"),
  aceitaNewsletter: z.boolean().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

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
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const dateRef = useRef<{
    from: Date | undefined;
    to: Date | undefined;
  } | null>(null);
  const locationRef = useRef<{ value: string } | null>(null);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nomeCompleto: "",
      email: "",
      telefone: "",
      cpf: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      numeroCartao: "",
      nomeCartao: "",
      validadeCartao: "",
      cvv: "",
      solicitacoesEspeciais: "",
      aceitaTermos: false,
      aceitaNewsletter: false,
    },
  });

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

  const proximaEtapa = () => {
    if (etapaAtual < 3) setEtapaAtual(etapaAtual + 1);
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const onSubmit = async (data: CheckoutFormData) => {
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

    setProcessandoPagamento(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    toast.success("Reserva confirmada com sucesso!");
    setProcessandoPagamento(false);
  };

  return (
    <div className="max-w-screen min-h-screen px-4 md:px-10 py-24 pb-0">
      <NavBar />
      <div className="w-full flex items-start text-start justify-between pr-13">
        <h1 className="w-1/2 text-2xl font-bold">Carrinho</h1>
        {cart.length === 0 ? null : (
          <div className="w-fit">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= etapaAtual
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < etapaAtual ? <Check className="h-4 w-4" /> : step}
                  </div>
                  <div className="ml-2 text-sm">
                    {step === 1 && "Dados Pessoais"}
                    {step === 2 && "Endereço"}
                    {step === 3 && "Reserva"}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        step < etapaAtual ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium">Seu carrinho está vazio...</h3>
          <p className="text-sm text-foreground/70">
            Clique em reservar nos quartos de nossa galeria!
          </p>
          <a href="/home#rooms">
            <Button className="bg-primary mt-2">Reservar quartos</Button>
          </a>
        </div>
      ) : (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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

            <div className="w-full md:w-1/2 h-[calc(100vh-200px)] pr-2 overflow-y-auto border rounded-lg p-4 pt-2.5">
              {etapaAtual === 1 && (
                <div className="bg-background h-full px-0 p-0 border-none shadow-none rounded-none gap-2">
                  <div className="flex items-center gap-2 mb-3 text-lg font-medium">
                    <UserRound className="h-5 w-5 text-primary" />
                    Dados Pessoais
                  </div>
                  <div className="space-y-4 p-0">
                    <FormField
                      control={form.control}
                      name="nomeCompleto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Nome Completo:{" "}
                            <span className="text-red-700">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-card rounded-full"
                              placeholder="Digite seu nome completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Email: <span className="text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-card rounded-full"
                                type="email"
                                placeholder="seu@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Telefone:
                              <span className="text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-card rounded-full"
                                placeholder="(11) 99999-9999"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            CPF: <span className="text-red-700">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-card rounded-full"
                              placeholder="000.000.000-00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {etapaAtual === 2 && (
                <div className="bg-background p-0 border-none shadow-none rounded-none gap-2">
                  <div className="flex items-center gap-2 mb-3 text-lg font-medium">
                    <MapPin className="h-5 w-5 text-primary" />
                    Endereço de Cobrança
                  </div>
                  <div className="space-y-4 p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              CEP: <span className="text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-card rounded-full"
                                placeholder="00000-000"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="endereco"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base">
                                Endereço:{" "}
                                <span className="text-red-700">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="bg-card rounded-full"
                                  placeholder="Rua, Avenida..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="numero"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Número: <span className="text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-card rounded-full"
                                placeholder="123"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="complemento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Complemento:{" "}
                              <span className="text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-card rounded-full"
                                placeholder="Apto, Bloco..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="bairro"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Bairro: <span className="text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-card rounded-full"
                                placeholder="Centro"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cidade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Cidade: <span className="text-red-700">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="bg-card rounded-full"
                                placeholder="São Paulo"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Estado: <span className="text-red-700">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-card rounded-full">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SP">São Paulo</SelectItem>
                                <SelectItem value="RJ">
                                  Rio de Janeiro
                                </SelectItem>
                                <SelectItem value="MG">Minas Gerais</SelectItem>
                                <SelectItem value="RS">
                                  Rio Grande do Sul
                                </SelectItem>
                                <SelectItem value="PR">Paraná</SelectItem>
                                <SelectItem value="SC">
                                  Santa Catarina
                                </SelectItem>
                                <SelectItem value="BA">Bahia</SelectItem>
                                <SelectItem value="GO">Goiás</SelectItem>
                                <SelectItem value="PE">Pernambuco</SelectItem>
                                <SelectItem value="CE">Ceará</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {etapaAtual === 3 && (
                <div className="bg-background p-0 border-none shadow-none rounded-none gap-2">
                  <div className="flex items-center gap-2 mb-3 text-lg font-medium">
                    <Calendar className="h-5 w-5 text-primary" />
                    Dados da Reserva
                  </div>
                  <div className="space-y-4 p-0">
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
                        Forma de Pagamento:{" "}
                        <span className="text-red-700">*</span>
                      </Label>
                      <RadioGroup
                        value={payment}
                        onValueChange={setPayment}
                        className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="flex items-center justify-between gap-4 border rounded-lg p-4 cursor-pointer transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-muted bg-card">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" strokeWidth={1.5} />
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
                          <div className="flex items-center gap-2">
                            <Banknote className="w-4 h-4" strokeWidth={1.5} />
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
                          <div className="flex items-center gap-2">
                            <img
                              className="w-4 h-4"
                              src="/icon-pix.svg"
                              alt="Ícone PIX"
                            />
                            <Label
                              htmlFor="pix"
                              className="font-medium cursor-pointer"
                            >
                              Pix
                            </Label>
                          </div>
                          <RadioGroupItem value="pix" id="pix" />
                        </div>

                        <div className="flex items-center justify-between gap-4 border rounded-lg p-4 cursor-pointer transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-muted bg-card">
                          <div className="flex items-center gap-2">
                            <Barcode className="w-4 h-4" strokeWidth={1.5} />
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
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full bg-background border-t shadow-md z-10 p-4 rounded-b-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6">
                  <span className="text-lg font-semibold">
                    Total: R$ {total.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {etapaAtual > 1 && (
                      <Button
                        variant="outline"
                        onClick={etapaAnterior}
                        type="button"
                      >
                        Voltar
                      </Button>
                    )}

                    {etapaAtual < 3 && (
                      <Button
                        onClick={proximaEtapa}
                        type="button"
                        className="bg-primary"
                      >
                        Continuar
                      </Button>
                    )}

                    {etapaAtual === 3 && (
                      <Button type="submit" className="w-full md:w-auto">
                        Confirmar Reserva
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      )}
      ;
    </div>
  );
}
