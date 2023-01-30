import mongoose, { Schema, Document } from 'mongoose';

export interface PhurchaseOrder extends Document {
  _id: string,
  date: Date,
  purchaseOrderDate: Date,
  suppierName: string,
  store: string,
  netAmount: number,
  status : boolean,
  companyId: string,
}

const PhurchaseOrderSchema: Schema = new Schema({
    date: {type: Date,default: null,required: false},
    purchaseOrderDate: {type: Date,required: true},
    suppierName: {type: String,required: true},
    store: {type: String,required: true},
    netAmount: {type: String,required: true},
    status: {type: String,required: true},
    companyId: {type: String,required: true},
});

export default mongoose.model<PhurchaseOrder>('purchase_order',PhurchaseOrderSchema);
  





