/* eslint-disable */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle, Loader2, Gift } from 'lucide-react'

type PresenteItem = {
  id: string
  nome: string
  tamanho: 'M' | 'G'
  disponivel: boolean
  pessoaReservou?: string
}

export default function Presentes() {
  const [selecionado, setSelecionado] = useState<string | null>(null)
  const [presentes, setPresentes] = useState<PresenteItem[]>([])
  const [tamanhoFralda, setTamanhoFralda] = useState<'M' | 'G' | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const tamanho = localStorage.getItem('tamanhoFralda') as 'M' | 'G' | null
    if (!tamanho) {
      router.push('/confirmar-presenca')
      return
    }
    setTamanhoFralda(tamanho)
    fetchPresentes()
  }, [])

  const fetchPresentes = async () => {
    try {
      const res = await fetch('/api/presentes')
      const data = await res.json()
      setPresentes(data)
    } catch (error) {
      console.error('Erro ao carregar presentes:', error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleToggle = (id: string) => {
    setSelecionado(selecionado === id ? null : id)
  }

  const handleConfirm = async () => {
    if (!selecionado) return
    
    setIsLoading(true)
    const nome = localStorage.getItem('nome') || ''

    const payload = {
      nome,
      presenteId: selecionado,
      tamanhoFralda,
    }

    try {
      await fetch('/api/festa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      router.push('/final')
    } catch (error) {
      console.error('Erro ao confirmar:', error)
      setIsLoading(false)
    }
  }

  const presentesFiltrados = presentes.filter(p => p.tamanho === tamanhoFralda)
  const disponiveisCount = presentesFiltrados.filter(p => p.disponivel).length
  const totalCount = presentesFiltrados.length

  if (loadingData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#E8DCC8] to-[#D4C4B0] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#8B7355]" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E8DCC8] to-[#D4C4B0] text-[#5C4A3A] px-4 py-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow-md mb-4">
            <Gift className="text-[#8B7355]" size={20} />
            <span className="font-semibold text-[#5C4A3A]">
              1 Fralda {tamanhoFralda} + Presente
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Escolha seu presente</h1>
          <p className="text-sm text-[#8B7355]">
            {disponiveisCount} de {totalCount} presentes disponíveis
          </p>
        </div>

        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 mb-6"
          >
            {presentesFiltrados.map(item => {
              const isSelected = selecionado === item.id
              const isDisabled = !item.disponivel && !isSelected

              return (
                <Card
                  key={item.id}
                  onClick={() => !isDisabled && handleToggle(item.id)}
                  className={cn(
                    'cursor-pointer transition-all border-2',
                    isDisabled ? 'opacity-40 cursor-not-allowed bg-gray-100' : 'hover:shadow-xl',
                    isSelected
                      ? 'border-[#8B7355] bg-[#8B7355]/10 shadow-lg'
                      : 'border-[#D4C4B0] bg-white'
                  )}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#B8A890] to-[#8B7355] flex items-center justify-center shadow-md">
                      <span className="text-lg">🎁</span>
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className={cn(
                        "font-semibold text-base",
                        isSelected ? "text-[#8B7355]" : "text-[#5C4A3A]"
                      )}>
                        {item.nome}
                      </div>
                      
                      {!item.disponivel && item.pessoaReservou && (
                        <div className="text-xs text-gray-500 mt-1">
                          Reservado por: {item.pessoaReservou}
                        </div>
                      )}
                    </div>

                    {isSelected && (
                      <CheckCircle className="text-[#8B7355] flex-shrink-0" size={24} />
                    )}
                    
                    {!item.disponivel && !isSelected && (
                      <div className="text-xs text-gray-500 font-semibold flex-shrink-0">
                        Indisponível
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>
        </AnimatePresence>

        <Button
          disabled={!selecionado || isLoading}
          onClick={handleConfirm}
          className="w-full cursor-pointer bg-[#8B7355] hover:bg-[#6B5545] text-white font-bold py-4 rounded-full shadow-xl disabled:opacity-50 text-base"
        >
          {isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
          Confirmar presente 🎊
        </Button>
      </motion.div>
    </main>
  )
}