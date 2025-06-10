"use client"

import { useState } from "react"
import { Calendar, MapPin, Search, Moon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import NavBar from "@/components/shared/home/navbar"
import Footer from "@/components/shared/footer"

type ReservationStatus = "confirmada" | "concluida" | "cancelada"

type Reservation = {
  id: string
  hotelName: string
  location: string
  status: ReservationStatus
  checkIn: string
  checkOut: string
  nights: number
  roomType: string[]
  roomQty: number[]
  roomPrice: number[]
  totalPrice: number
  Payment: string
}

const reservations: Reservation[] = [
  {
    id: "1",
    hotelName: "Hotel Paraíso",
    location: "Rio de Janeiro, RJ",
    status: "confirmada",
    checkIn: "2025-06-10",
    checkOut: "2025-06-12",
    nights: 2,
    roomType: ["Suíte Deluxe"],
    roomQty: [1],
    roomPrice: [500],
    totalPrice: 1000,
    Payment: "Cartão de Crédito"
  },
  {
    id: "2",
    hotelName: "Pousada das Montanhas",
    location: "Campos do Jordão, SP",
    status: "concluida",
    checkIn: "2025-05-01",
    checkOut: "2025-05-04",
    nights: 3,
    roomType: ["Quarto Standard"],
    roomQty: [1],
    roomPrice: [300],
    totalPrice: 900,
    Payment: "Pix"
  },
  {
    id: "3",
    hotelName: "Resort Beira-Mar",
    location: "Salvador, BA",
    status: "cancelada",
    checkIn: "2025-07-15",
    checkOut: "2025-07-20",
    nights: 5,
    roomType: ["Apartamento Família", "Suíte Vista Mar"],
    roomQty: [1, 1],
    roomPrice: [400, 500],
    totalPrice: 4500,
    Payment: "Boleto"
  }
]

export default function HotelReservationHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.hotelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case "confirmada":
        return "bg-green-100 text-green-800 border-green-200"
      case "concluida":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelada":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: ReservationStatus) => {
    switch (status) {
      case "confirmada":
        return "Confirmada"
      case "concluida":
        return "Concluída"
      case "cancelada":
        return "Cancelada"
      default:
        return "Desconhecida"
    }
  }

  return (
    <div>
    <div className="max-w-screen min-h-screen px-4 md:px-10 py-24 pb-5">
      <NavBar />
      {/* Search and Filter Bar */}
      <div className="py-3">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative bg-card rounded-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Pesquisar por hotel ou local..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              />
          </div>

          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-card">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="confirmada">Confirmadas</SelectItem>
                <SelectItem value="concluida">Concluídas</SelectItem>
                <SelectItem value="cancelada">Canceladas</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-foreground/70 flex items-center">
              Total de reservas: {filteredReservations.length}
            </div>
          </div>
        </div>
      </div>

      {/* Reservations List */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-2 grid grid-cols-2 gap-4">
          {filteredReservations.map((reservation) => (
            <Card key={reservation.id} className="overflow-hidden py-0">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 flex gap-1 items-center">
                        <MapPin className="h-4 w-4 mr-1" strokeWidth={1.5} />
                        {reservation.location}
                      </h3>

                      <Badge variant="outline" className={cn("font-medium", getStatusColor(reservation.status))}>
                        {getStatusLabel(reservation.status)}
                      </Badge>
                    </div>

                    <div className="w-full grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center col-span-1">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <div>
                          <div className="font-medium">Check-in</div>
                          <div>{new Date(reservation.checkIn).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center col-span-1">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <div>
                          <div className="font-medium">Check-out</div>
                          <div>{new Date(reservation.checkOut).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center col-span-1">
                        <Moon className="h-4 w-4 mr-2 text-primary" />
                        <div className="font-medium">{reservation.nights} noite{reservation.nights > 1 ? "s" : ""}</div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <div className="font-medium">
                        {
                          reservation.roomType.map((type, index) => (
                            `${type} x${reservation.roomQty[index]} - R$${reservation.roomPrice[index]}`
                          )).join(", ")
                        }
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">R${reservation.totalPrice.toFixed(2)}</div>
                        <div className="text-xs text-foreground/70">Total pago</div>
                      </div>
                      <div>
                        <div className="text-xs text-foreground/70">Forma de pagamento:</div>
                        <div className="text-sm text-foreground/70 font-semibold">{reservation.Payment}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReservations.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium">Nenhuma reserva encontrada</h3>
            <p className="text-sm text-foreground/70">Realize uma compra conosco!.</p>
            <a href="/home#rooms">
            <Button className="bg-primary mt-2">Reservar nova estadia</Button>
            </a>
          </div>
        )}
      </div>
    </div>
        <Footer/>
      </div>
  )
}
