'use client'

import { motion } from 'framer-motion'

export default function FinalPage() {
  return (
    <main className="min-h-screen bg-[#fff9e6] text-[#3e2a1c] px-6 py-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="max-w-xl text-center space-y-8">
          <h1 className="text-3xl font-bold">🎊 Presença Confirmada!</h1>
          <p className="text-lg">
            Obrigado por confirmar sua presença na nossa Festa Junina!
          </p>

          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="bg-yellow-200 border-4 border-yellow-500 rounded-lg p-5 shadow-lg"
          >
            <p className="text-xl font-extrabold text-yellow-900 mb-2">
              💰 Valor da contribuição: <span className="text-3xl">R$5</span> por pessoa
            </p>
            <p className="text-sm font-semibold text-yellow-800 leading-snug">
              Esse valor ajuda será para o aluguel de cadeiras e compra dos brindes para as brincadeiras.
            </p>
          </motion.div>

          <div className="text-left text-base space-y-3 mt-6">
            <p>🎯 <strong>Brincadeiras programadas:</strong> quadrilha, pescaria e karaokê</p>
            <p>📍 <strong>Local e horário:</strong> Rua Urbano Santos, 30 - Laranjal - A partir das 18h</p>
          </div>

          <p className="text-sm text-muted-foreground mt-10">Até lá! 💃🕺</p>
        </div>
      </motion.div>
    </main>
  )
}
