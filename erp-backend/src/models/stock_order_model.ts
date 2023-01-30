import mongoose, { Schema, Document } from 'mongoose'

export interface StockOrderModel {
   _id?: string;
   name: string;
   price: number;
   manufacturer: string;
   orderqty: number;
}

const StockOrderModelSchema: Schema = new Schema({
   name: { type: String, required: true, lowercase: true, unique: false },
   price: { type: Number, required: true, lowercase: true, unique: false },
   manufacturer: { type: String, required: true, lowercase: true, unique: false },
   orderqty:{ type: Number, required: true, lowercase: true, unique: false },
})

export default mongoose.model<StockOrderModel>('stock_order', StockOrderModelSchema);