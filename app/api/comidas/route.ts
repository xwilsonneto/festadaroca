import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

const doces = [
  { id: 'cuzcuz', nome: 'Cuzcuz', max: 3, imagem: '/doces/cuzcuz.jpeg' },
  { id: 'canjica', nome: 'Mungunzá (canjica)', max: 3, imagem: '/doces/canjica.jpg' },
  { id: 'pacoca', nome: 'Paçoca', max: 1, imagem: '/doces/pacoca.jpeg' },
  { id: 'cocada', nome: 'Cocada', max: 1, imagem: '/doces/cocada.jpeg' },
  { id: 'bolo-milho', nome: 'Bolo de Milho', max: 1, imagem: '/doces/bolodemilho.jpg' },
  { id: 'bolo-aipim', nome: 'Bolo de Aipim', max: 1, imagem: '/doces/boloaipim.jpeg' },
  { id: 'pe-moleque', nome: 'Pé de Moleque', max: 4, imagem: '/doces/pedemoleque.jpeg' },
  { id: 'cajuzinho', nome: 'Cajuzinho', max: 1, imagem: '/doces/cajuzinho.jpeg' },
]

const salgados = [
  { id: 'caldoverde', nome: 'Caldo verde', max: 1, imagem: '/salgados/caldoverde.jpeg' },
  { id: 'caldoervilha', nome: 'Caldo ervilha', max: 1, imagem: '/salgados/caldoervilha.jpeg' },
  { id: 'pastel', nome: 'Pastel', max: 1, imagem: '/salgados/pastel.jpeg' },
  { id: 'empadinha', nome: 'Empadinha', max: 1, imagem: '/salgados/empadinha.jpeg' },
  { id: 'salgadinho', nome: 'Salgadinho', max: 2, imagem: '/salgados/salgadinho.jpg' },
  { id: 'milho', nome: 'Milho', max: 1, imagem: '/salgados/milho.jpg' },
  { id: 'espetinho', nome: 'Espetinhos', max: 2, imagem: '/salgados/espetinho.jpg' },
  { id: 'kafta', nome: 'Kafta', max: 1, imagem: '/salgados/kafta.jpeg' },
  { id: 'salsichao', nome: 'Salsichão', max: 2, imagem: '/salgados/salsichao.jpeg' },
]

export async function GET() {
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

  return NextResponse.json({
    doces: count(doces),
    salgados: count(salgados),
  })
}

