import mongoose, { Schema, Document } from 'mongoose';
import internal from 'stream';

export interface ProductData extends Document {
  name: string;
  description: string;
  manufacturer: string;
  supplier: string;
  in_stock_amount: number;
  unit_price: number;
  type: string;
}
const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  manufacturer: {
    type: String
  },
  supplier: {
    type: String
  },
  in_stock_amount: {
    type: Number
  },
  unit_price: {
    type: Number
  },
  type: {
    type: String
  },
  time: { type: Date, default: Date.now }
});

export default mongoose.model<ProductData>('product', ProductSchema);
