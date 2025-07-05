import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

const doces = [
  { id: 'cuzcuz', nome: 'Cuzcuz', max: 1, imagem: '/doces/cuzcuz.jpeg' },
  { id: 'canjica', nome: 'Mungunzá (canjica)', max: 1, imagem: '/doces/canjica.jpg' },
  { id: 'pacoca', nome: 'Paçoca', max: 0, imagem: '/doces/pacoca.jpeg' },
  { id: 'cocada', nome: 'Cocada', max: 1, imagem: '/doces/cocada.jpeg' },
  { id: 'bolo-milho', nome: 'Bolo de Milho', max: 2, imagem: '/doces/bolodemilho.jpg' },
  { id: 'bolo-aipim', nome: 'Bolo de Aipim', max: 2, imagem: '/doces/boloaipim.jpeg' },
  { id: 'pe-moleque', nome: 'Pé de Moleque', max: 1, imagem: '/doces/pedemoleque.jpeg' },
  { id: 'cajuzinho', nome: 'Cajuzinho', max: 1, imagem: '/doces/cajuzinho.jpeg' },
]

const salgados = [
  { id: 'caldoverde', nome: 'Caldo verde', max: 1, imagem: '/salgados/caldoverde.jpeg' },
  { id: 'caldoervilha', nome: 'Caldo ervilha', max: 1, imagem: '/salgados/caldoervilha.jpeg' },
  { id: 'pastel', nome: 'Pastel', max: 2, imagem: '/salgados/pastel.jpeg' },
  { id: 'empadinha', nome: 'Empadinha', max: 2, imagem: '/salgados/empadinha.jpeg' },
  { id: 'salgadinho', nome: 'Salgadinho (50 unidades)', max: 6, imagem: '/salgados/salgadinho.jpg' },
  { id: 'milho', nome: 'Milho', max: 2, imagem: '/salgados/milho.jpg' },
  { id: 'espetinho', nome: 'Espetinhos', max: 2, imagem: '/salgados/espetinho.jpg' },
  { id: 'kafta', nome: 'Kafta', max: 2, imagem: '/salgados/kafta.jpeg' },
  { id: 'salsichao', nome: 'Salsichão', max: 0, imagem: '/salgados/salsichao.jpeg' },
]

export async function GET() {
  try {
    await connectDB()

    const Festa = mongoose.models.Festa || mongoose.model('Festa', new mongoose.Schema({
      nome: String,
      amigos: [String],
      comidas: [String],
      tipo: String,
    }, { timestamps: true }))

    const registros = await Festa.find()

    const count = (lista: typeof doces | typeof salgados) =>
      lista.map(item => {
        const registrosDoItem = registros.filter(reg =>
          reg.comidas.includes(item.id)
        )

        const pessoas = Array.from(new Set(registrosDoItem.map(r => r.nome)))

        return {
          ...item,
          restante: Math.max(item.max - registrosDoItem.length, 0),
          pessoas,
        }
      })

    const docesContados = count(doces)
    const salgadosContados = count(salgados)

    return NextResponse.json({
      doces: docesContados,
      salgados: salgadosContados,
    })

    } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro desconhecido'
    
    return NextResponse.json(
      { error: 'Erro interno no servidor', detalhe: mensagem },
      { status: 500 }
    )
  }

}
