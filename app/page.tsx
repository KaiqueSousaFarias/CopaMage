"use client"

import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import Slider, { LazyLoadTypes } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, TrophyIcon, DollarSignIcon, UsersIcon, StarIcon, PhoneIcon, MailIcon, } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import dynamic from "next/dynamic"

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false })

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCopyPix = () => {
    navigator.clipboard.writeText(
      "00020126360014BR.GOV.BCB.PIX0114+55219887088755204000053039865802BR5901N6001C62070503***63041D18",
    )
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [menuOpen, setMenuOpen] = useState(false)

  const sponsors = [
    { src: "/patrocinadores/instituto.png", alt: "Instituto - Muito Mais Que Medicina" },
    { src: "/patrocinadores/layaninha.jpg", alt: "Layaninha Kids - Moda Infantil" },
    { src: "/patrocinadores/nossa-otica.jpg", alt: "Nossa Ótica" },
    { src: "/patrocinadores/fox.jpg", alt: "Fox" },
    { src: "/patrocinadores/love-pet.jpg", alt: "Love Pet - Pet Shop" },
    { src: "/patrocinadores/braddock.jpg", alt: "Braddock da J - Pizza Pré Assada" },
    { src: "/patrocinadores/bazar-brasil.jpg", alt: "Bazar Brasil - Material Elétrico e Hidráulico" },
    { src: "/patrocinadores/felipe-da-grafica.jpg", alt: "Felipe da Gráfica" },
    { src: "/patrocinadores/vinicius.jpg", alt: "Vinícius - Treinamento Físico" },
    { src: "/patrocinadores/chaveiro.png", alt: "Chaveiro União" },
  ];

  const images = [
    { src: "/evento.jpg", alt: "Evento de Jiu-Jitsu" },
    { src: "/copa.jpg", alt: "Competição da Copa Magé" },
    { src: "/copamage.png", alt: "Logo da Copa Magé" },
    { src: "/hazaq.png", alt: "Banner do Hazaq Jiu-Jitsu" },
    ...sponsors,
  ];


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: "10px",
    afterChange: (index: number) => setCurrentImageIndex(index),
    lazyLoad: "ondemand" as LazyLoadTypes, // Melhora performance
    responsive: [
      {
        breakpoint: 1024, // Tela menor que 1024px
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // Tela menor que 768px
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Dispositivos pequenos (smartphones menores)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }
    ],
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  // Fechar modal com tecla Esc
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setIsModalOpen(false)
    if (event.key === "ArrowRight") setCurrentImageIndex((prev) => (prev + 1) % images.length)
    if (event.key === "ArrowLeft") setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [])

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal()
      if (event.key === "ArrowRight") setCurrentImageIndex((prev) => (prev + 1) % images.length)
      if (event.key === "ArrowLeft") setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    if (isModalOpen) {
      document.addEventListener("keydown", keyHandler)
    }

    return () => {
      document.removeEventListener("keydown", keyHandler)
    }
  }, [isModalOpen, images.length])

  const [timeLeft, setTimeLeft] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })
 const [eventStatus, setEventStatus] = useState('countdown')  // 'countdown', 'ongoing', 'ended', 'registrationsEnded'
const [showConfetti, setShowConfetti] = useState(false)

