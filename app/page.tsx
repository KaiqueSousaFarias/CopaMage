"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, TrophyIcon, DollarSignIcon, UsersIcon, StarIcon } from "lucide-react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
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

  const images = [
    "/evento.jpg?",
    "/copa.jpg?",
    "/copamage.png?",
    "/hazaq.png?",
  ]

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerPadding: "10px",
    afterChange: (index) => setCurrentImageIndex(index),
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

  const openModal = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black text-white">
      <header
        className={`fixed w-full z-10 transition-all duration-300 bg-red-900 lg:bg-transparent ${isScrolled ? "lg:bg-red-900 shadow-lg" : ""}`}
      >
        <nav
          className={`container mx-auto py-4 px-6 flex flex-wrap justify-between items-center ${isScrolled ? "bg-red-900" : ""} lg:bg-transparent`}
        >
          <h1 className="text-2xl font-bold">Copa Magé de Jiu-Jitsu</h1>
          
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={() => document.getElementById("mobile-menu")?.classList.toggle("hidden")}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <ul id="mobile-menu" className="hidden w-full lg:flex lg:w-auto lg:space-x-6 mt-4 lg:mt-0">
            {["sobre", "destaques", "valores", "inscricao", "localizacao"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="block py-2 px-4 text-white hover:text-red-300 transition-colors lg:inline-block"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section id="hero" className="min-h-screen flex items-center justify-center text-center px-4">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              5ª Copa Magé de Jiu-Jitsu
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-red-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              O melhor evento de lutas casadas, repleto de novidades!
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center justify-center bg-red-800 rounded-full px-6 py-3 shadow-lg">
                <CalendarIcon className="mr-3" aria-hidden="true" />
                <span className="text-lg">29 de março de 2025</span>
              </div>
              <div className="flex items-center justify-center bg-red-800 rounded-full px-6 py-3 shadow-lg">
                <MapPinIcon className="mr-3" aria-hidden="true" />
                <a href="#localizacao" className="text-lg hover:text-red-300 transition-colors">
                  Poliesportivo Renato Medeiros
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/inscricao">Inscreva-se Agora</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Seção com o carrossel */}
        <section id="sobre" className="py-20 bg-gradient-to-br from-red-900 via-red-800 to-black text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Sobre o Evento</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                A Copa Magé de Jiu-Jitsu é um dos eventos mais aguardados do calendário esportivo da região. Em sua 5ª edição, o torneio promete trazer ainda mais emoção e competitividade, reunindo atletas de todas as categorias em um espetáculo de técnica, força e estratégia.
                </p>
                <p>
                Com uma estrutura de primeira linha e organização impecável, a Copa Magé oferece aos participantes e espectadores uma experiência única, promovendo o espírito esportivo e o desenvolvimento do Jiu-Jitsu na região.
                </p>
              </div>
              <div className="relative h-64 md:h-96 overflow-hidden rounded-lg shadow-xl">
                <Slider {...carouselSettings}>
                  {images.map((src, index) => (
                    <div key={index} className="relative h-64 md:h-96 cursor-pointer">
                      <Image
                        src={src}
                        alt={`Imagem ${index + 1}`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                        onClick={() => openModal(index)} // Abre a modal ao clicar
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl h-96 rounded-lg p-6">
              <button
                className="absolute top-4 right-4 text-black text-2xl font-bold"
                onClick={closeModal}
              >
                ✖
              </button>
              <Slider
                {...carouselSettings}
                initialSlide={currentImageIndex} // Define a imagem inicial
              >
                {images.map((src, index) => (
                  <div key={index} className="relative h-64 md:h-96">
                    <Image
                      src={src}
                      alt={`Imagem ${index + 1}`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
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

        <section id="valores" className="py-20 bg-red-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Valores e Lotes</h2>
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
          </div>
        </section>

        <section id="inscricao" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Inscrição</h2>
            <Card className="bg-gradient-to-br from-red-800 to-red-900 shadow-2xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <p className="mb-6 text-lg">
                  <strong>Encerramento:</strong> 07 de março de 2025
                </p>
                <p className="mb-8 text-lg">
                  <strong>Forma de pagamento:</strong> Pix para Ezequiel Farias Evangelista
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
        </section>
        <section id="localizacao" className="py-20">
          <div className="max-w-2xl mx-auto mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Localização do Evento</h3>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.7637922302677!2d-43.1871397!3d-22.5867337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x990a1ae7c6a1e3%3A0xbc77452e09c2e6a7!2sGin%C3%A1sio%20Poliesportivo%20Renato%20Medeiros!5e0!3m2!1spt-BR!2sbr!4v1695813720504!5m2!1spt-BR!2sbr"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Evento"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-red-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xl md:text-2xl font-semibold mb-4">
            Participe e faça parte do melhor evento de jiu-jitsu da região!
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="https://www.instagram.com/copamagejjofc/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-300 transition-colors"
              aria-label="Instagram da Copa Magé"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/hazaq_jiujitsu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-300 transition-colors"
              aria-label="Instagram do Organizador"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <p className="text-sm text-red-200/80 mt-8">&copy; {new Date().getFullYear()} Copa Magé de Jiu-Jitsu. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}