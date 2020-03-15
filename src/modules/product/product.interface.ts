import { Types, Document } from 'mongoose';

export interface IProduct extends Document {
    ID: String;
    categoryID: String,
    productName: String;
    image: String,
    price: Number,
    size: String;
    description: String,
    hotStyle: Boolean,
    isNewest: Boolean,
    isDelete: Boolean;
}
export interface ICreateProduct extends Document {
    categoryID: String,
    productName: String;
    image: String,
    price: Number,
    size: String;
    description: String,
    hotStyle: Boolean,
    isNewest: Boolean,
    isDelete: Boolean;
}