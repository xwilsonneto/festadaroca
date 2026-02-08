import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

const FestaSchema = new mongoose.Schema({
  nome: String,
  presenteId: String,
  tamanhoFralda: String,
}, { timestamps: true })

const Festa = mongoose.models.Festa || mongoose.model('Festa', FestaSchema)

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    
    // Verificar se o presente já foi reservado
    const jaReservado = await Festa.findOne({ presenteId: body.presenteId })
    
    if (jaReservado) {
      return NextResponse.json(
        { success: false, error: 'Este presente já foi reservado por outra pessoa' }, 
        { status: 409 }
      )
    }
    
    const festa = new Festa(body)
    const doc = await festa.save()

    return NextResponse.json({ success: true, data: doc })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}