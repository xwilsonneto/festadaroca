import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongodb'

const FestaSchema = new mongoose.Schema({
  nome: String,
  amigos: [String],
  comidas: [String],
  tipo: String,
}, { timestamps: true })

const Festa = mongoose.models.Festa || mongoose.model('Festa', FestaSchema)

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
    
    const festa = new Festa(body)
    const doc = await festa.save()

    return NextResponse.json({ success: true, data: doc })
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 })
  }
}
