import { IAuth } from './auth.interface'

export interface IStaff extends IAuth {
  firstName: string;
  lastName: string;
}