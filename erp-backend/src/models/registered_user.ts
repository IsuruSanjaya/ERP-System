import mongoose, { Schema, Document } from 'mongoose';
export interface IRegisteredUser extends Document {
   _id : string,
   email: string,
   name: string,
   photoUrl?: string,
   companyId : string,
}
const RegisteredUserSchema: Schema = new Schema({
   email: { type: String, required: true, lowercase: true, unique: true },
   name: { type: String, required: true, lowercase: true, unique: false },
   photoUrl: { type: String, required: false, lowercase: true, unique: false },
   companyId: { type: String, required: true, lowercase: true, unique: false },
});

export default mongoose.model<IRegisteredUser>('registered_user', RegisteredUserSchema);