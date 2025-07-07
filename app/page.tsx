'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PartyPopper, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleConfirmClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push('/confirmar-presenca')
    }, 500)
  }

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

        <Image
          src="/arraia.jpg"
          alt="Festa da Roça"
          width={400}
          height={300}
          className="w-full rounded-2xl border-4 border-yellow-300 shadow-lg"
        />

        <h1 className="text-lg font-bold">Você está convidado(a) pro nosso arraiá!</h1>

        <Button
          onClick={handleConfirmClick}
          disabled={isLoading}
          className="inline-flex items-center cursor-pointer justify-center gap-2 bg-yellow-700 hover:bg-yellow-800 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition disabled:opacity-70"
        >
          {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          Confirmar presença 🎉
        </Button>
      </motion.div>
    </main>
  )
}
