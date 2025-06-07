import mongoose, { Schema, models, model } from 'mongoose'

const ConfirmacaoSchema = new Schema({
  nome: { type: String, required: true },
  acompanhantes: [{ type: String }],
  tipo: { type: String, enum: ['doce', 'salgado'], required: true },
  itemId: { type: String, required: true },
  itemNome: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
})

export default models.Confirmacao || model('Confirmacao', ConfirmacaoSchema)
