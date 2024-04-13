import { Schema, model } from 'mongoose';
import { IUser} from '../interfaces/user.interface';

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8, maxLength: 255 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;