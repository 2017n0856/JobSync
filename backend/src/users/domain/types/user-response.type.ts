import { Role } from '../enums/role.enum';

export type UserResponseType = {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
  username: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}; 