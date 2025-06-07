'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#fff4e6] text-[#3e2a1c] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center space-y-6"
      >
        <div className="flex justify-center">
          <div className="bg-yellow-400 rounded-full p-3 shadow-md">
            <PartyPopper className="text-red-600" size={32} />
          </div>
        </div>

        <img
          src="/arraia.jpg"
          alt="Festa da Roça"
          className="w-full rounded-2xl border-4 border-yellow-300 shadow-lg"
        />

        <h1 className="text-lg font-bold">Você está convidado(a) pro nosso arraiá!</h1>

        <Link
          href="/confirmar-presenca"
          className="inline-block bg-yellow-700 hover:bg-yellow-800 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition"
        >
          Confirmar presença 🎉
        </Link>
      </motion.div>
    </main>
  )
}
