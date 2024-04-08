import { IAuth } from './auth.interface'

export interface IClient extends IAuth {
  fullName: string;
}