/* eslint-disable */
'use client'

import { Loader2 } from 'lucide-react'
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
    <main className="flex items-center justify-center min-h-screen bg-black">
      {/* Frame no formato Stories (9:16) */}
      <div
        className="relative w-full max-w-[430px] aspect-[9/16] overflow-hidden"
        style={{
          backgroundImage: 'url(/convite-cha-bebe.jpeg)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000'
        }}
      >
        {/* Botão sem animação */}
        <div className="absolute bottom-40 w-full text-center px-4">
          <Button
            onClick={handleConfirmClick}
            disabled={isLoading}
            className="inline-flex items-center justify-center cursor-pointer gap-2 bg-[#6B5545] hover:bg-[#5C4A3A] text-white px-8 py-3 rounded-full text-base font-semibold shadow-2xl transition disabled:opacity-70"
          >
            {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
            Confirme sua presença
          </Button>
        </div>
      </div>
    </main>
  )
}
