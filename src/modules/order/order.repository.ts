import OrderModel from './models/order.model';
import { IOrder, ICreateOrder } from './order.interface';

class OrderRepository {
  constructor() {
  }

  async create(data: any): Promise<ICreateOrder | null | any> {
    return OrderModel.create(data);
  }

  async getList(userID: string, option: any = undefined, limit: number = 12, page: number = 1) {
    return OrderModel.paginate({
      ...option ? { option } : {},
      userID,
      isDeleted: false,
    }, {
      sort: { createdAt: -1 },
      limit: Number(limit),
      page: Number(page),
      select: "-_id -createdAt -__v "
    });
  }
}

export default OrderRepository;