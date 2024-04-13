import { Schema, model } from 'mongoose';
import { IRole } from '../interfaces/role.interface';

const RoleSchema: Schema = new Schema(
  {
    roleName: { type: String, required: true },
    description: { type: String, required: true },
    isDefault: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RoleModel = model<IRole>('Role', RoleSchema);

export default RoleModel;