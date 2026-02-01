"use client"

import { useMemo, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { isRegistrationStillOpen as isRegistrationStillOpenUtil, cn } from "@/lib/utils"
import { WHATSAPP_BASE_URL, EVENT_INFO } from "@/lib/constants"

interface HeaderProps {
    onOpenRegistration?: () => void
}

export function Header({ onOpenRegistration }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const isRegistrationStillOpen = useMemo(() => isRegistrationStillOpenUtil(), [])

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

    const handleRegistrationClick = () => {
        if (!isRegistrationStillOpen) return

        if (onOpenRegistration) {
            onOpenRegistration()
            setIsMenuOpen(false)
        } else {
            window.open(
                `${WHATSAPP_BASE_URL}?text=Olá! Gostaria de me inscrever na ${EVENT_INFO.name}`,
                "_blank",
            )
        }
    }


    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
                    <div className="w-10 h-10 rounded-sm overflow-hidden flex items-center justify-center">
                        <img
                            src="/image/hazaq-logo.png"
                            alt="7ª Copa Magé"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl uppercase tracking-tighter text-primary">7ª Copa Magé</h1>
                        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Jiu-Jitsu Championship</p>
                    </div>
                </Link>


                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">

                    <Link
                        href="cronograma"
                        className={`transition-colors ${usePathname() === "/cronograma" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                            }`}
                    >
                        Cronograma
                    </Link>
                    <Link href="/#sobre" onClick={() => scrollToSection("sobre")} className="text-foreground hover:text-primary transition-colors">
                        Sobre
                    </Link>
                    <Link href="/#patrocinadores" onClick={() => scrollToSection("patrocinadores")} className="text-foreground hover:text-primary transition-colors">
                        Patrocinadores
                    </Link>
                    <Link href="/#destaques" onClick={() => scrollToSection("destaques")} className="text-foreground hover:text-primary transition-colors">
                        Destaques
                    </Link>
                    <Link href="/#ingressos" onClick={() => scrollToSection("ingressos")} className="text-foreground hover:text-primary transition-colors">
                        Ingressos
                    </Link>
                    <Link href="/#localizacao" onClick={() => scrollToSection("localizacao")} className="text-foreground hover:text-primary transition-colors">
                        Localização
                    </Link>
                    <Link href="/#contato" onClick={() => scrollToSection("contato")} className="text-foreground hover:text-primary transition-colors">
                        Contato
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {isRegistrationStillOpen ? (
                        <Link
                            href={onOpenRegistration ? "#" : `${WHATSAPP_BASE_URL}?text=Olá! Gostaria de me inscrever na ${EVENT_INFO.name}`}
                            target={onOpenRegistration ? undefined : "_blank"}
                            rel={onOpenRegistration ? undefined : "noopener noreferrer"}
                            onClick={(e) => {
                                if (onOpenRegistration) {
                                    e.preventDefault()
                                    handleRegistrationClick()
                                }
                            }}
                            aria-label="Abrir inscrição via WhatsApp"
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "hidden sm:inline-flex bg-primary text-primary-foreground font-bold uppercase tracking-wider hover:bg-primary/90 rounded-none px-6 active:scale-95 transition-all"
                            )}
                        >
                            Inscreva-se
                        </Link>
                    ) : (
                        <span
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "hidden sm:inline-flex rounded-none opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
                            )}
                            title="Inscrições encerradas"
                        >
                            Encerrado
                        </span>
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
                            href="/cronograma"
                            className={`text-left transition-colors ${pathname === "/cronograma" ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cronograma
                        </Link>
                        <Link
                            href="/#sobre"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("sobre")
                            }}
                            className="text-left text-foreground hover:text-primary transition-colors"
                        >
                            Sobre
                        </Link>
                        <Link
                            href="/#patrocinadores"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("patrocinadores")
                            }}
                            className="text-left text-foreground hover:text-primary transition-colors"
                        >
                            Patrocinadores
                        </Link>
                        <Link
                            href="/#destaques"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("destaques")
                            }}
                            className="text-left text-foreground hover:text-primary transition-colors"
                        >
                            Destaques
                        </Link>
                        <Link
                            href="/#ingressos"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("ingressos")
                            }}
                            className="text-left text-foreground hover:text-primary transition-colors"
                        >
                            Ingressos
                        </Link>
                        <Link
                            href="/#localizacao"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("localizacao")
                            }}
                            className="text-left text-foreground hover:text-primary transition-colors"
                        >
                            Localização
                        </Link>
                        <Link
                            href="/#contato"
                            onClick={(e) => {
                                e.preventDefault()
                                scrollToSection("contato")
                            }}
                            className="text-left text-foreground hover:text-primary transition-colors"
                        >
                            Contato
                        </Link>

                        {isRegistrationStillOpen ? (
                            <Link
                                href={onOpenRegistration ? "#" : `${WHATSAPP_BASE_URL}?text=Olá! Gostaria de me inscrever na ${EVENT_INFO.name}`}
                                target={onOpenRegistration ? undefined : "_blank"}
                                rel={onOpenRegistration ? undefined : "noopener noreferrer"}
                                onClick={(e) => {
                                    if (onOpenRegistration) {
                                        e.preventDefault()
                                        handleRegistrationClick()
                                    }
                                }}
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "w-full sm:hidden font-bold uppercase tracking-wider"
                                )}
                            >
                                Inscreva-se
                            </Link>
                        ) : (
                            <span
                                className={cn(
                                    buttonVariants({ variant: "default" }),
                                    "w-full sm:hidden opacity-50 cursor-not-allowed bg-muted text-muted-foreground font-bold uppercase tracking-wider text-center py-2"
                                )}
                                title="Inscrições encerradas"
                            >
                                Inscrições encerradas
                            </span>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}
