import { Schema, model } from 'mongoose';
import { IService } from '../interfaces/service.interface';

const ServiceSchema: Schema = new Schema(
  {
    staffId: { type: String, required: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ServiceModel = model<IService>('Service', ServiceSchema);

export default ServiceModel;