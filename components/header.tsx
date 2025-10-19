"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const isRegistrationStillOpen = useMemo(() => {
        const now = new Date()
        const deadline = new Date("2025-09-25T23:59:59-03:00")
        return now <= deadline
    }, [])

    const scrollToSection = (id: string) => {
        if (pathname !== "/") {
            window.location.href = `/#${id}`
            return
        }
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: "smooth" })
            setIsMenuOpen(false)
        }
    }

    const openWhatsApp = () => {
        if (!isRegistrationStillOpen) return
        window.open(
            "https://wa.me/5521988708875?text=Olá! Gostaria de me inscrever na 6ª Copa Magé de Jiu-Jitsu",
            "_blank",
        )
    }


    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm overflow-hidden">
                        <img
                            src="/image/hazaq-logo.png"
                            alt="Hazaq Jiu Jitsu - Professor Ezequiel"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Copa Magé</h1>
                        <p className="text-sm text-muted-foreground">Jiu-Jitsu 2025</p>
                    </div>
                </Link>


                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="lutas"
                        className={`transition-colors ${usePathname() === "/lutas" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                            }`}
                    >
                        Lutas
                    </Link>
                    <Link
                        href="cronograma"
                        className={`transition-colors ${usePathname() === "/cronograma" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                        }`}
                    >
                        Cronograma
                    </Link>
                    <button onClick={() => scrollToSection("patrocinadores")} className="text-foreground hover:text-primary transition-colors">
                        Patrocinadores
                    </button>
                    <button onClick={() => scrollToSection("sobre")} className="text-foreground hover:text-primary transition-colors">
                        Sobre
                    </button>
                    <button onClick={() => scrollToSection("destaques")} className="text-foreground hover:text-primary transition-colors">
                        Destaques
                    </button>
                    <button onClick={() => scrollToSection("ingressos")} className="text-foreground hover:text-primary transition-colors">
                        Ingressos
                    </button>
                    <button onClick={() => scrollToSection("localizacao")} className="text-foreground hover:text-primary transition-colors">
                        Localização
                    </button>
                    <button onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors">
                        Contato
                    </button>
                </nav>

                <div className="flex items-center gap-4">
                    {isRegistrationStillOpen ? (
                        <Button onClick={openWhatsApp} className="hidden sm:inline-flex">
                            Inscreva-se
                        </Button>
                    ) : (
                        <Button disabled className="hidden sm:inline-flex" aria-disabled title="Inscrições encerradas">
                            Inscrições encerradas
                        </Button>
                    )}

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-background border-t border-border">
                    <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <Link
                            href="/lutas"
                            className={`text-left transition-colors ${pathname === "/lutas" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Lutas
                        </Link>
                        <Link
                            href="/cronograma"
                            className={`text-left transition-colors ${pathname === "/cronograma" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cronograma
                        </Link>
                        <button onClick={() => scrollToSection("patrocinadores")} className="text-left text-foreground hover:text-primary transition-colors">
                            Patrocinadores
                        </button>
                        <button onClick={() => scrollToSection("sobre")} className="text-left text-foreground hover:text-primary transition-colors">
                            Sobre
                        </button>
                        <button onClick={() => scrollToSection("destaques")} className="text-left text-foreground hover:text-primary transition-colors">
                            Destaques
                        </button>
                        <button onClick={() => scrollToSection("ingressos")} className="text-left text-foreground hover:text-primary transition-colors">
                            Ingressos
                        </button>
                        <button onClick={() => scrollToSection("localizacao")} className="text-left text-foreground hover:text-primary transition-colors">
                            Localização
                        </button>
                        <button onClick={() => scrollToSection("contato")} className="text-left text-foreground hover:text-primary transition-colors">
                            Contato
                        </button>

                        {isRegistrationStillOpen ? (
                            <Button onClick={openWhatsApp} className="w-full sm:hidden">
                                Inscreva-se
                            </Button>
                        ) : (
                            <Button disabled aria-disabled className="w-full sm:hidden" title="Inscrições encerradas">
                                Inscrições encerradas
                            </Button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}
