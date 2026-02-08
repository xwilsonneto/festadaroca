import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

export async function GET() {
  try {
    await connectDB()

    const Festa = mongoose.models.Festa || mongoose.model('Festa', new mongoose.Schema({
      nome: String,
      presenteId: String,
      tamanhoFralda: String,
    }, { timestamps: true }))

    const registros = await Festa.find()

    // Contar quantas fraldas M e G já foram reservadas
    const fraldasM = registros.filter(r => r.tamanhoFralda === 'M').length
    const fraldasG = registros.filter(r => r.tamanhoFralda === 'G').length

    // Limite de 20 para cada tamanho
    const disponibilidadeM = Math.max(20 - fraldasM, 0)
    const disponibilidadeG = Math.max(20 - fraldasG, 0)

    return NextResponse.json({
      M: disponibilidadeM,
      G: disponibilidadeG
    })

  } catch (error: unknown) {
    const mensagem = error instanceof Error ? error.message : 'Erro desconhecido'
    
    return NextResponse.json(
      { error: 'Erro interno no servidor', detalhe: mensagem },
      { status: 500 }
    )
  }
}