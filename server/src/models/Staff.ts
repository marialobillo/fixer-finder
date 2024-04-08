import { Schema, model } from 'mongoose';
import { IStaff } from '../interfaces/staff.interface';

const StaffSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8, maxLength: 255 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const StaffModel = model<IStaff>('Staff', StaffSchema);

export default StaffModel;