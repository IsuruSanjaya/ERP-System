import mongoose, { Schema, Document } from 'mongoose';

export interface CustomerModel extends Document {
     _id?: string,
    date: Date,
    name: string,
    nic: string,
    mobile: string,
    email: string,
    address: string,
    companyId: string,
}

const CustomerModelSchema: Schema = new Schema({
   date: { type: Date, default: Date(), required: true },
   name : {type:String,required:true},
   mobile : {type:String,required:true},
   nic : {type:String,required:true},
   email : {type:String,required:true},
   address : {type:String,required:true},
   companyId : {type:String,required:true},
});

export default mongoose.model<CustomerModel>('customer', CustomerModelSchema);





