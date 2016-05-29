import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: 'string',
  protein: 'number',
  fat: 'number',
  ch: 'number',
  caloricity: 'number',
  user_id:  Schema.Types.ObjectId
});

ProductSchema.index({user_id: 1, name: 1})

export default mongoose.model('Products', ProductSchema); 