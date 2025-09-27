"use client"

import {useState} from "react"
import {Header} from "@/components/header"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Calendar, Clock, Users, Trophy, Zap, Search} from "lucide-react"
import {fightData, enrichFightsWithAthletes, type EnrichedFight} from "@/lib/fight-data"

const statusColors = {
    confirmada: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
    pendente: "bg-amber-50 text-amber-700 border-amber-200 shadow-sm",
    cancelada: "bg-red-50 text-red-700 border-red-200 shadow-sm",
    concluída: "bg-blue-50 text-blue-700 border-blue-200 shadow-sm",
}

const statusLabels = {
    confirmada: "Confirmada",
    pendente: "Pendente",
    cancelada: "Cancelada",
    concluída: "Concluída",
}

const beltColors = {
    branca: "bg-white text-gray-800 border-gray-300 shadow-sm",
    cinza: "bg-gray-200 text-gray-800 border-gray-300 shadow-sm",
    amarela: "bg-yellow-400 text-gray-900 shadow-md",
    laranja: "bg-orange-400 text-white shadow-md",
    verde: "bg-green-500 text-white shadow-md",
    azul: "bg-blue-500 text-white shadow-md",
    roxa: "bg-purple-500 text-white shadow-md",
    marrom: "bg-amber-700 text-white shadow-md",
    preta: "bg-gray-900 text-white shadow-md",
    coral: "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white shadow-md",
    vermelha: "bg-red-600 text-white shadow-md",
}

