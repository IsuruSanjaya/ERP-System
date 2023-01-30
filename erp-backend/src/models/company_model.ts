import mongoose, { Schema, Document } from 'mongoose';
export interface IComapny extends Document {
   _id : string,
   name: string,
   location: string,

}
const CompanySchema: Schema = new Schema({
   location: { type: String, required: true, lowercase: true, unique: true },
   name: { type: String, required: true, lowercase: true, unique: false },
});

export default mongoose.model<IComapny>('company', CompanySchema);