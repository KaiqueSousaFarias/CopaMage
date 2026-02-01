"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EVENT_INFO, WHATSAPP_BASE_URL } from "@/lib/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  birthDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Data inválida (DD/MM/AAAA)"),
  weight: z.string().min(1, "Peso é obrigatório"),
  belt: z.string().min(1, "Graduação é obrigatória"),
  team: z.string().min(1, "Equipe é obrigatória"),
})

interface RegistrationFormProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationForm({ isOpen, onClose }: RegistrationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      weight: "",
      belt: "",
      team: "",
    },
  })

  function formatBirthDate(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})\d+?$/, "$1")
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const message =
      `Olá! Gostaria de me inscrever na ${EVENT_INFO.name}.` +
      `%0A%0A` +
      `Nome Completo: ${encodeURIComponent(values.fullName)}` +
      `%0AData de Nascimento: ${encodeURIComponent(values.birthDate)}` +
      `%0AFaixa: ${encodeURIComponent(values.belt)}` +
      `%0AEquipe: ${encodeURIComponent(values.team)}` +
      `%0APeso: ${encodeURIComponent(`${values.weight} kg`)}`

    window.open(`${WHATSAPP_BASE_URL}?text=${message}`, "_blank")

    form.reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md bg-[#0f0f0f] border-2 border-primary/30 rounded-none shadow-[0_0_80px_rgba(212,175,55,0.15)] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 -rotate-45 translate-x-8 -translate-y-8 pointer-events-none"></div>

        <CardHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-6">
          <div className="space-y-1">
            <CardTitle className="text-3xl font-black italic uppercase tracking-tighter leading-none">
              Inscrição <span className="text-primary">Elite</span>
            </CardTitle>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary/60">
              {EVENT_INFO.name}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-primary/20 hover:text-primary transition-all rounded-none active:scale-90"
          >
            <X size={24} />
          </Button>
        </CardHeader>

        <CardContent className="pt-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">
                      Nome Completo
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SEU NOME"
                        className="bg-[#141414] border-white/5 rounded-none h-14 focus:border-primary/50 uppercase font-black tracking-tight text-lg placeholder:opacity-20 transition-all focus:ring-1 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">
                        Nascimento
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="DD/MM/AAAA"
                          maxLength={10}
                          className="bg-[#141414] border-white/5 rounded-none h-14 focus:border-primary/50 uppercase font-black tracking-tight text-lg placeholder:opacity-20 transition-all focus:ring-1 focus:ring-primary/20"
                          {...field}
                          onChange={(e) => {
                            field.onChange(formatBirthDate(e.target.value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">
                        Peso (kg)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="decimal"
                          step="0.1"
                          placeholder="EX: 75.5"
                          className="bg-[#141414] border-white/5 rounded-none h-14 focus:border-primary/50 uppercase font-black tracking-tight text-lg placeholder:opacity-20 transition-all focus:ring-1 focus:ring-primary/20"
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
                name="belt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">
                      Sua Graduação
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#141414] border-white/5 rounded-none h-14 focus:border-primary/50 uppercase font-black tracking-widest transition-all focus:ring-1 focus:ring-primary/20">
                          <SelectValue placeholder="SELECIONE A FAIXA" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#0f0f0f] border-primary/20 rounded-none z-[120]">
                        {[
                          "BRANCA",
                          "CINZA",
                          "AMARELA",
                          "LARANJA",
                          "VERDE",
                          "AZUL",
                          "ROXA",
                          "MARROM",
                          "PRETA",
                        ].map((b) => (
                          <SelectItem
                            key={b}
                            value={b}
                            className="focus:bg-primary/20 focus:text-primary font-black uppercase tracking-widest text-xs py-3"
                          >
                            {b}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground ml-1">
                      Equipe / Academia
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SUA EQUIPE"
                        className="bg-[#141414] border-white/5 rounded-none h-14 focus:border-primary/50 uppercase font-black tracking-tight text-lg placeholder:opacity-20 transition-all focus:ring-1 focus:ring-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase h-16 tracking-[0.2em] rounded-none shadow-[0_0_40px_rgba(212,175,55,0.1)] active:scale-[0.98] transition-all text-lg group"
              >
                <span className="group-hover:translate-x-1 transition-transform inline-block mr-2">
                  🥊
                </span>
                CONTINUAR NO WHATSAPP
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
