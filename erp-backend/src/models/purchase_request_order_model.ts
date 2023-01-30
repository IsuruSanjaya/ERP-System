import mongoose, { Schema, Document } from 'mongoose';

export interface PurchaseRequestOrder extends Document {
   _id: string,
   requestId: string,
   itemId: string,
   quantity: number,
   itemPrice : number,
}

const PurchaseRequestOrderSchema: Schema = new Schema({
   date: { type: Date, default: Date(), required: true },
   requestId: {type: String,required : true},
   itemId: {type: String,required : true},
   quantity:{type: String,required : true},
   itemPrice : {type:Number,required : true}
});

export default mongoose.model<PurchaseRequestOrder>('purchase_request_order', PurchaseRequestOrderSchema);






