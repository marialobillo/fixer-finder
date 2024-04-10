import { IStaff } from '../interfaces/staff.interface';
import { IAuth } from '../interfaces/auth.interface';
import { IClient } from '../interfaces/client.interface';
import StaffModel from '../models/Staff';
import ClientModel from '../models/Client';
import { compare } from 'bcryptjs';

const registerNewStaff = async (staff: IStaff): Promise<IStaff> => {

}

const registerNewClient = async (client: IClient): Promise<IClient> => {

}

const loginUser = async (email: string, password: string): Promise<IAuth> => {
}

export {
  registerNewStaff,
  registerNewClient,
  loginUser,
}
