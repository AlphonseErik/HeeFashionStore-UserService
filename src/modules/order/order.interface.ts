import { Types, Document } from 'mongoose';
export interface IOrder extends Document {
  ID: String;
  productName: string;
  quantity: string;
  price: number;
  totalPrice: number;
  type: string,
  status: string,
  isChange: Boolean,
}
export interface ICreateOrder extends Document {
  productName: string;
  quantity: string;
  price: number;
  totalPrice: number;
  type: string,
  status: string,
  isChange: Boolean,
  createdAt: Date,
}


