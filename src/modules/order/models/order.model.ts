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
  userID: {
    type: String,
    required: true,
  },
  orderDetail: {
    type: Object,
    default: '',
  },
  status: {
    type: String,
    default: "",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isDelivery: {
    type: Boolean,
    default: false,
  },
  toAddress: {
    type: String,
  },
  userReceive: {
    type: String,
    default: ''
  }
}, {
  timestamps: true,
});

OrderSchema.plugin(mongoosePaginate);
const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;