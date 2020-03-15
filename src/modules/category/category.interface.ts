import { Types, Document } from 'mongoose';
export interface ICategory extends Document {
    ID: String;
    categoryCode: String;
    categoryName: String;
    isDelete: Boolean;
}
export interface ICreateCategory extends Document {
    categoryCode: String;
    categoryName: String;
    isDelete: Boolean;
}
