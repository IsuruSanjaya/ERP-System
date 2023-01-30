import mongoose, { Schema, Document } from 'mongoose';

export interface Item extends Document {
   _id: string,
   name: string,
   inStock: boolean,
   manufacturer: string,
   companyId: string,
   supplier: string,
   price: number,
}

const ItemSchema: Schema = new Schema({
   name: { type: String, required: true },
   inStock: { type: Boolean, required: true },
   manufacturer: { type: String, required: true },
   createAt: { type: Date, required: false, default: Date.now },
   companyId: { type: String, required: true },
   supplier: { type: String, required: true },
   price: { type: Number, required: true },
});

export default mongoose.model<Item>('item', ItemSchema);





