import UserModel from './model/user.model';
import { IUser, ICreateUser } from './user.interface';
const bcrypt = require('bcryptjs');

class UserReponsitory {
  constructor() {
    UserModel.find({}).then(res => {
      if (res.length <= 0) {
        UserModel.create({
          username: "Admin",
          password: "123456",
          isVerifyEmail: true,
          isSuperAdmin: true,
        })
      }
    })
  }

  async create(data: ICreateUser): Promise<IUser | null | any> {
    return UserModel.create(data);
  }

  async getUsernameAuth(username: string): Promise<IUser | null | any> {
    return UserModel.findOne({ username, isDeleted: false });
  }
  async getUserNotIncludeKeyValueAndId(key: string, value: string, id: string): Promise<IUser | null | any> {
    return UserModel.findOne({
      ID: id,
      [key]: {
        $ne: value
      },
      isDeleted: false
    });
  }
  async getUserByUsername(username: string): Promise<IUser | null | any> {
    return UserModel.findOne({
      username,
      isDeleted: false,
      isSuperAdmin: false
    });
  }

  async getUserByEmail(email: string): Promise<IUser | null | any> {
    return UserModel.findOne({
      email,
      isDeleted: false,
      isSuperAdmin: false
    });
  }

  async getUserByPhone(phone: string): Promise<IUser | null | any> {
    return UserModel.findOne({
      phone,
      isDeleted: false,
      isSuperAdmin: false
    });
  }

  async update(id: string, dataUpdate: any) {
    if (dataUpdate.password) {
      dataUpdate.password = bcrypt.hashSync(dataUpdate.password, process.env.SECRET_PASSWORD);
    }
    const isUpdated = await UserModel.updateOne({
      ID: id,
      isSuperAdmin: false,
    }, {
      ...dataUpdate,
    });
    if (isUpdated.nModified > 0) {
      return true;
    }
    return false;
  }

  async updateByData(data: any, dataUpdate: any) {
    if (dataUpdate.password) {
      dataUpdate.password = bcrypt.hashSync(dataUpdate.password, process.env.SECRET_PASSWORD);
    }
    const isUpdated = await UserModel.updateOne({
      ...data,
    }, {
      ...dataUpdate,
    });
    if (isUpdated.nModified > 0) {
      return true;
    }
    return false;
  }

  async updatePassword(id: string, dataUpdate: any) {
    dataUpdate.password = bcrypt.hashSync(dataUpdate.password, process.env.SECRET_PASSWORD);
    const isUpdated = await UserModel.updateOne({
      ID: id,
    }, {
      ...dataUpdate,
    });
    if (isUpdated.nModified > 0) {
      return true;
    }
    return false;
  }

  async getAll(limit: number = 12, page: number = 1, types: any) {
    return UserModel.paginate({
      isDeleted: false,
      isSuperAdmin: false,
      type: {
        $in: types
      },
    }, {
      sort: { createdAt: -1 },
      limit: Number(limit),
      page: Number(page),
      select: "-privateKey -pk -_id -password"
    });
  }

  async getAllNoPaginate(data: any) {
    return UserModel.find({
      isDeleted: false,
      isSuperAdmin: false,
      type: data.type,
    })
  }

  async remove(targetId: string): Promise<Boolean> {
    const isUpdated = await UserModel.updateOne({
      ID: targetId,
      isSuperAdmin: false,
    }, { isDeleted: true });
    if (isUpdated.nModified > 0) {
      return true;
    }
    return false;
  }

  async getById(targetId: string, select: string = ""): Promise<IUser | null | any> {
    return UserModel.findOne({
      ID: targetId,
      isDeleted: false,
    }).select(select);
  }

  async getUserByUserNameAndPassword(username: string): Promise<IUser | null> {
    return UserModel.findOne({
      $or: [
        { username: username },
        { mobilePhone: username },
        { email: username },
      ],
      isActive: true,
      isDeleted: false,
    }).select('-_id -createdAt -updatedAt -__v -isDeleted -firstName -type -emailVerifycode');
  }

  async search(keyword: string = '', limit: number = 12, page: number = 1, types: any) {
    const regex = new RegExp(keyword, 'i')
    return UserModel.paginate({
      isDeleted: false,
      isSuperAdmin: false,
      type: {
        $in: types
      },
      $or: [
        { username: { $regex: regex } },
        { mobilePhone: { $regex: regex } },
        { email: { $regex: regex } },
      ]
    }, {
      sort: { createdAt: -1 },
      limit: Number(limit),
      page: Number(page),
      select: "-privateKey -pk -_id -password"
    })
  }

  async getUsersByIds(ids: string[], select: string = "") {
    const users = await UserModel.find({
      isDeleted: false,
      ID: {
        $in: ids
      }
    }).select(select);
    return users;
  }
}

export default UserReponsitory;