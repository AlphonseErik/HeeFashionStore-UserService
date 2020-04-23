import { Types, Document } from 'mongoose';
export interface IOrder extends Document {
  ID: string;
  userID: string,
  orderDetail: any;
  status: string,
  isDelete: boolean,
  isDelivery: boolean,
  toAddress?: string,
  userReceive?: string
}
export interface ICreateOrder extends Document {
  userID: string,
  orderDetail: any;
  status: string,
  isDelete: boolean,
  isDelivery: boolean,
  toAddress?: string,
  userReceive?: string
}


