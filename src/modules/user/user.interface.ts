import { Types, Document } from 'mongoose';
export interface IUser extends Document {
  ID: String;
  fullName: String;
  birthDate: Date;
  username: String;
  password: String;
  phone: String;
  email: String;
  type: Number;
  isDeleted: Boolean;
  isActive: Boolean;
  isSuperAdmin: Boolean;

  comparePassword: Function;
}
export interface ICreateUser extends Document {
  fullName: String;
  birthDate?: Date;
  username: String;
  password: String;
  phone?: String;
  email?: String;
  type: Number;
  isDeleted: Boolean;
  isActive: Boolean;
  isSuperAdmin: Boolean;
}
export interface IGetReportTotalOptions {
  from: Date,
  to: Date,
  groupType: 'hour' | 'date'
}
