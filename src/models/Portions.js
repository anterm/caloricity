import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const PortionSchema = new Schema({
  date: {type: Date, default: Date.now},
  user_id:  Schema.Types.ObjectId,
  products: [{
    _id: Schema.Types.ObjectId,
    name: 'string',
    weight: 'number',
    protein: 'number',
    fat: 'number',
    ch: 'number',
    caloricity: 'number'
  }]
});

PortionSchema.index({user_id: 1, date: 1})

export default mongoose.model('Portions', PortionSchema);