useEffect(() => {
  const eventDate = new Date("2025-03-29T00:00:00")
  const eventEndDate = new Date("2025-03-29T23:59:59")
  const registrationEndDate = new Date("2025-03-07T23:59:59")

  const calculateTimeLeft = () => {
    const now = new Date()
    const difference = +eventDate - +now

    if (now > registrationEndDate && difference > 0) {
      setEventStatus('registrationsEnded')
    } else if (difference > 0) {
      // Evento ainda não começou
      setTimeLeft({
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      })
      setEventStatus('countdown')
    } else if (now <= eventEndDate) {
      // Evento está em andamento
      setEventStatus('ongoing')
      if (!showConfetti) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000) // Desativa o confete após 5 segundos
      }
    } else {
      // Evento já encerrou
      setEventStatus('ended')
    }
  }

  const timer = setInterval(calculateTimeLeft, 1000)
  calculateTimeLeft()

  return () => clearInterval(timer)
}, [showConfetti])

  interface ContactLinkProps {
    href: string;
    icon: React.ReactNode;
    text: string;
  }

  const ContactLink = ({ href, icon, text }: ContactLinkProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-lg text-white hover:text-red-300 transition-colors"
    >
      {icon}
      {text}
    </a>
  );
  const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black text-white">

      <header className={`fixed w-full z-10 transition-all duration-300 bg-red-900 ${isScrolled ? "shadow-lg" : ""}`}>
        {showConfetti && <ReactConfetti />}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold">
            Copa Magé JJ
          </Link>
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <nav className={`${menuOpen ? 'block' : 'hidden'} lg:flex lg:items-center absolute lg:static top-full left-0 w-full lg:w-auto bg-red-900 lg:bg-transparent`}>
            <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 p-4 lg:p-0">
              <li><Link href="#sobre" className="block hover:text-red-300 transition-colors" onClick={() => setMenuOpen(false)}>Sobre</Link></li>
              <li><Link href="#patrocinadores" className="block hover:text-red-300 transition-colors" onClick={() => setMenuOpen(false)}>Patrocinadores</Link></li>
              <li><Link href="#destaques" className="block hover:text-red-300 transition-colors" onClick={() => setMenuOpen(false)}>Destaques</Link></li>
              <li><Link href="#ingressos" className="block hover:text-red-300 transition-colors" onClick={() => setMenuOpen(false)}>Ingressos</Link></li>
              <li><Link href="#localizacao" className="block hover:text-red-300 transition-colors" onClick={() => setMenuOpen(false)}>Localização</Link></li>
              <li><Link href="#contato" className="block hover:text-red-300 transition-colors" onClick={() => setMenuOpen(false)}>Contato</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="min-h-screen flex items-center justify-center text-center px-4 relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/evento.jpg"
              alt="Background do evento"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="container mx-auto px-4 relative z-1">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              5ª Copa Magé de Jiu-Jitsu
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl mb-8 text-red-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              O melhor evento de lutas casadas, repleto de novidades!
            </motion.p>
            <AnimatePresence mode="wait">
              {eventStatus === 'countdown' && (
                <motion.div
                  key="countdown"
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto mb-8"
                  initial={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.5 }
                  }}
                >
                  {Object.entries(timeLeft).map(([key, value]) => (
                    <motion.div
                      key={key}
                      className="bg-red-800/50 rounded-lg p-2 md:p-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="text-xl md:text-2xl lg:text-4xl font-bold"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {value}
                      </motion.div>
                      <div className="text-xs md:text-sm text-red-300">{key}</div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              {eventStatus === 'ongoing' && (
                <motion.div
                  key="event-ongoing"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                  className="bg-gradient-to-r from-red-600 to-yellow-500 text-white p-8 rounded-lg mb-8 shadow-lg"
                >
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    animate={{
                      scale: [1, 1.1, 1],
                      textShadow: [
                        "0 0 5px #fff",
                        "0 0 20px #fff",
                        "0 0 5px #fff"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    O evento é hoje!
                  </motion.h2>
                  <p className="text-xl">Não perca nenhum momento da ação!</p>
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <Button
                      size="lg"
                      className="bg-white text-red-600 hover:bg-red-100 text-lg font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <a
                        href="https://www.instagram.com/copamagejjofc/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Veja no Instagram
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
              {eventStatus === 'ended' && (
                <motion.div
                  key="event-ended"
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }
                  }}
                  className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-8 rounded-lg mb-8 shadow-lg"
                >
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      transition: { duration: 2, repeat: Number.POSITIVE_INFINITY }
                    }}
                  >
                    O evento já foi encerrado
                  </motion.h2>
                  <p className="text-xl mb-6">Obrigado a todos que participaram!</p>
                  <Button
                    size="lg"
                    className="bg-white text-gray-800 hover:bg-gray-200 text-lg font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    asChild
                  >
                    <a
                      href="https://www.instagram.com/copamagejjofc/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Galeria de Fotos
                    </a>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center justify-center bg-red-800/50 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg">
                <CalendarIcon className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                <span className="text-sm md:text-lg">29 de março de 2025</span>
              </div>
              <div className="flex items-center justify-center bg-red-800/50 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg">
                <MapPinIcon className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                <a href="#localizacao" className="text-sm md:text-lg hover:text-red-300 transition-colors">
                  Poliesportivo Renato Medeiros
                </a>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
 
  {eventStatus === 'registrationsEnded' && (
    <p className="text-xl text-red-300 font-bold">
      As inscrições foram encerradas em 7 de março de 2025.
    </p>
  )}

  {(eventStatus === 'countdown' || eventStatus === 'registrationsEnded') && (
    <CountdownTimer eventDate="2025-03-07T23:59:59" />
  )}

  {eventStatus === 'countdown' && (
    <Button
      size="lg"
      className="bg-red-600 hover:bg-red-700 text-white text-base md:text-xl font-bold py-2 md:py-4 px-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105"
      asChild
    >
      <Link href="/inscricao">Inscreva-se Agora</Link>
    </Button>
  )}

              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-white hover:bg-red-900/50 text-base md:text-xl font-bold py-2 md:py-4 px-4 md:px-8 rounded-full transition-all duration-300"
                asChild
              >
                <a href="#sobre">Saiba Mais</a>
              </Button>
            </motion.div>
          </div>
        </section>

        <section id="patrocinadores" className="py-20 bg-black text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-white">
              Nossos Patrocinadores
            </h2>
            {/* Grid Responsiva */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">

              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="relative group w-auto h-auto flex items-center justify-center transition-transform duration-300 hover:scale-105"
                  onClick={() => openModal(index + 4)}
                >
                  <Image
                    src={sponsor.src}
                    alt={sponsor.alt}
                    width={0}
                    height={0}
                    className="object-contain rounded-lg w-auto h-auto transition-all duration-300 filter group-hover:brightness-110"
                  />

                </div>
              ))}
            </div>
          </div>
        </section>




        {/* Seção com o carrossel */}
        <section id="sobre" className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-black text-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Sobre o Evento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  A Copa Magé de Jiu-Jitsu é um dos eventos mais aguardados do calendário esportivo da região.
                  Em sua 5ª edição, o torneio promete trazer ainda mais emoção e competitividade, reunindo atletas
                  de todas as categorias em um espetáculo de técnica, força e estratégia.
                </p>
                <p>
                  Com uma estrutura de primeira linha e organização impecável, a Copa Magé oferece aos participantes
                  e espectadores uma experiência única, promovendo o espírito esportivo e o desenvolvimento do
                  Jiu-Jitsu na região.
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Competição de alto nível</li>
                  <li>Estrutura profissional</li>
                  <li>Árbitros qualificados</li>
                  <li>Premiações exclusivas</li>
                </ul>
              </div>

              {/* Slider Responsivo */}
              <div className="relative w-full px-2 sm:px-4 md:px-6 lg:px-12 xl:px-16">
                <Slider {...carouselSettings}>
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative flex justify-center items-center w-full max-h-[250px] sm:max-h-[350px] md:max-h-[450px] lg:max-h-[550px]"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={800}
                        height={500}
                        className="rounded-lg shadow-lg object-contain w-full h-auto"
                        onClick={() => openModal(index)} // Abre a modal ao clicar
                      />
                    </div>
                  ))}
                </Slider>
              </div>

            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative w-full max-w-4xl h-auto p-6 rounded-lg" onClick={(e) => e.stopPropagation()}>
              <Slider
                {...carouselSettings}
                initialSlide={currentImageIndex}
              >
                {images.map((img, index) => (
                  <div key={index} className="relative flex justify-center items-center w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      layout="responsive"
                      width={900}
                      height={600}
                      className="rounded-lg shadow-lg object-contain w-full h-full"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}

        <section id="destaques" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Destaques do Evento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: TrophyIcon,
                  title: "Cinturão para Campeões",
                  description: "Todos os campeões serão premiados com cinturões exclusivos.",
                },
                {
                  icon: DollarSignIcon,
                  title: "Premiação em Dinheiro",
                  description: "Categorias com mais de 5 participantes terão premiação em dinheiro.",
                },
                {
                  icon: StarIcon,
                  title: "Medalhas para 2º e 3º",
                  description: "Reconhecimento especial para os segundos e terceiros colocados.",
                },
                {
                  icon: UsersIcon,
                  title: "Festival Kids",
                  description: "Evento especial com medalhas para todos os participantes mirins.",
                },
                {
                  icon: TrophyIcon,
                  title: "Super Lutas",
                  description: "Emocionantes lutas casadas e combinadas para os fãs.",
                },
                {
                  icon: UsersIcon,
                  title: "Troféu por Equipe",
                  description: "Premiação especial para as 10 melhores equipes do torneio.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-red-800 to-red-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <item.icon className="w-12 h-12 mb-4 text-red-300" aria-hidden="true" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-red-100">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Programação*/}
        {/** 
        <section id="programacao" className="py-20 bg-red-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Programação do Evento</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {[
                  {
                    time: "07:00",
                    title: "Abertura e Pesagem",
                    description: "Início do credenciamento e pesagem dos atletas"
                  },
                  {
                    time: "09:00",
                    title: "Início das Competições",
                    description: "Começo das lutas das categorias Kids e Juvenil"
                  },
                  {
                    time: "13:00",
                    title: "Categorias Adulto",
                    description: "Início das competições das categorias adulto"
                  },
                  {
                    time: "16:00",
                    title: "Super Lutas",
                    description: "Apresentação das lutas casadas principais"
                  },
                  {
                    time: "18:00",
                    title: "Premiação",
                    description: "Cerimônia de premiação dos campeões"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-red-800/50 rounded-lg p-6 hover:bg-red-800 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <time className="text-2xl font-bold text-red-300 md:w-32">{item.time}</time>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-red-100">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        */}

        <section id="ingressos" className="py-20 bg-red-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ingressos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Categorias Principais",
                  prices: [
                    { label: "1º lote", price: "R$ 100,00", date: "até 07/02" },
                    { label: "2º lote", price: "R$ 110,00", date: "até 25/02" },
                    { label: "3º lote", price: "R$ 120,00", date: "até 07/03" },
                  ],
                },
                {
                  title: "Lutas Casadas",
                  prices: [
                    { label: "1º lote", price: "R$ 110,00", date: "até 07/02" },
                    { label: "2º lote", price: "R$ 120,00", date: "até 25/02" },
                    { label: "3º lote", price: "R$ 130,00", date: "até 07/03" },
                  ],
                },
                {
                  title: "Festival Kids",
                  prices: [
                    { label: "1º lote", price: "R$ 80,00", date: "até 07/02" },
                    { label: "2º lote", price: "R$ 90,00", date: "até 25/02" },
                    { label: "3º lote", price: "R$ 100,00", date: "até 07/03" },
                  ],
                },
              ].map((category, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-r from-red-700 to-red-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {category.prices.map((price, idx) => (
                        <li key={idx} className="flex justify-between items-center pb-2 border-b border-red-500">
                          <span className="text-lg">{price.label}</span>
                          <span className="text-xl font-bold">{price.price}</span>
                          <span className="text-sm text-red-300">({price.date})</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
              <Card className="bg-gradient-to-br from-red-800 to-red-900 shadow-2xl">
                <CardContent className="p-8">
                  <p className="mb-6 text-lg">
                    <strong>Encerramento:</strong> 07 de março de 2025
                  </p>
                  <p className="mb-8 text-lg">
                    <strong>Forma de pagamento:</strong> PIX para Ezequiel Farias Evangelista
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <span className="text-lg mb-4 md:mb-0">Chave PIX: (21) 98870-8875</span>
                    <Button onClick={handleCopyPix} className="bg-red-600 hover:bg-red-700 text-white">
                      {copySuccess ? "Copiado!" : "Copiar PIX"}
                    </Button>
                  </div>
                  <p className="text-sm text-white font-bold mt-4 mb-6 text-center">
                    Observação: Após efetuar o pagamento, envie o comprovante do PIX para finalizar sua inscrição.
                  </p>
                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                      asChild
                    >
                      <Link href="/inscricao">Inscreva-se Agora</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="localizacao" className="py-20 bg-red-900/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Como Chegar</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6">Localização</h3>
                <p className="mb-4">Ginásio Poliesportivo Renato Medeiros</p>
                <div className="space-y-4 text-red-100">
                  <p>
                    <strong>Endereço:</strong><br />
                    Av. Automóvel Clube, 3334-3410 - Fragoso, Magé - RJ, 25900-000
                  </p>
                </div>
              </div>
              <div className="h-[400px] relative rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.7637922302677!2d-43.1871397!3d-22.5867337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x990a1ae7c6a1e3%3A0xbc77452e09c2e6a7!2sGin%C3%A1sio%20Poliesportivo%20Renato%20Medeiros!5e0!3m2!1spt-BR!2sbr!4v1695813720504!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Evento"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        {/** 
        <section id="faq" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[
                  {
                    question: "Qual o peso oficial das categorias?",
                    answer: "As categorias seguem o padrão FJJRio. A pesagem será realizada no dia do evento, com tolerância de 500g para o kimono."
                  },
                  {
                    question: "Posso me inscrever em mais de uma categoria?",
                    answer: "Sim, é possível participar em mais de uma categoria, desde que sejam compatíveis com seu peso e faixa."
                  },
                  {
                    question: "Como funciona a luta casada?",
                    answer: "As lutas casadas são combinadas previamente entre os atletas. É necessário enviar foto do atleta usando o kimono para aprovação e criação da arte de divulgação."
                  },
                  {
                    question: "Haverá kimono para venda no local?",
                    answer: "Sim, teremos stands de parceiros com kimonos e outros equipamentos à venda."
                  },
                  {
                    question: "Qual o prazo para cancelamento?",
                    answer: "O cancelamento pode ser feito até 7 dias antes do evento, com devolução de 70% do valor."
                  }
                ].map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        */}
      </main>

      <footer id="contato" className="bg-red-900 py-12">
        <div className="container mx-auto px-6">
          {/* Título */}
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
            Contato
          </h2>

          {/* Grid de Contatos */}
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coluna 1 - Fale Conosco */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Fale Conosco</h3>
              <ContactLink
                href="https://wa.me/5521988708875"
                icon={<PhoneIcon className="w-6 h-6" />}
                text="(21) 98870-8875"
              />
              <ContactLink
                href="mailto:contato@copamage.com.br"
                icon={<MailIcon className="w-6 h-6" />}
                text="contato@copamage.com.br"
              />
            </div>

            {/* Coluna 2 - Redes Sociais */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Redes Sociais</h3>
              <ContactLink
                href="https://www.instagram.com/copamagejjofc/"
                icon={<InstagramIcon />}
                text="Copa Magé"
              />
              <ContactLink
                href="https://www.instagram.com/hazaq_jiujitsu/"
                icon={<InstagramIcon />}
                text="HAZÁQ"
              />
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="container mx-auto px-6 text-center mt-8">
          <p className="text-sm text-red-200/80">
            &copy; {new Date().getFullYear()} Copa Magé. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div >
  )
}