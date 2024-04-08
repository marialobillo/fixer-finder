import { Schema, model } from 'mongoose';
import { IClient } from '../interfaces/client.interface';

const ClientSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8, maxLength: 255 },
    fullName: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ClientModel = model<IClient>('Client', ClientSchema);

export default ClientModel;