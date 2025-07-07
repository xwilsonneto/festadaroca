/* eslint-disable */

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle, Loader2 } from 'lucide-react'
import Image from 'next/image'

type ComidaItem = {
  id: string
  nome: string
  max: number
  restante: number
  imagem: string
  pessoas?: string[] // nomes de quem vai trazer
}

export default function Comidas() {
  const [tipoSelecionado, setTipoSelecionado] = useState<'doce' | 'salgado' | null>(null)
  const [selecionados, setSelecionados] = useState<string[]>([])
  const [opcoes, setOpcoes] = useState<{ doces: ComidaItem[]; salgados: ComidaItem[] }>({ doces: [], salgados: [] })
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/comidas')
      const data = await res.json()
      setOpcoes(data)
    }
    fetchData()
  }, [])

  const handleToggle = (id: string) => {
    setSelecionados(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    const nome = localStorage.getItem('nome') || ''
    const amigos = JSON.parse(localStorage.getItem('amigos') || '[]')

    const payload = {
      nome,
      amigos,
      comidas: selecionados,
      tipo: tipoSelecionado,
    }

    await fetch('/api/festa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    router.push('/final')
  }

  const lista = tipoSelecionado ? opcoes[`${tipoSelecionado}s`] || [] : []

  return (
    <main className="min-h-screen bg-[#fff4e6] text-[#3e2a1c] px-4 py-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="space-y-3 mb-6">
          <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 text-sm rounded-md shadow-sm">
            <strong>Atenção:</strong> além do que você irá trazer como comida, traga sua bebida, conforme a sua vontade. Traga seu cooler se não quiser misturar sua cerveja.
          </div>

          <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-800 text-sm rounded-md shadow-sm">
            <strong>Quantidade:</strong> Individual ou casal = 1 prato qualquer (doce ou salgado); casal com filhos = 1 doce <strong>e</strong> 1 salgado.
          </div>

          <div className="p-4 bg-orange-50 border-l-4 border-purple-500 text-orange-800 text-sm rounded-md shadow-sm">
            <strong>Atenção (2):</strong> se você escolher pé-de-moleque, não inventa de faltar nessa joça (aconteceu na última e ficamos sem um item como esse). Grato
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">O que você vai trazer?</h1>



        <div className="flex justify-center gap-4 mb-6">
          <Button
            className='cursor-pointer'
            variant={tipoSelecionado === 'doce' ? 'default' : 'outline'}
            onClick={() => {
              setTipoSelecionado('doce')
              setSelecionados([])
            }}
          >
            🍬 Doce
          </Button>
          <Button
            className='cursor-pointer'
            variant={tipoSelecionado === 'salgado' ? 'default' : 'outline'}
            onClick={() => {
              setTipoSelecionado('salgado')
              setSelecionados([])
            }}
          >
            🥟 Salgado
          </Button>
        </div>

        <AnimatePresence>
          {tipoSelecionado && (
            <motion.div
              key={tipoSelecionado}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 mb-6"
            >
              {lista.map(item => {
                const isSelected = selecionados.includes(item.id)
                const isDisabled = item.restante === 0 && !isSelected

                return (
                  <Card
                    key={item.id}
                    onClick={() => !isDisabled && handleToggle(item.id)}
                    className={cn(
                      'cursor-pointer transition border-2',
                      isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg',
                      isSelected
                        ? 'border-yellow-700 bg-yellow-100'
                        : 'border-transparent'
                    )}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-bold">{item.nome}</div>

                        {Array.isArray(item.pessoas) && item.pessoas.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1 max-w-xs">
                            {/* Primeiros dois nomes na mesma linha */}
                            <span className="truncate">
                              Pescado por:{' '}
                              {item.pessoas.slice(0, 2).map((nome, i) => {
                                const globalIndex = i;
                                const isLast = globalIndex === item.pessoas!.length - 1;
                                return (
                                  <span key={i}>
                                    {nome}
                                    {!isLast ? ', ' : ''}
                                  </span>
                                );
                              })}
                            </span>

                            {/* Nomes restantes em linhas de dois */}
                            {item.pessoas.length > 2 && (
                              <div className="flex flex-col gap-0.5 mt-1">
                                {item.pessoas.slice(2).reduce((rows: string[][], nome, index) => {
                                  const rowIndex = Math.floor(index / 2);
                                  if (!rows[rowIndex]) rows[rowIndex] = [];
                                  rows[rowIndex].push(nome);
                                  return rows;
                                }, []).map((row, rowIdx) => (
                                  <div key={rowIdx} className="truncate">
                                    {row.map((nome, i) => {
                                      const globalIndex = 2 + rowIdx * 2 + i;
                                      const isLast = globalIndex === item.pessoas!.length - 1;
                                      return (
                                        <span key={i}>
                                          {nome}
                                          {!isLast ? ', ' : ''}
                                        </span>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-center justify-center select-none">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-700 font-bold text-lg">
                          {item.restante}
                        </div>
                        <div className="text-xs font-normal mt-1 text-center text-yellow-700">
                          Restantes
                        </div>
                      </div>

                      {isSelected && (
                        <CheckCircle className="text-yellow-700" />
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          disabled={selecionados.length === 0 || tipoSelecionado === null || isLoading}
          onClick={handleConfirm}
          className="w-full cursor-pointer bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 rounded-full shadow-md"
        >
          {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
          Confirmar 🎊
        </Button>
      </motion.div>
    </main>
  )
}
