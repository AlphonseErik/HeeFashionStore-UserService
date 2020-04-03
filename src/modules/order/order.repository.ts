import OrderModel from './models/order.model';
import { IOrder, ICreateOrder } from './order.interface';

class OrderRepository {
  constructor() {
  }

  async create(data: any): Promise<ICreateOrder | null | any> {
    return OrderModel.create({ ...data });
  }

  async getList(userID: string, limit: number = 12, page: number = 1) {
    return OrderModel.paginate({
      userID,
      isDeleted: false,
    }, {
      sort: { createdAt: -1 },
      limit: Number(limit),
      page: Number(page),
      select: "-_id -ID -createdAt -__v "
    });
  }
}

export default OrderRepository;