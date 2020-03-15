import * as mongoose from 'mongoose';
import uuid from 'uuid';
import multer from 'multer';
import fs from 'fs';
import { Schema } from 'mongoose';
import { ICategory } from '../category.interface';
import mongoosePaginate from 'mongoose-paginate';

const CategorySchema = new Schema({
    ID: {
        type: String,
        default: uuid.v1
    },
    categoryCode: {
        type: String,
        default: '',
    },
    categoryName: {
        type: String,
        default: '',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

CategorySchema.plugin(mongoosePaginate);
const CategoryModel = mongoose.model<ICategory>('category', CategorySchema);
export default CategoryModel;