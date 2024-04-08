import { Schema, model } from 'mongoose';
import { IWorkingHours } from '../interfaces/workinghours.interface';

const WorkingHoursSchema: Schema = new Schema(
  {
    staffId: { type: String, required: true },
    dayOfWeek: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WorkingHoursModel = model<IWorkingHours>('WorkingHours', WorkingHoursSchema);

export default WorkingHoursModel;