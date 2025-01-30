"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    categoriaPeso: "",
    categoriaPesoNoGi: "",
    faixa: "",
    equipe: "",
    telefone: "",
    email: "",
    campeonatoGi: false,
    campeonatoNoGi: false,
    lutaCasada: false,
    festivalKids: false,
  })

  const [copySuccess, setCopySuccess] = useState(false)

  const handleCopyPix = () => {
    navigator.clipboard.writeText(
      "00020126360014BR.GOV.BCB.PIX0114+55219887088755204000053039865802BR5901N6001C62070503***63041D18",
    )
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePhoneChange = (e) => {
    const formattedPhone = e.target.value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")

    setFormData((prevState) => ({ ...prevState, telefone: formattedPhone }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const formatDate = (date) => {
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) return "Data inválida"
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedDate = formatDate(formData.dataNascimento)

    const message = `Novo registro para a 5ª Copa Magé de Jiu-Jitsu:
      Nome: ${formData.nome}
      Data de Nascimento: ${formattedDate}
      Categoria de Peso Gi: ${formData.categoriaPeso}
      Categoria de Peso No-Gi: ${formData.categoriaPesoNoGi}
      Faixa: ${formData.faixa}
      Equipe: ${formData.equipe}
      Telefone: ${formData.telefone}
      Email: ${formData.email}
      Campeonato Gi: ${formData.campeonatoGi ? "Sim" : "Não"}
      Campeonato No Gi: ${formData.campeonatoNoGi ? "Sim" : "Não"}
      Luta Casada: ${formData.lutaCasada ? "Sim" : "Não"}
      Festival Kids: ${formData.festivalKids ? "Sim" : "Não"}`

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5521988708875&text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    router.push("/confirmacao")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-red-800 to-red-900 p-6 sm:p-10 rounded-2xl shadow-2xl">

        {/* Container Responsivo do Iframe */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "80vh", // Mantém o iframe visível em toda a tela
            minHeight: "500px", // Garante que não fique muito pequeno
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfv_7DImp7XLuIR6s5eQxJ9qQ_cpBSLc1K4AOUHjfKymQ-hQA/viewform?embedded=true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
              transform: "scale(1)", // Reduz o tamanho do conteúdo dentro do iframe
              transformOrigin: "top left",
              overflowX: "hidden", // Evita rolagem horizontal
            }}
            title="Google Form"
          >
            Carregando…
          </iframe>
        </div>

        {/* Link para voltar */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-red-300 hover:text-red-100 text-lg transition-colors duration-300"
          >
            Voltar para a página inicial
          </Link>
        </div>

      </div>
    </div>
  )
}