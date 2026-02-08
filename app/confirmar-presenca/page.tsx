/* eslint-disable */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2, Baby } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Confirmar() {
  const [nome, setNome] = useState('')
  const [tamanhoFralda, setTamanhoFralda] = useState<'M' | 'G' | null>(null)
  const [fraldasDisponiveis, setFraldasDisponiveis] = useState<{ M: number; G: number }>({ M: 20, G: 20 })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    fetchDisponibilidade()
  }, [])

  const fetchDisponibilidade = async () => {
    try {
      const res = await fetch('/api/fraldas-disponiveis')
      const data = await res.json()
      setFraldasDisponiveis(data)
    } catch (error) {
      console.error('Erro ao carregar disponibilidade:', error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async () => {
    if (!nome || !tamanhoFralda) return
    
    // Verificar novamente a disponibilidade antes de prosseguir
    if (fraldasDisponiveis[tamanhoFralda] === 0) {
      alert('Desculpe, este tamanho de fralda não está mais disponível.')
      return
    }
    
    setIsLoading(true)
    localStorage.setItem('nome', nome)
    localStorage.setItem('tamanhoFralda', tamanhoFralda)
    router.push('/presentes')
  }

  if (loadingData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#E8DCC8] to-[#D4C4B0] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#8B7355]" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#E8DCC8] to-[#D4C4B0] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 shadow-2xl border-none bg-white/95 backdrop-blur-sm rounded-3xl relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#8B7355] rounded-full p-3 shadow-lg">
            <Baby className="text-white" size={32} />
          </div>

          <CardContent className="space-y-6 mt-6">
            <h1 className="text-2xl font-semibold text-center text-[#5C4A3A]">
              Chá de bebê do Murilo
            </h1>

            <div className="space-y-2">
              <Label htmlFor="nome" className="text-[#5C4A3A]">Nomes:</Label>
              <Input
                id="nome"
                placeholder="Digite seu nome e de quem for o acompanhar"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border-[#B8A890] focus:border-[#8B7355] focus:ring-[#8B7355]"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[#5C4A3A]">Escolha o tamanho da fralda</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTamanhoFralda('M')}
                  disabled={fraldasDisponiveis.M === 0}
                  className={cn(
                    'p-4 rounded-2xl border-2 transition-all',
                    fraldasDisponiveis.M === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                    tamanhoFralda === 'M'
                      ? 'border-[#8B7355] bg-[#8B7355]/10 shadow-lg'
                      : 'border-[#D4C4B0] bg-white hover:border-[#B8A890]'
                  )}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">👶</div>
                    <div className={cn(
                      "font-semibold text-lg",
                      tamanhoFralda === 'M' ? 'text-[#8B7355]' : 'text-[#5C4A3A]'
                    )}>
                      Fralda M
                    </div>
                    <div className="text-xs mt-1 text-gray-600">
                      {fraldasDisponiveis.M} disponíveis
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setTamanhoFralda('G')}
                  disabled={fraldasDisponiveis.G === 0}
                  className={cn(
                    'p-4 rounded-2xl border-2 transition-all',
                    fraldasDisponiveis.G === 0 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                    tamanhoFralda === 'G'
                      ? 'border-[#8B7355] bg-[#8B7355]/10 shadow-lg'
                      : 'border-[#D4C4B0] bg-white hover:border-[#B8A890]'
                  )}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">👶</div>
                    <div className={cn(
                      "font-semibold text-lg",
                      tamanhoFralda === 'G' ? 'text-[#8B7355]' : 'text-[#5C4A3A]'
                    )}>
                      Fralda G
                    </div>
                    <div className="text-xs mt-1 text-gray-600">
                      {fraldasDisponiveis.G} disponíveis
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading || !nome || !tamanhoFralda}
              className="w-full mt-6 cursor-pointer bg-[#8B7355] hover:bg-[#6B5545] text-white font-semibold rounded-full py-3 text-base shadow-lg disabled:opacity-50"
            >
              {isLoading && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
              Escolher presente 🎁
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
