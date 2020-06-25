import * as mongoose from 'mongoose';
import uuid from 'uuid';
import { Schema } from 'mongoose';
import { IProduct } from '../product.interface';
import mongoosePaginate from 'mongoose-paginate';

const ProductSchema = new Schema({
    ID: {
        type: String,
        default: uuid.v1
    },
    categoryID: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        default: '',
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

ProductSchema.plugin(mongoosePaginate);
const ProductModel = mongoose.model<IProduct>('product', ProductSchema);
export default ProductModel;