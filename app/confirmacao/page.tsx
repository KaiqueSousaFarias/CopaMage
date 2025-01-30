import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-900 to-black text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-800 to-red-900 p-6 sm:p-12 rounded-2xl shadow-2xl text-center">
        <h1 
          className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-300"
          aria-label="Inscrição Enviada!"
        >
          Inscrição Enviada!
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          Sua inscrição foi enviada com sucesso. Por favor, verifique seu WhatsApp para confirmar os detalhes e
          finalizar o processo de pagamento.
        </p>
        <p className="text-lg sm:text-xl mb-12">
          Lembre-se de efetuar o pagamento utilizando o QR Code PIX fornecido no formulário de inscrição.
        </p>
        <p className="text-lg sm:text-xl mb-12">
          Verifique se a mensagem foi enviada para o WhatsApp:<br/>
          <a href="tel:+5521988708875" className="text-red-300 hover:text-red-500 transition-colors">
            (21) 9 8870-8875
          </a><br/>
          ~Ezequiel Farias.
        </p>
        <p className="text-lg sm:text-xl mb-12">
          Caso não consiga enviar para o WhatsApp preencha o formulário novamente nesse link: https://forms.gle/36P89yqsaehyEkFY9
        </p>
       
        <Button
          asChild
          className="w-full bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Voltar para a página inicial"
        >
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    </main>
  )
}