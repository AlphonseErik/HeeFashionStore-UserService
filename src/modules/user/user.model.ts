import * as mongoose from 'mongoose';
import uuid from 'uuid'
import randomstring from 'randomstring';
import { Schema } from 'mongoose';
const bcrypt = require('bcryptjs');
import { IUser } from './user.interface';
import mongoosePaginate from 'mongoose-paginate';

const UserSchema = new Schema({
  ID: {
    type: String,
    default: function () {
      return uuid.v1();
    },
  },
  firstName: {
    type: String,
    default: '',
  },
  birthDate: {
    type: Date,
    default: Date.now
  },
  lastName: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  password: {
    type: String,
  },
  address: {
    type: String,
    default: '',
  },
  mobilePhone: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  isVerifyEmail: {
    type: Boolean,
    default: false,
  },
  emailVerifycode: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  type: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});


UserSchema.pre<IUser>('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) { return next(); }
  // Hash password
  const hash = bcrypt.hashSync(this.password, process.env.SECRET_PASSWORD);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};
UserSchema.plugin(mongoosePaginate);
const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;