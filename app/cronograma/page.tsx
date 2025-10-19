"use client"

import React, {useMemo, useRef, useState} from "react"
import {Header} from "@/components/header"
import {Card, CardContent} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Calendar, Clock, Search, Navigation} from "lucide-react"
import data from "@/data/timeline.json"

type TLItem = { time: string; event: string }
const TIMELINE = (data as { timeline: TLItem[] }).timeline

// === Config do evento ===
const EVENT_TZ = "America/Sao_Paulo"
const EVENT_DATE_YMD = {y: 2025, m: 10, d: 19} // 19/10/2025

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
    return {y, m, d}
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
        cont.scrollTo({top: el.offsetTop - cont.offsetTop - paddingTop, behavior})
    }

    const setLiRef = (el: HTMLLIElement | null, i: number) => {
        if (el) liRefs.current[i] = el
    }

    return (
        <div className="min-h-screen bg-background">
            <Header/>

            {/* Hero */}
            <section className="pt-24 pb-4 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">
                            <span className="text-primary">Cronograma</span> do Evento
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-muted-foreground">
                            <div className="inline-flex items-center gap-2 bg-muted/40 rounded-full px-3 py-1">
                                <Calendar className="h-4 w-4 text-primary"/>
                                <span className="text-sm font-medium">19/10/2025 • Magé–RJ</span>
                            </div>
                            <div className="inline-flex items-center gap-2 bg-muted/40 rounded-full px-3 py-1">
                                <Clock className="h-4 w-4 text-primary"/>
                                <span className="text-sm font-medium">{filtered.length} horários previstos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Busca + ação */}
            <section className="px-4 pb-3">
                <div className="container mx-auto max-w-5xl">
                    <Card className="border-0 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
                        <CardContent className="py-4">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div className="relative w-full md:max-w-xl">
                                    <Input
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Buscar por ‘Azul’, ‘11 anos’, ‘Preta’, horário…"
                                        className="pl-10"
                                    />
                                    <Search
                                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                </div>

                                <Button variant="outline" size="sm" onClick={() => scrollToAgora()}
                                        disabled={nextIdx === null}>
                                    <Navigation className="h-4 w-4 mr-2"/>
                                    Ir para AGORA
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Timeline */}
            <section className="px-4 pb-16">
                <div className="container mx-auto max-w-4xl">
                    <div ref={containerRef} className="relative max-h-[70vh] overflow-auto rounded-lg border bg-card">
                        <ul className="relative space-y-6 p-4">
                            {/* trilho vertical */}
                            <div
                                className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border"/>
                            {filtered.map((item, i) => {
                                const st = statusFor(item.idx)
                                const isAgora = dayState === "same" && nextIdx !== null && item.idx === nextIdx
                                const isPast = st === "concluído"

                                return (
                                    <li key={`${item.time}-${i}`} ref={(el) => setLiRef(el, i)}
                                        className="relative flex items-start">
                                        {/* ponto */}
                                        <div
                                            className={[
                                                "z-10 mt-1 h-3 w-3 rounded-full border-2",
                                                isAgora
                                                    ? "bg-destructive border-destructive"
                                                    : isPast
                                                        ? "bg-muted border-muted-foreground/30"
                                                        : "bg-background border-border",
                                                "relative left-4 md:left-1/2 -translate-x-1/2",
                                            ].join(" ")}
                                        />

                                        {/* cartão */}
                                        <div className="flex-1 grid md:grid-cols-2 md:gap-6 w-full">
                                            <div className="md:text-right pr-6 md:pr-10 md:order-1">
                                                <div
                                                    className={["inline-flex items-center gap-2 text-sm", isAgora ? "text-destructive" : "text-muted-foreground"].join(" ")}>
                                                    <Clock className="h-4 w-4"/>
                                                    <span className="font-semibold">{item.time}</span>
                                                    {isAgora && <Badge variant="destructive">AGORA</Badge>}
                                                </div>
                                            </div>

                                            <div className="md:order-2">
                                                <Card
                                                    className={[
                                                        "border-0 shadow-[0_6px_24px_rgba(0,0,0,0.06)] relative overflow-hidden",
                                                        isPast && "opacity-75",
                                                        isAgora && "ring-2 ring-destructive/60",
                                                    ].join(" ")}
                                                >
                                                    {isAgora && <div
                                                        className="pointer-events-none absolute inset-0 bg-destructive/10"/>}
                                                    {isAgora && <div
                                                        className="absolute left-0 top-0 bottom-0 w-1 bg-destructive"/>}
                                                    <CardContent className="py-4">
                                                        <p className={["font-medium", isAgora ? "text-destructive" : ""].join(" ")}>{item.event}</p>
                                                        <p className="text-xs text-muted-foreground mt-1">Status: {st}</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
