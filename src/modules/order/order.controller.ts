import jwt from 'jsonwebtoken';
import axios from 'axios';
import moment from 'moment';
import sha256 from 'sha256';
import BaseController from '../../common/base/controller.base';
import { NotFoundException, UnauthorizedException, BadRequestException } from '../../common/error/index';
import { Types } from 'mongoose';
import {
  ERR_MISSING_INPUT, ERR_USER_NOT_FOUND,
} from './order.error';

import OrderRepository from './order.repository';
import { ERR_CREATE_ORDER } from './order.message';
import UserReponsitory from '../user/user.repository';

class OrderController extends BaseController {
  orderRepository: OrderRepository;
  userRepository: UserReponsitory;
  constructor() {
    super();
    this.orderRepository = new OrderRepository();
    this.userRepository = new UserReponsitory();
  }

  async create(req: any, res: any, next: any) {
    let { userid: userID } = req.headers;
    let { orderDetail, toAddress, userReceive } = req.body;
    try {
      console.log(userID, orderDetail, toAddress, userReceive);
      if (!userID || !orderDetail) {
        throw new BadRequestException(ERR_MISSING_INPUT);
      }
      let getUser = await this.userRepository.getById(userID);
      if (!getUser) {
        throw new BadRequestException(ERR_USER_NOT_FOUND);
      }
      let createOrder = "";
      if (toAddress && userReceive) {
        createOrder = await this.orderRepository.create({
          userID,
          orderDetail,
          isDelivery: true,
          toAddress,
          userReceive,
        });
        if (!createOrder) {
          throw new BadRequestException(ERR_CREATE_ORDER)
        }
        return res.json(
          createOrder
        )
      }
      createOrder = await this.orderRepository.create({
        userID,
        orderDetail,
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

  async getAll(req: any, res: any, next: any) {
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