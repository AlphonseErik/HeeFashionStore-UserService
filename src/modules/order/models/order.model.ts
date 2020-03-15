import * as mongoose from 'mongoose';
import uuid from 'uuid';
import { Schema } from 'mongoose';
const bcrypt = require('bcryptjs');
import { IOrder } from './../order.interface';
import mongoosePaginate from 'mongoose-paginate';

const OrderSchema = new Schema({
  ID: {
    type: String,
    default: uuid.v1,
  },
  product: [
    {
      productName: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      price: {
        type: Number
      },
    }
  ],
  totalPrice: {
    type: Number,
  },
  type: {
    type: String,
    default: ''
  },
  status: {
    type: String,
  },
  isChange: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

OrderSchema.plugin(mongoosePaginate);
const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;