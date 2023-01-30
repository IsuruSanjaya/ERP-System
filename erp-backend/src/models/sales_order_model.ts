import mongoose, { Schema, Document } from 'mongoose';


export interface SalesOder extends Document {
  _id: string;
  date: Date;
  transactionDate: Date;
  transactionType: string;
  coustomer: string;
  shippingAddress: string;
  totalBill: number;
  status: number;
  companyId: string;
}


const SalesOrderSchema: Schema = new Schema({
  date: { type: Date, default: null, required: true },
  transactionDate: { type: Date, default: null, required: true },
  transactionType: { type: String, required: true },
  coustomer: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  totalBill: { type: String, required: true },
  status: { type: Number, required: true },
  companyId: { type: String, required: true },
});

export default mongoose.model<SalesOder>('erp_sales_order', SalesOrderSchema);
