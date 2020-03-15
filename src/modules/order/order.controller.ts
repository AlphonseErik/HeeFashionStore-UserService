import jwt from 'jsonwebtoken';
import axios from 'axios';
import moment from 'moment';
import sha256 from 'sha256';
import BaseController from '../../common/base/controller.base';
import { NotFoundException, UnauthorizedException, BadRequestException } from '../../common/error/index';
import { Types } from 'mongoose';
import {
  ERR_MISSING_INPUT,
} from './order.error';

import fetchAPI from './../../utils/fetch';
import OrderRepository from './order.repository';
import { ERR_CREATE_ORDER } from './order.message';

class AuthController extends BaseController {
  orderRepository: OrderRepository;
  constructor() {
    super();
    this.orderRepository = new OrderRepository();
  }

  async create(req: any, res: any, next: any) {
    let { productname, quantity, price } = req.query;
    try {
      const createOrder = await this.orderRepository.create({ productname, quantity, price });
      if (!createOrder) {
        throw new BadRequestException(ERR_CREATE_ORDER);
      }
      return res.json({
        createOrder
      })
    } catch (err) {
      next(err);
    }
  }

  async getList(req: any, res: any, next: any) {
    let { limit, page } = req.query;
    let orderList = await this.orderRepository.getList(limit, page);
  }
}

export default AuthController;