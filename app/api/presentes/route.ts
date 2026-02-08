import { connectDB } from '@/lib/mongodb'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

const presentesFraldaM = [
  { id: 'm-1', nome: 'Saída maternidade', tamanho: 'M' },
  { id: 'm-2', nome: 'Lenço', tamanho: 'M' },
  { id: 'm-3', nome: 'Pomada', tamanho: 'M' },
  { id: 'm-4', nome: 'Pomada', tamanho: 'M' },
  { id: 'm-5', nome: 'Lenço', tamanho: 'M' },
  { id: 'm-6', nome: 'Prendedor de chupeta', tamanho: 'M' },
  { id: 'm-7', nome: 'Lenço', tamanho: 'M' },
  { id: 'm-8', nome: 'Lixeira', tamanho: 'M' },
  { id: 'm-9', nome: 'Lenço', tamanho: 'M' },
  { id: 'm-10', nome: 'Protetinho', tamanho: 'M' },
  { id: 'm-11', nome: 'Nebulizador', tamanho: 'M' },
  { id: 'm-12', nome: 'Protetor de tomada', tamanho: 'M' },
  { id: 'm-13', nome: 'Mamadeira', tamanho: 'M' },
  { id: 'm-14', nome: 'Pomada', tamanho: 'M' },
  { id: 'm-15', nome: 'Travesseiro', tamanho: 'M' },
  { id: 'm-16', nome: 'Lenço', tamanho: 'M' },
  { id: 'm-17', nome: 'Jogo de talheres', tamanho: 'M' },
  { id: 'm-18', nome: 'Protetor de quina', tamanho: 'M' },
  { id: 'm-19', nome: 'Bacia', tamanho: 'M' },
  { id: 'm-20', nome: 'Colchão p/ berço', tamanho: 'M' },
  { id: 'm-21', nome: 'Lenço', tamanho: 'M' },
  { id: 'm-22', nome: 'Algodão', tamanho: 'M' },
  { id: 'm-23', nome: 'Cotonete', tamanho: 'M' },
  { id: 'm-24', nome: 'Pregador', tamanho: 'M' },
  { id: 'm-25', nome: 'Gaze', tamanho: 'M' },
  { id: 'm-26', nome: 'Sabonete de glicerina', tamanho: 'M' },
  { id: 'm-27', nome: 'Álcool', tamanho: 'M' },
  { id: 'm-28', nome: 'Perfume', tamanho: 'M' },
  { id: 'm-29', nome: 'Conta gotas', tamanho: 'M' },
  { id: 'm-30', nome: 'Chupeta', tamanho: 'M' },
  { id: 'm-31', nome: 'Lenço', tamanho: 'M' },
  { id: 'm-32', nome: 'Tapete', tamanho: 'M' },
  { id: 'm-33', nome: 'Babador', tamanho: 'M' }
]

const presentesFraldaG = [
  { id: 'g-1', nome: 'Pomada', tamanho: 'G' },
  { id: 'g-2', nome: 'Mordedor', tamanho: 'G' },
  { id: 'g-3', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-4', nome: 'Umidificador', tamanho: 'G' },
  { id: 'g-5', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-6', nome: 'Absorvente p/ seios', tamanho: 'G' },
  { id: 'g-7', nome: 'Jogo de lençol p/ berço', tamanho: 'G' },
  { id: 'g-8', nome: 'Pomada', tamanho: 'G' },
  { id: 'g-9', nome: 'Bico de mamadeira', tamanho: 'G' },
  { id: 'g-10', nome: 'Protetor p/ seios', tamanho: 'G' },
  { id: 'g-11', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-12', nome: 'Cortina', tamanho: 'G' },
  { id: 'g-13', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-14', nome: 'Mosquiteiro', tamanho: 'G' },
  { id: 'g-15', nome: 'Bacia', tamanho: 'G' },
  { id: 'g-16', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-17', nome: 'Algodão', tamanho: 'G' },
  { id: 'g-18', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-19', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-20', nome: 'Termômetro', tamanho: 'G' },
  { id: 'g-21', nome: 'Balde', tamanho: 'G' },
  { id: 'g-22', nome: 'Sabonete', tamanho: 'G' },
  { id: 'g-23', nome: 'Sabonete de glicerina', tamanho: 'G' },
  { id: 'g-24', nome: 'Lenço', tamanho: 'G' },
  { id: 'g-25', nome: 'Perfume', tamanho: 'G' },
  { id: 'g-26', nome: 'Sabonete de glicerina', tamanho: 'G' },
]

export async function GET() {
  try {
    await connectDB()

    const Festa = mongoose.models.Festa || mongoose.model('Festa', new mongoose.Schema({
      nome: String,
      presenteId: String,
      tamanhoFralda: String,
    }, { timestamps: true }))

    const registros = await Festa.find()

    // Verificar disponibilidade de fraldas
    const fraldasM = registros.filter(r => r.tamanhoFralda === 'M').length
    const fraldasG = registros.filter(r => r.tamanhoFralda === 'G').length
    const disponibilidadeM = Math.max(40 - fraldasM, 0)
    const disponibilidadeG = Math.max(40 - fraldasG, 0)

    const todosPresentes = [...presentesFraldaM, ...presentesFraldaG]

    const presentesComStatus = todosPresentes.map(presente => {
      const registro = registros.find(r => r.presenteId === presente.id)
      
      // Verificar se o tamanho de fralda correspondente ainda está disponível
      const fraldaDisponivel = presente.tamanho === 'M' ? disponibilidadeM > 0 : disponibilidadeG > 0
      
      return {
        id: presente.id,
        nome: presente.nome,
        tamanho: presente.tamanho,
        disponivel: !registro && fraldaDisponivel,
        pessoaReservou: registro ? registro.nome : undefined,
      }
    })

    return NextResponse.json(presentesComStatus)

  } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro desconhecido'
    
    return NextResponse.json(
      { error: 'Erro interno no servidor', detalhe: mensagem },
      { status: 500 }
    )
  }
}