export default function LutasPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState<string>("")

    const evento = fightData.eventos[0]
    const enrichedFights = enrichFightsWithAthletes(evento.lutas)
    const categories = ["all", ...Array.from(new Set(enrichedFights.map((luta) => luta.categoria)))]

    const filteredFights: EnrichedFight[] = enrichedFights.filter((luta) => {
        const matchesCategory = selectedCategory === "all" || luta.categoria === selectedCategory
        const matchesSearch =
            searchTerm === "" ||
            luta.atleta_a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            luta.atleta_b.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            luta.atleta_a.equipe.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            luta.atleta_b.equipe.nome.toLowerCase().includes(searchTerm.toLowerCase())

        return matchesCategory && matchesSearch
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            <Header/>

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Lista de{" "}
                            <span
                                className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Lutas</span>
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-muted-foreground mb-8">
                            <div
                                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                                <Calendar className="w-5 h-5 text-primary"/>
                                <span className="font-medium">
                                  {new Date(evento.data_evento).toLocaleDateString("pt-BR", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                  })}
                                </span>
                            </div>
                            <div
                                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                                <Users className="w-5 h-5 text-primary"/>
                                <span className="font-medium">{evento.lutas.length} lutas programadas</span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-md mx-auto mb-8">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                            <Input
                                type="text"
                                placeholder="Buscar por nome do atleta ou equipe..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-primary focus:ring-primary/20 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={`text-xs transition-all duration-200 ${
                                    selectedCategory === category
                                        ? "shadow-lg scale-105"
                                        : "hover:shadow-md hover:scale-102 bg-white/80 backdrop-blur-sm"
                                }`}
                            >
                                {category === "all" ? "Todas as Categorias" : category}
                            </Button>
                        ))}
                    </div>

                    <div
                        className="mb-12 p-8 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl border border-amber-200 shadow-lg backdrop-blur-sm">
                        <div className="text-center">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                                <Trophy className="w-8 h-8 text-amber-600"/>
                            </div>
                            <h3 className="text-2xl font-bold text-amber-700 mb-3 flex items-center justify-center gap-2">
                                <Zap className="w-6 h-6"/>
                                GRAPPLING PROFISSIONAL
                                <Zap className="w-6 h-6"/>
                            </h3>
                            <p className="text-amber-800 text-lg font-medium">
                                Pela primeira vez na Copa Magé! Premiação especial de{" "}
                                <span className="text-amber-700 font-bold">R$ 1.000</span> para o campeão.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fight Cards */}
            <section className="pb-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="space-y-8">
                        {filteredFights.map((luta, index) => (
                            <Card
                                key={luta.id_luta}
                                className={`overflow-hidden shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${
                                    luta.categoria === "Grappling Profissional"
                                        ? "ring-2 ring-amber-300/50 bg-gradient-to-r from-amber-50/30 to-yellow-50/30"
                                        : ""
                                }`}
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                <CardHeader
                                    className="pb-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CardTitle
                                                className="text-xl font-bold text-gray-900">{luta.categoria}</CardTitle>
                                            {luta.categoria === "Grappling Profissional" && (
                                                <Badge
                                                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-0 shadow-md">
                                                    💰 R$ 1.000
                                                </Badge>
                                            )}
                                        </div>
                                        <Badge
                                            className={`${statusColors[luta.status_luta as keyof typeof statusColors]} border font-medium`}
                                        >
                                            {statusLabels[luta.status_luta as keyof typeof statusLabels]}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full">
                                            <Clock className="w-4 h-4 text-primary"/>
                                            <span className="font-medium">{(luta as any).horario || "A definir"}</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                        {/* Atleta A */}
                                        <div
                                            className="flex items-center gap-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50">
                                            <div className="relative">
                                                <img
                                                    src={luta.atleta_a.foto || "/placeholder.svg"}
                                                    alt={luta.atleta_a.nome}
                                                    className="w-24 h-24 object-cover rounded-xl bg-muted shadow-lg ring-2 ring-white"
                                                />
                                                <div
                                                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-white text-xs font-bold">A</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-xl text-gray-900 mb-2">{luta.atleta_a.nome}</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            className={`${beltColors[luta.atleta_a.faixa as keyof typeof beltColors]} text-xs px-3 py-1 font-medium`}
                                                        >
                                                            Faixa {luta.atleta_a.faixa}
                                                        </Badge>
                                                        <span
                                                            className="text-sm font-medium text-gray-600">{luta.atleta_a.idade} anos</span>
                                                    </div>
                                                    <div
                                                        className="flex items-center gap-2 bg-white/80 px-2 py-1 rounded-lg">
                                                        <img
                                                            src={luta.atleta_a.equipe.logo || "/placeholder.svg"}
                                                            alt={luta.atleta_a.equipe.nome}
                                                            className="w-5 h-5 object-contain"
                                                        />
                                                        <span
                                                            className="text-sm font-medium text-gray-700">{luta.atleta_a.equipe.nome}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center py-4">
                                            <div className="relative">
                                                <div
                                                    className="text-4xl font-black text-transparent bg-gradient-to-r from-primary via-red-500 to-primary bg-clip-text tracking-wider animate-pulse">
                                                    VS
                                                </div>
                                                <div
                                                    className="absolute inset-0 text-4xl font-black text-primary/20 tracking-wider blur-sm">
                                                    VS
                                                </div>
                                            </div>
                                        </div>

                                        {/* Atleta B */}
                                        <div
                                            className="flex items-center gap-6 lg:flex-row-reverse p-4 rounded-2xl bg-gradient-to-l from-red-50 to-red-100/50 border border-red-200/50">
                                            <div className="relative">
                                                <img
                                                    src={luta.atleta_b.foto || "/placeholder.svg"}
                                                    alt={luta.atleta_b.nome}
                                                    className="w-24 h-24 object-cover rounded-xl bg-muted shadow-lg ring-2 ring-white"
                                                />
                                                <div
                                                    className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                                                    <span className="text-white text-xs font-bold">B</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 lg:text-right">
                                                <h4 className="font-bold text-xl text-gray-900 mb-2">{luta.atleta_b.nome}</h4>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 lg:justify-end">
                                                        <Badge
                                                            className={`${beltColors[luta.atleta_b.faixa as keyof typeof beltColors]} text-xs px-3 py-1 font-medium`}
                                                        >
                                                            Faixa {luta.atleta_b.faixa}
                                                        </Badge>
                                                        <span
                                                            className="text-sm font-medium text-gray-600">{luta.atleta_b.idade} anos</span>
                                                    </div>
                                                    <div
                                                        className="flex items-center gap-2 lg:justify-end bg-white/80 px-2 py-1 rounded-lg">
                                                        <img
                                                            src={luta.atleta_b.equipe.logo || "/placeholder.svg"}
                                                            alt={luta.atleta_b.equipe.nome}
                                                            className="w-5 h-5 object-contain"
                                                        />
                                                        <span
                                                            className="text-sm font-medium text-gray-700">{luta.atleta_b.equipe.nome}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredFights.length === 0 && (
                        <div className="text-center py-12">
                            <div
                                className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-12 h-12 text-gray-400"/>
                            </div>
                            <p className="text-muted-foreground text-lg">
                                {searchTerm
                                    ? "Nenhuma luta encontrada para esta busca."
                                    : "Nenhuma luta encontrada para esta categoria."}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-foreground text-background py-8 px-4">
                <div className="container mx-auto text-center">
                    <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">6ª Copa Magé de Jiu-Jitsu</h3>
                        <p className="text-background/80">19 de outubro de 2025 • Magé-RJ</p>
                    </div>

                    <div className="flex justify-center gap-6 mb-6">
                        <a
                            href="https://wa.me/5521988708875"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-background/80 hover:text-background transition-colors"
                        >
                            WhatsApp
                        </a>
                        <a
                            href="https://www.instagram.com/copamagejjofc/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-background/80 hover:text-background transition-colors"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.instagram.com/ezequiel.fariasjj/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-background/80 hover:text-background transition-colors"
                        >
                            Organizador
                        </a>
                    </div>

                    <div className="border-t border-background/20 pt-4">
                        <p className="text-background/60 text-sm">
                            &copy {new Date().getFullYear()} Copa Magé de Jiu-Jitsu. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
