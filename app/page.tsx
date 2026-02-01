"use client"

import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Countdown } from "@/components/countdown"
import { RegistrationForm } from "@/components/registration-form"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Award, Users, MapPin, Phone, Mail, Instagram, Swords } from "lucide-react"
import sponsors from "@/data/sponsors.json"
import Link from "next/link";
import { WHATSAPP_BASE_URL, EVENT_INFO } from "@/lib/constants"
import { isRegistrationStillOpen as isRegistrationStillOpenUtil, cn } from "@/lib/utils"

export default function HomePage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const isRegistrationStillOpen = useMemo(() => isRegistrationStillOpenUtil(), [])

  const tryOpenRegistration = () => {
    if (!isRegistrationStillOpen) return
    setIsRegistrationOpen(true)
  }

  const openWhatsAppSupport = () => {
    window.open(
      `${WHATSAPP_BASE_URL}?text=Olá! Preciso de suporte.`,
      "_blank"
    )
  }

  const [eventStarted, setEventStarted] = useState(false)
  useEffect(() => {
    const target = new Date("2026-04-21T00:00:00-03:00").getTime()
    const tick = () => setEventStarted(Date.now() >= target)
    tick()
    const id = window.setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sport selection:bg-primary selection:text-black overflow-x-hidden">
      <Header onOpenRegistration={tryOpenRegistration} />

      {/* Hero Section - Cinematic Impact */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/jiu_jitsu_hero_bg_1769555760001.png"
            alt="Jiu-Jitsu Arena"
            className="w-full h-full object-cover opacity-60 scale-105 animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <div className="ai-notice">Imagens geradas por I.A</div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0f0f]/50 to-[#0f0f0f]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-transparent to-[#0f0f0f] opacity-80"></div>

          {/* Spark Overlays (Simulated with div) */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping"></div>
            <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-secondary rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-primary rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="container relative z-10 mx-auto text-center">
          <div className="inline-block px-4 py-1 border border-primary/40 bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6 animate-fade-in">
            O Maior Evento da Região
          </div>

          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter uppercase italic leading-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="block text-white">7ª COPA MAGÉ</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">DE JIU-JITSU</span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4">
              <span className="text-3xl">📅</span>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Data do Evento</p>
                <p className="text-xl font-bold uppercase">21 de Abril (Feriado)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-6 py-4">
              <span className="text-3xl">📍</span>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Local da Arena</p>
                <p className="text-xl font-bold uppercase">Poliesportivo de Mauá</p>
              </div>
            </div>
          </div>

          <div className="mb-14 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {!eventStarted && <Countdown />}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {isRegistrationStillOpen ? (
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  tryOpenRegistration()
                }}
                aria-label="Abrir formulário de inscrição"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "bg-primary hover:bg-primary/90 text-black text-xl font-black px-12 py-8 uppercase tracking-widest rounded-none shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all hover:scale-105 active:scale-95"
                )}
              >
                Inscreva-se Agora
              </Link>
            ) : (
              <span
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "rounded-none opacity-50 px-12 py-8 text-xl uppercase font-black cursor-not-allowed bg-muted text-muted-foreground"
                )}
              >
                Inscrições Encerradas
              </span>
            )}
            <Link
              href="#sobre"
              aria-label="Ver detalhes do evento"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/20 hover:border-primary text-white text-xl font-bold px-12 py-8 uppercase rounded-none transition-all hover:bg-white/5 active:scale-95"
              )}
            >
              Ver Detalhes
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Evento - Grid de Informações */}
      <section id="sobre" className="relative py-24 px-4 bg-[#0a0a0a] overflow-hidden">
        {/* Texture Overlay */}
        <img src="/assets/grunge_concrete_texture_1769555788946.png" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay pointer-events-none" />

        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase italic tracking-tighter">
            Informações do <span className="text-primary italic">Combate</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Categorias", val: "Absoluto, Peso, Kids", icon: <Trophy className="w-10 h-10 text-primary" /> },
              { label: "Premiação", val: "Cinturões e Medalhas", icon: <Award className="w-10 h-10 text-primary" /> },
              { label: "Público", val: "Todos", icon: <Users className="w-10 h-10 text-primary" /> },
              { label: "Início", val: "Em breve", icon: <MapPin className="w-10 h-10 text-primary" /> }
            ].map((item, i) => (
              <div key={i} className="group relative bg-[#141414] p-8 border border-white/5 hover:border-primary/50 transition-all">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-black mb-2">{item.label}</h3>
                <p className="text-2xl font-bold uppercase">{item.val}</p>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patrocinadores - Grid Moderno */}
      <section id="patrocinadores" className="py-24 px-4 bg-[#0f0f0f]">
        <div className="container mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 uppercase italic tracking-tighter">Patrocinadores de <span className="text-primary">Elite</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {sponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Patrocinador: ${sponsor.name}`}
                className="group relative bg-[#1a1a1a] border border-white/5 p-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 hover:border-primary/50 hover:bg-white/5 active:scale-95"
              >
                <img src={sponsor.logo || "/placeholder.svg"} alt={sponsor.name} className="max-h-16 object-contain" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Premiação - Arena Style */}
      <section id="destaques" className="py-24 px-4 bg-[#0f0f0f]">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <img src="/assets/jiu_jitsu_belt_gold_1769555775547.png" alt="Cinturão Campeão" className="relative z-10 w-full rounded-none border border-primary/20 shadow-2xl hover:scale-[1.02] transition-transform" />
              <div className="ai-notice z-20">Imagens meramente ilustrativas</div>
              <div className="absolute top-4 right-4 z-20 bg-primary text-black font-black uppercase tracking-tighter text-2xl px-6 py-2">
                🥇 Cinturão
              </div>
            </div>

            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 block leading-none">
                PRÊMIO EM <span className="text-primary">DINHEIRO</span> EM TODAS CATEGORIAS
              </h2>
              <div className="space-y-6">
                <div className="bg-[#141414] border-l-4 border-primary p-6">
                  <h4 className="text-primary font-black uppercase text-xl mb-2 italic tracking-widest">Bônus de Elite</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/10 p-4">
                      <p className="text-primary text-3xl font-black tracking-tighter">R$ 100</p>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">+ de 5 Inscritos</p>
                    </div>
                    <div className="border border-white/10 p-4">
                      <p className="text-secondary text-3xl font-black tracking-tighter">R$ 200</p>
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">+ de 10 Inscritos</p>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg italic">
                  "Evento organizado com seriedade e premiação top! O maior evento da região espera pelos seus novos campeões."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela de Inscrições - Lotes */}
      <section id="ingressos" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16 uppercase italic tracking-tighter">
            GARANTA SEU <span className="text-secondary italic">LUGAR NO TATAME</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-white/5">
              <thead className="bg-[#141414]">
                <tr>
                  <th className="p-6 text-xs uppercase font-black tracking-widest text-primary border-b border-white/5">Lote</th>
                  <th className="p-6 text-xs uppercase font-black tracking-widest text-primary border-b border-white/5">Valor</th>
                  <th className="p-6 text-xs uppercase font-black tracking-widest text-primary border-b border-white/5">Prazo Até</th>
                  <th className="p-6 text-xs uppercase font-black tracking-widest text-primary border-b border-white/5">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "1º Lote", price: "R$ 100", date: "10/02", active: new Date() <= new Date("2026-02-10") },
                  { name: "2º Lote", price: "R$ 115", date: "10/03", active: new Date() > new Date("2026-02-10") && new Date() <= new Date("2026-03-10") },
                  { name: "3º Lote", price: "R$ 130", date: "08/04", active: new Date() > new Date("2026-03-10") && new Date() <= new Date("2026-04-08") }
                ].map((lote, i) => (
                  <tr key={i} className={`border-b border-white/5 ${lote.active ? 'bg-primary/5' : 'opacity-40 grayscale'}`}>
                    <td className="p-6 font-black uppercase text-xl italic">{lote.name}</td>
                    <td className="p-6 text-2xl font-black tracking-tighter text-primary">{lote.price}</td>
                    <td className="p-6 uppercase font-bold text-muted-foreground">{lote.date}</td>
                    <td className="p-6 uppercase font-black text-xs tracking-widest">
                      {lote.active ? <span className="text-secondary animate-pulse">Ativo</span> : 'Encerrado'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-12 text-muted-foreground uppercase text-xs font-bold tracking-[0.2em]">Encerramento Geral: 08 de Abril</p>
        </div>
      </section>

      {/* Localização - Mapa Dark */}
      <section id="localizacao" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto border border-white/5 overflow-hidden">
            <div className="flex flex-col lg:flex-row shadow-2xl">
              <div className="lg:w-1/3 bg-[#111] p-12">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8 leading-none">Onde a <span className="text-primary tracking-normal">História</span> é escrita</h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <MapPin className="text-primary w-8 h-8 shrink-0" />
                    <p className="text-muted-foreground font-medium italic leading-relaxed">
                      POLIESPORTIVO DE MAUÁ<br />
                      Magé - RJ, Brasil
                    </p>
                  </div>
                  <div className="p-6 bg-[#0a0a0a] border border-white/5">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-2">Dica de Acesso</p>
                    <p className="text-sm text-muted-foreground italic">
                      Procure pelo USF do Anil que o poliesportivo está exatamente em frente.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3 h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d773.7402356431317!2d-43.14639300384642!3d-22.70780578201135!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x999e4d598e80e9%3A0x7a2b71538d7178c5!2sGINASIO%20POLIESPORTIVO!5e0!3m2!1spt-BR!2sbr!4v1769915713117!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato e Redes */}
      <section id="contato" className="py-24 px-4 bg-[#0f0f0f]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-tight mb-4">FAÇA PARTE DO <span className="text-primary italic">LEGADO</span></h2>
              <p className="text-muted-foreground text-xl max-w-2xl italic">Siga-nos nas redes para acompanhar as listas de lutas, fotos e bastidores do evento.</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/copamagejjofc/" target="_blank" aria-label="Siga-nos no Instagram" className="flex flex-col items-center justify-center p-6 border border-white/10 hover:border-primary transition-all group bg-[#141414] hover:bg-white/5 active:scale-95">
                <Instagram className="w-12 h-12 text-white group-hover:text-primary transition-colors" />
                <p className="text-[10px] uppercase font-black tracking-widest mt-4">Instagram</p>
              </a>
              <button onClick={openWhatsAppSupport} aria-label="Fale conosco no WhatsApp" className="flex flex-col items-center justify-center p-6 border border-white/10 hover:border-primary transition-all group bg-[#141414] hover:bg-white/5 active:scale-95">
                <Phone className="w-12 h-12 text-white group-hover:text-primary transition-colors" />
                <p className="text-[10px] uppercase font-black tracking-widest mt-4">Suporte</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="bg-[#0a0a0a] py-12 px-4 border-t border-white/5">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h3 className="font-black text-2xl uppercase tracking-tighter text-white mb-2 italic">7ª Copa Magé de Jiu-Jitsu</h3>
            <p className="text-muted-foreground uppercase text-xs font-bold tracking-[0.3em]">21 de Abril • Poliesportivo de Mauá</p>
          </div>
          <div className="border-t border-white/5 pt-8">
            <p className="text-muted-foreground/40 text-[10px] uppercase font-bold tracking-widest">
              &copy; {new Date().getFullYear()} Copa Magé. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault()
            tryOpenRegistration()
          }}
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-primary text-black font-black w-14 h-14 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center justify-center p-0"
          )}
        >
          👉
        </Link>
      </div>

      <RegistrationForm
        isOpen={isRegistrationOpen && isRegistrationStillOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  )
}
