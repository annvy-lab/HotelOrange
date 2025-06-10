"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, CreditCard, Shield, Clock, Check, Phone, Mail, Wifi, Car, Coffee, Utensils, ChevronDown, ChevronUp } from "lucide-react"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from "@/components/ui/collapsible"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"


export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍊</span>
              </div>
              <h3 className="text-xl font-bold text-primary">Hotel Laranja</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sua estadia perfeita no coração da cidade. Conforto, qualidade e hospitalidade que fazem a diferença na
              sua viagem.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="border-orange-bg-orange-200 hover:bg-orange-50">
                <span className="text-primary">f</span>
              </Button>
              <Button variant="outline" size="icon" className="border-orange-bg-orange-200 hover:bg-orange-50">
                <span className="text-primary">📷</span>
              </Button>
              <Button variant="outline" size="icon" className="border-orange-bg-orange-200 hover:bg-orange-50">
                <span className="text-primary">🐦</span>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>Rua das Laranjeiras, 123</p>
                  <p>Centro - São Paulo, SP</p>
                  <p>CEP: 66666-666</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-sm text-gray-600">
                  <p>(11) 3333-7890</p>
                  <p>(11) 99222-5432</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm text-gray-600">contato@hotellaranja.com.br</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Serviços</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Wifi className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">Wi-Fi Gratuito</span>
              </div>
              <div className="flex items-center space-x-3">
                <Car className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">Estacionamento</span>
              </div>
              <div className="flex items-center space-x-3">
                <Coffee className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">Café da Manhã</span>
              </div>
              <div className="flex items-center space-x-3">
                <Utensils className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">Restaurante</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-primary text-sm">🏊</span>
                <span className="text-sm text-gray-600">Piscina Aquecida</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Links Úteis</h4>
            <div className="space-y-2">
              <a href="#rooms" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                Nossos Quartos
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                Política de Cancelamento
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-orange-200" />
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm">© 2025 Hotel Laranja. Todos os direitos reservados.</p>
              <p className="text-xs text-orange-bg-orange-200 mt-1">
                CNPJ: 12.345.678/0001-90 | Registro Embratur: 12.345.678.90-1
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Recepção 24h</span>
              </div>
              <div className="hidden md:block">|</div>
              <span className="text-orange-bg-orange-200">Desenvolvido para você 🧡</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}