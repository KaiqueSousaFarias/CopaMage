"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Countdown } from "@/components/countdown"
import { RegistrationForm } from "@/components/registration-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Award, Users, MapPin, Phone, Mail, Instagram, Swords } from "lucide-react"
import sponsors from "@/data/sponsors.json"
import Link from "next/link";

export default function HomePage() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const isRegistrationStillOpen = useMemo(() => {
    const now = new Date()
    const deadline = new Date("2025-09-25T23:59:59-03:00")
    return now <= deadline
  }, [])

  const tryOpenRegistration = () => {
    if (!isRegistrationStillOpen) return
    setIsRegistrationOpen(true)
  }


  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            6ª Copa Magé de <span className="text-primary">Jiu-Jitsu</span> 2025
          </h1>
          <div className="text-xl md:text-2xl text-muted-foreground mb-8">
            <p className="mb-2">📅 19 de outubro de 2025</p>
            <p>📍 Ginásio Poliesportivo Renato Medeiros, Magé-RJ</p>
          </div>

          <div className="mb-12">
            <img
              src="/image/evento.jpg"
              alt="Evento Copa Magé de Jiu-Jitsu em Magé RJ"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-[0_6px_24px_rgba(0,0,0,0.06)]"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Contagem Regressiva</h3>
            <Countdown />
          </div>

          {isRegistrationStillOpen ? (
            <Button
              size="lg"
              onClick={tryOpenRegistration}
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              Inscreva-se Agora
            </Button>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">*Inscrições encerradas</p>
          )}
        </div>
      </section>

      {/* Sobre o Evento */}
      <section id="sobre" className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sobre o Evento</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg leading-relaxed text-muted-foreground">
              A Copa Magé de Jiu-Jitsu é um dos eventos mais tradicionais do estado do Rio de Janeiro, reunindo atletas
              de todas as idades e graduações. Com foco no profissionalismo, segurança e fair play, oferecemos
              premiações especiais, ambiente familiar e a oportunidade de competir em alto nível. Venha fazer parte
              desta celebração do Jiu-Jitsu brasileiro!
            </p>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section id="destaques" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Destaques do Evento</h2>

          <div className="mb-12 p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-6">💰 GRAPPLING PROFISSIONAL – pela primeira vez!</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="bg-background rounded-lg p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
                  <div className="text-3xl mb-2">🥇</div>
                  <h4 className="font-semibold text-lg mb-2">1º Lugar</h4>
                  <p className="text-muted-foreground">
                    Cinturão + <span className="font-bold text-primary">R$ 1.000,00</span>
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
                  <div className="text-3xl mb-2">🥈</div>
                  <h4 className="font-semibold text-lg mb-2">2º Lugar</h4>
                  <p className="text-muted-foreground">
                    Medalha + <span className="font-bold text-primary">R$ 200,00</span>
                  </p>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
                  <div className="text-3xl mb-2">🥉</div>
                  <h4 className="font-semibold text-lg mb-2">3º Lugar</h4>
                  <p className="text-muted-foreground">
                    Medalha + <span className="font-bold text-primary">R$ 100,00</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0">
              <CardHeader>
                <Trophy className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Cinturão para Campeões</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Todos os campeões absolutos receberão cinturões personalizados da Copa Magé
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Premiação Especial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Premiação única para os melhores atletas da competição</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0">
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Festival Kids</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Todas as crianças participantes receberão medalhas, promovendo inclusão e participação
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ingressos / Inscrição */}
      <section id="ingressos" className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ingressos e Inscrições</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(() => {
              const currentDate = new Date()
              const batch1End = new Date("2025-09-05T23:59:59-03:00")
              const batch2End = new Date("2025-09-20T23:59:59-03:00")
              const batch3End = new Date("2025-09-25T23:59:59-03:00")

              const isBatch1Active = currentDate <= batch1End
              const isBatch2Active = currentDate > batch1End && currentDate <= batch2End
              const isBatch3Active = currentDate > batch2End && currentDate <= batch3End
              const isRegistrationClosed = currentDate > batch3End

              return (
                <>
                  {/* 1º Lote */}
                  <Card className={`hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0 ${isBatch1Active ? "ring-2 ring-primary" : "opacity-60"}`}>
                    <CardHeader>
                      <CardTitle className="text-center">1º Lote</CardTitle>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-primary">R$ 90</span>
                        <p className="text-sm text-muted-foreground">Até 05/09/2025</p>
                        {isBatch1Active ? (
                          <p className="text-xs text-primary font-semibold">LOTE ATUAL</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">ENCERRADO</p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={tryOpenRegistration} disabled={!isBatch1Active || !isRegistrationStillOpen}>
                        {isBatch1Active && isRegistrationStillOpen ? "Inscrever-se" : "Encerrado"}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* 2º Lote */}
                  <Card className={`hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0 ${isBatch2Active ? "ring-2 ring-primary" : "opacity-60"}`}>
                    <CardHeader>
                      <CardTitle className="text-center">2º Lote</CardTitle>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-primary">R$ 110</span>
                        <p className="text-sm text-muted-foreground">Até 20/09/2025</p>
                        {isBatch2Active && <p className="text-xs text-primary font-semibold">LOTE ATUAL</p>}
                        {currentDate <= batch1End && <p className="text-xs text-muted-foreground">PRÓXIMO</p>}
                        {currentDate > batch2End && <p className="text-xs text-muted-foreground">ENCERRADO</p>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={tryOpenRegistration} disabled={!isBatch2Active || !isRegistrationStillOpen}>
                        {isBatch2Active && isRegistrationStillOpen ? "Inscrever-se" : currentDate <= batch1End ? "Em breve" : "Encerrado"}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* 3º Lote */}
                  <Card className={`hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0 ${isBatch3Active ? "ring-2 ring-primary" : "opacity-60"}`}>
                    <CardHeader>
                      <CardTitle className="text-center">3º Lote</CardTitle>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-primary">R$ 120</span>
                        <p className="text-sm text-muted-foreground">Até 25/09/2025</p>
                        {isBatch3Active && <p className="text-xs text-primary font-semibold">LOTE ATUAL</p>}
                        {currentDate <= batch2End && <p className="text-xs text-muted-foreground">PRÓXIMO</p>}
                        {isRegistrationClosed && <p className="text-xs text-muted-foreground">ENCERRADO</p>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={tryOpenRegistration} disabled={!isBatch3Active || !isRegistrationStillOpen}>
                        {isBatch3Active && isRegistrationStillOpen ? "Inscrever-se" : currentDate <= batch2End ? "Em breve" : "Encerrado"}
                      </Button>
                    </CardContent>
                  </Card>
                </>
              )
            })()}
          </div>
          {(() => {
            const isRegistrationClosed = !isRegistrationStillOpen
            return isRegistrationClosed ? (
              <p className="text-center text-sm text-muted-foreground mt-8">*Inscrições encerradas</p>
            ) : (
              <p className="text-center text-sm text-muted-foreground mt-8">
                *Valores e lotes sujeitos a atualização oficial
              </p>
            )
          })()}
        </div>
      </section>

      {/* Patrocinadores */}
      <section id="patrocinadores" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Patrocinadores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-6 bg-card rounded-lg shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:scale-105 transition-transform border-0"
              >
                <img
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  className="max-w-full max-h-16 md:max-h-20 lg:max-h-24 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section id="localizacao" className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Localização</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-background rounded-lg shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-6 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ginásio Poliesportivo Renato Medeiros</h3>
                  <p className="text-muted-foreground">
                    Av. Automóvel Clube, 3334-3410 - Fragoso
                    <br />
                    Magé - RJ, 25900-000
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.7950757012154!2d-43.1853602!3d-22.5867665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x990a1ae7c6a1e3%3A0xbc77452e09c2e6a7!2sGin%C3%A1sio%20Poliesportivo%20Renato%20Medeiros!5e0!3m2!1spt-BR!2sbr!4v1757264292121!5m2!1spt-BR!2sbr"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contato</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0">
              <CardHeader>
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <CardTitle>WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">(21) 98870-8875</p>
                <Button variant="outline" onClick={() => window.open("https://wa.me/5521988708875", "_blank")}>
                  Conversar
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0">
              <CardHeader>
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <CardTitle>E-mail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">contato@copamage.com.br</p>
                <Button variant="outline" onClick={() => window.open("mailto:contato@copamage.com.br", "_blank")}>
                  Enviar E-mail
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform shadow-[0_6px_24px_rgba(0,0,0,0.06)] border-0">
              <CardHeader>
                <Instagram className="w-8 h-8 text-primary mx-auto mb-4" />
                <CardTitle>Instagram</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">@copamagejjofc</p>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://www.instagram.com/copamagejjofc/", "_blank")}
                >
                  Seguir
                </Button>
              </CardContent>
            </Card>
          </div>
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
              &copy; {new Date().getFullYear()} Copa Magé de Jiu-Jitsu. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating alert for fights */}
      <Link href="/lutas">
        <div className="fixed bottom-6 left-6 z-50 group cursor-pointer">
          <div className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-pulse">
            <Swords className="w-6 h-6" />
          </div>
          <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-foreground text-background px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              🥊 Confira a lista de lutas!
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
            </div>
          </div>
        </div>
      </Link>

      <RegistrationForm
        isOpen={isRegistrationOpen && isRegistrationStillOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  )
}
