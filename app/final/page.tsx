/* eslint-disable */

'use client'

import { motion } from 'framer-motion'
import { Baby, MapPin, Clock } from 'lucide-react'

export default function FinalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E8DCC8] to-[#D4C4B0] text-[#5C4A3A] px-6 py-12 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#B8A890] to-[#8B7355] shadow-2xl mb-4"
          >
            <Baby className="text-white" size={48} />
          </motion.div>

          <h1 className="text-3xl font-bold text-[#5C4A3A]">🎊 Presença Confirmada!</h1>
          
          <p className="text-lg text-[#6B5545]">
            Obrigado por confirmar sua presença no Chá de Bebê do Murilo!
          </p>

          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="bg-white border-4 border-[#B8A890] rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-left">
                <MapPin className="text-[#8B7355] flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold text-[#5C4A3A]">Local:</p>
                  <p className="text-sm text-[#6B5545]">Rua Urbano dos Santos, 30 - Laranjal</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-left">
                <Clock className="text-[#8B7355] flex-shrink-0 mt-1" size={24} />
                <div>
                  <p className="font-semibold text-[#5C4A3A]">Horário:</p>
                  <p className="text-sm text-[#6B5545]">08/03/2026 às 16h</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="bg-gradient-to-r from-[#8B7355] to-[#6B5545] text-white rounded-2xl p-6 shadow-xl">
            <p className="text-lg font-bold mb-3">
              📦 Lembre-se de levar:
            </p>
            <ul className="text-sm space-y-2 text-left list-disc list-inside">
              <li>1 fralda do tamanho escolhido (M ou G)</li>
              <li>O presente selecionado</li>
            </ul>
          </div>

          <p className="text-sm text-[#8B7355] mt-8 italic">
            Nos vemos lá! 🦌🌿✨
          </p>
        </div>
      </motion.div>
    </main>
  )
}
