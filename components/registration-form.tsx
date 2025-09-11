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

function formatDateBR(isoDate: string) {
  // isoDate vem como "yyyy-mm-dd" do <input type="date" />
  if (!isoDate) return ""
  const [yyyy, mm, dd] = isoDate.split("-")
  return `${dd}/${mm}/${yyyy}`
}

export function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const [fullName, setFullName] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [belt, setBelt] = useState("")
  const [team, setTeam] = useState("")
  const [weight, setWeight] = useState("") // Novo: Peso (kg)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação simples (Select do shadcn não respeita 'required')
    if (fullName && birthDate && belt && team && weight) {
      const birthDateBR = formatDateBR(birthDate)

      const message =
        `Olá! Gostaria de me inscrever na 6ª Copa Magé de Jiu-Jitsu.` +
        `%0A%0A` +
        `Nome Completo: ${encodeURIComponent(fullName)}` +
        `%0AData de Nascimento: ${encodeURIComponent(birthDateBR)}` +
        `%0AFaixa: ${encodeURIComponent(belt)}` +
        `%0AEquipe: ${encodeURIComponent(team)}` +
        `%0APeso: ${encodeURIComponent(`${weight} kg`)}`

      window.open(`https://wa.me/5521988708875?text=${message}`, "_blank")

      onClose()
      setFullName("")
      setBirthDate("")
      setBelt("")
      setTeam("")
      setWeight("")
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
                  <SelectItem value="BRANCA">Branca</SelectItem>
                  <SelectItem value="CINZA">Cinza</SelectItem>
                  <SelectItem value="AMARELA">Amarela</SelectItem>
                  <SelectItem value="LARANJA">Laranja</SelectItem>
                  <SelectItem value="VERDE">Verde</SelectItem>
                  <SelectItem value="AZUL">Azul</SelectItem>
                  <SelectItem value="ROXA">Roxa</SelectItem>
                  <SelectItem value="MARROM">Marrom</SelectItem>
                  <SelectItem value="PRETA">Preta</SelectItem>
                  <SelectItem value="CORAL">Coral</SelectItem>
                  <SelectItem value="VERMELHA">Vermelha</SelectItem>
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

            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="10"
                max="200"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex.: 75.5"
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
