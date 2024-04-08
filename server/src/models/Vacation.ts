import { Schema, model } from 'mongoose';
import { IVacation } from '../interfaces/vacation.interface';

const VacationSchema: Schema = new Schema(
  {
    staffId: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    notes: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const VacationModel = model<IVacation>('Vacation', VacationSchema);

export default VacationModel;