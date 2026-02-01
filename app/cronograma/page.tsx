"use client"

import React, { useMemo, useRef, useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Search, Navigation, ChevronRight } from "lucide-react"
import Link from "next/link"
import data from "@/data/timeline.json"
import { EVENT_INFO } from "@/lib/constants"
import { cn } from "@/lib/utils"

type TLItem = { time: string; event: string }
const TIMELINE = (data as { timeline: TLItem[] }).timeline

// === Config do evento ===
const EVENT_TZ = "America/Sao_Paulo"
const EVENT_DATE_YMD = { y: 2026, m: 4, d: 21 } // 21/04/2026

// --- utils horário/data ---
const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number)
    return h * 60 + m
}

function nowInSaoPauloMinutes() {
    const parts = new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: EVENT_TZ,
    }).formatToParts(new Date())
    const hh = Number(parts.find((p) => p.type === "hour")?.value ?? "0")
    const mm = Number(parts.find((p) => p.type === "minute")?.value ?? "0")
    return hh * 60 + mm
}

function todayYMDInTZ() {
    const parts = new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: EVENT_TZ,
    }).formatToParts(new Date())
    const d = Number(parts.find((p) => p.type === "day")?.value ?? "0")
    const m = Number(parts.find((p) => p.type === "month")?.value ?? "0")
    const y = Number(parts.find((p) => p.type === "year")?.value ?? "0")
    return { y, m, d }
}

function cmpDateTZ() {
    const t = todayYMDInTZ()
    const toNum = (o: { y: number; m: number; d: number }) => o.y * 10000 + o.m * 100 + o.d
    const today = toNum(t)
    const event = toNum(EVENT_DATE_YMD)
    if (today < event) return "before" as const
    if (today > event) return "after" as const
    return "same" as const
}

export default function CronogramaTimeline() {
    const [query, setQuery] = useState("")
    const containerRef = useRef<HTMLDivElement | null>(null)
    const liRefs = useRef<HTMLLIElement[]>([])

    const indexed = useMemo(
        () =>
            TIMELINE.map((item, i) => ({
                ...item,
                minutes: toMinutes(item.time),
                idx: i,
            })),
        []
    )

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return indexed
        return indexed.filter((i) => i.event.toLowerCase().includes(q) || i.time.includes(q))
    }, [indexed, query])

    // Determina o "estado do dia" em relação ao evento
    const dayState = cmpDateTZ()

    // Próximo item a acontecer (somente se for o dia do evento)
    const nextIdx: number | null = useMemo(() => {
        if (dayState !== "same") return null
        const now = nowInSaoPauloMinutes()
        const futureIdx = indexed.findIndex((i) => i.minutes > now)
        return futureIdx === -1 ? null : futureIdx
    }, [indexed, dayState])

    // Status por item:
    // - before: tudo "aguardando início"
    // - same:   < nextIdx = "concluído", === nextIdx = "pendente" (AGORA), > nextIdx = "aguardando início"
    // - after:  tudo "concluído"
    const statusFor = (itemIdx: number) => {
        if (dayState === "before") return "aguardando início"
        if (dayState === "after") return "concluído"
        if (nextIdx === null) return "concluído" // fim do dia
        if (itemIdx < nextIdx) return "concluído"
        if (itemIdx === nextIdx) return "pendente"
        return "aguardando início"
    }

    const scrollToAgora = (behavior: ScrollBehavior = "smooth") => {
        if (nextIdx === null) return
        const filteredIdx = filtered.findIndex((f) => f.idx === nextIdx)
        if (filteredIdx === -1) return
        const el = liRefs.current[filteredIdx]
        const cont = containerRef.current
        if (!el || !cont) return
        const paddingTop = 16
        cont.scrollTo({ top: el.offsetTop - cont.offsetTop - paddingTop, behavior })
    }

    const setLiRef = (el: HTMLLIElement | null, i: number) => {
        if (el) liRefs.current[i] = el
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white font-sport selection:bg-primary selection:text-black">
            <Header />

            {/* Hero Section - Impactful */}
            <section className="relative pt-40 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]"></div>
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                </div>

                <div className="container relative z-10 mx-auto max-w-5xl">
                    <div className="text-center">
                        <div className="inline-block px-4 py-1 border border-primary/40 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
                            Horários das Chaves
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase italic leading-none">
                            CRONOGRAMA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">PROVISÓRIO</span>
                        </h1>
                        <p className="text-muted-foreground italic text-sm">O cronograma é provisório e pode sofrer alterações.</p>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground uppercase text-xs font-bold tracking-[0.2em]">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>{EVENT_INFO.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{filtered.length} Atividades</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alerta de Chegada */}
            <section className="px-4 pb-8">
                <div className="container mx-auto max-w-2xl">
                    <div className="bg-[#141414] border-l-4 border-primary p-6 flex items-center gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <Clock className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <p className="font-black text-xl uppercase italic tracking-tight">CHEGUE CEDO</p>
                            <p className="text-muted-foreground italic text-sm">Compareça com 30 minutos de antecedência. O cronograma pode sofrer adiantamentos.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Busca e Controle */}
            <section className="px-4 pb-12">
                <div className="container mx-auto max-w-2xl">
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
                            <Input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="FILTRAR POR FAIXA OU CATEGORIA..."
                                className="bg-[#141414] border-white/10 pl-12 h-14 text-lg font-bold uppercase tracking-widest focus:border-primary rounded-none transition-all"
                            />
                        </div>
                        <Link
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToAgora()
                            }}
                            className={cn(
                                buttonVariants({ variant: "outline", size: "lg" }),
                                "border-white/10 hover:border-primary hover:bg-primary/10 rounded-none uppercase font-black tracking-widest h-14 w-full flex items-center justify-center",
                                nextIdx === null && "opacity-50 cursor-not-allowed pointer-events-none"
                            )}
                        >
                            <Navigation className="h-5 w-5 mr-3" />
                            O que está acontecendo AGORA?
                        </Link>
                    </div>
                </div>
            </section>

            {/* Timeline List */}
            <section className="px-4 pb-32">
                <div className="container mx-auto max-w-3xl">
                    <div ref={containerRef} className="relative space-y-4">
                        {filtered.map((item, i) => {
                            const st = statusFor(item.idx)
                            const isAgora = dayState === "same" && nextIdx !== null && item.idx === nextIdx
                            const isPast = st === "concluído"

                            return (
                                <div key={`${item.time}-${i}`} ref={(el) => setLiRef(el as any, i)} className="group">
                                    <div className={`
                                        flex items-center gap-6 p-6 transition-all duration-300
                                        border ${isAgora ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-[#141414] skew-x-[-2deg]'}
                                        ${isPast ? 'opacity-40' : ''}
                                    `}>
                                        <div className="shrink-0 text-center w-24">
                                            <p className={`text-2xl font-black italic leading-none ${isAgora ? 'text-primary' : 'text-white'}`}>{item.time}</p>
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">Status</p>
                                        </div>

                                        <div className="w-px h-12 bg-white/10"></div>

                                        <div className="flex-1">
                                            <h3 className={`text-xl font-bold uppercase italic tracking-tight ${isAgora ? 'text-primary' : 'text-white'}`}>
                                                {item.event}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                {isAgora ? (
                                                    <Badge className="bg-primary text-black font-black animate-pulse rounded-none">EM ANDAMENTO</Badge>
                                                ) : (
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{st}</span>
                                                )}
                                            </div>
                                        </div>

                                        {isAgora && <ChevronRight className="text-primary h-8 w-8 animate-bounce-x" />}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
