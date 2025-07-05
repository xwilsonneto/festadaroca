'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PartyPopper } from 'lucide-react'

export default function Confirmar() {
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('0')
  const [acompanhantes, setAcompanhantes] = useState<string[]>([])
  const router = useRouter()

  const handleQuantidadeChange = (value: string) => {
    setQuantidade(value)
    const qnt = parseInt(value)
    const novos = [...acompanhantes]
    if (qnt > novos.length) {
      setAcompanhantes([...novos, ...Array(qnt - novos.length).fill('')])
    } else {
      setAcompanhantes(novos.slice(0, qnt))
    }
  }

  const handleAcompanhanteChange = (index: number, value: string) => {
    const novos = [...acompanhantes]
    novos[index] = value
    setAcompanhantes(novos)
  }

  const handleSubmit = () => {
    if (!nome) return
    localStorage.setItem('nome', nome)
    localStorage.setItem('amigos', JSON.stringify(acompanhantes))
    router.push('/comida')
  }

  return (
    <main className="min-h-screen bg-[#fff4e6] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 shadow-xl border-none bg-[#fff9f3] rounded-2xl relative">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-yellow-400 rounded-full p-2 shadow-md">
            <PartyPopper className="text-red-600" size={28} />
          </div>

          <CardContent className="space-y-5 mt-4">
            <h1 className="text-2xl font-semibold text-center text-[#3e2a1c]">
              Quem vem pro arraiá?
            </h1>

            <div className="space-y-2">
              <Label htmlFor="nome">Seu nome</Label>
              <Input
                id="nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Quantos acompanhantes?</Label>
              <Select value={quantidade} onValueChange={handleQuantidadeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a quantidade" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(6)].map((_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i === 0 ? 'Nenhum' : i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {acompanhantes.map((acomp, index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`acomp-${index}`}>Acompanhante {index + 1}</Label>
                <Input
                  id={`acomp-${index}`}
                  placeholder={`Nome do acompanhante ${index + 1}`}
                  value={acomp}
                  onChange={(e) => handleAcompanhanteChange(index, e.target.value)}
                  onFocus={(e) =>
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                />
              </div>
            ))}

            <Button
              onClick={handleSubmit}
              className="w-full mt-4 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold rounded-full py-2"
            >
              Escolha seu prato 🍢
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}
