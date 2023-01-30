import mongoose, { Schema, Document } from 'mongoose';

export interface Employee extends Document {
   _id: string,
   name: string,
   nic: string,
   age: number,
   salary: number,
   role: string,
   address: string,
   contactNumber: string,
}

const EmployeeSchema: Schema = new Schema({
   date : {type:Date,default :new Date()},
   name: {type: String,required: true},
   nic: {type: String,required: true},
   age: {type: String,required: true},
   salary: {type: String,required: true},
   role: {type: String,required: true},
   address: {type: String,required: true},
   contactNumber: {type: String,required: true},
});

export default mongoose.model<Employee>('employee', EmployeeSchema);






