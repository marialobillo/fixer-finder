import { IAuth } from './auth.interface'

export interface IUser extends IAuth {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  role: string;
}