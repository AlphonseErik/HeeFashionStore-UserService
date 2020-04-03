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

import OrderRepository from './order.repository';
import { ERR_CREATE_ORDER } from './order.message';

class OrderController extends BaseController {
  orderRepository: OrderRepository;
  constructor() {
    super();
    this.orderRepository = new OrderRepository();
  }

  async create(req: any, res: any, next: any) {
    let { userid: userID } = req.header;
    let { orderDetail, totalPrice, type, toAddress, userReceive } = req.body;
    try {
      if (!userID || !orderDetail || !totalPrice) {
        throw new BadRequestException(ERR_MISSING_INPUT);
      }
      if (toAddress && userReceive) {
        let createOrder = await this.orderRepository.create({
          userID,
          orderDetail,
          totalPrice,
          type,
          isDelivery: true,
          toAddress,
          userReceive,
        });
        if (createOrder!) {
          throw new BadRequestException(ERR_CREATE_ORDER)
        }
        return res.json(
          createOrder
        )
      }
      let createOrder = await this.orderRepository.create({
        userID,
        orderDetail,
        totalPrice,
        type,
        isDelivery: false,
      });
      if (!createOrder) {
        throw new BadRequestException(ERR_CREATE_ORDER);
      }
      return res.json(
        createOrder
      )
    } catch (err) {
      next(err);
    }
  }

  async getList(req: any, res: any, next: any) {
    let { userid: userID } = req.params;
    let { limit, page } = req.query;
    try {
      let orderList = await this.orderRepository.getList(userID, limit, page);
      if (!orderList) {
        throw new BadRequestException();
      }
      return res.json(
        orderList
      )
    } catch (err) {
      next(err)
    }
  }
}

export default OrderController;