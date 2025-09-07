"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const [fullName, setFullName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [belt, setBelt] = useState("")
  const [team, setTeam] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (fullName && birthDate && belt && team) {
      const message = `Olá! Gostaria de me inscrever na 6ª Copa Magé de Jiu-Jitsu.%0A%0ANome Completo: ${encodeURIComponent(fullName)}%0AData de Nascimento: ${encodeURIComponent(birthDate)}%0AFaixa: ${encodeURIComponent(belt)}%0AEquipe: ${encodeURIComponent(team)}`
      window.open(`https://wa.me/5521988708875?text=${message}`, "_blank")
      onClose()
      setFullName("")
      setBirthDate("")
      setBelt("")
      setTeam("")
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inscrição</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nome Completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Digite seu nome completo"
                required
              />
            </div>

            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="belt">Faixa</Label>
              <Select value={belt} onValueChange={setBelt} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua faixa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="branca">Branca</SelectItem>
                  <SelectItem value="cinza">Cinza</SelectItem>
                  <SelectItem value="amarela">Amarela</SelectItem>
                  <SelectItem value="laranja">Laranja</SelectItem>
                  <SelectItem value="verde">Verde</SelectItem>
                  <SelectItem value="azul">Azul</SelectItem>
                  <SelectItem value="roxa">Roxa</SelectItem>
                  <SelectItem value="marrom">Marrom</SelectItem>
                  <SelectItem value="preta">Preta</SelectItem>
                  <SelectItem value="coral">Coral</SelectItem>
                  <SelectItem value="vermelha">Vermelha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="team">Equipe</Label>
              <Input
                id="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Digite o nome da sua equipe"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Continuar no WhatsApp
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
