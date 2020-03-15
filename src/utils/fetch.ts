import axios from 'axios';
import { InternalServerErrorException, UnauthorizedException } from '../common/error/';
import { INTERNAL_SERVER_ERROR } from '../common/errorMessages';

import services from './service_info_boot';
// const services = require('../../service_info.dev.json');

export default function fetchAPI(service_name: string) {
  const service = services[service_name];
  if (!service) {
    throw new InternalServerErrorException(INTERNAL_SERVER_ERROR);
  }
  const instance = axios.create({
    baseURL: `${service.host}:${service.port}/`,
    headers: {
      apiKey: service.apiKey,
      apiSecret: service.apiSecret,
    },
    transformResponse: [function (data: any) {
      const objData = JSON.parse(data)
      if (objData.error) {
        throw new InternalServerErrorException(INTERNAL_SERVER_ERROR)
      }
      return objData;
    }],
  });
  return {
    get: instance.get,
    post: instance.post,
    patch: instance.patch,
    delete: instance.delete,
  }
}