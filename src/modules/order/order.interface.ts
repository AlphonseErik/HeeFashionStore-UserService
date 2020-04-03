import { Types, Document } from 'mongoose';
export interface IOrder extends Document {
  ID: String;
  userID: String,
  orderDetail: string;
  totalPrice: string;
  type: string,
  status: string,
  isDelete: Boolean,
  isDelivery: boolean,
  toAddress?: string,
  userReceive?: string
}
export interface ICreateOrder extends Document {
  userID: String,
  orderDetail: string;
  totalPrice: string;
  type: string,
  status: string,
  isDelete: Boolean,
  createdAt: Date,
  isDelivery: boolean,
  toAddress?: string,
  userReceive?: string
}


