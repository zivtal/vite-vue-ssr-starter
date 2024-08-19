import axios from 'axios';
import config from '../../config';
import { registerInterceptors } from './interceptors';

const TIMEOUT = 30 * 1000; // 30 seconds

export const RequestHeaders = {
  CONTENT_TYPE: 'Content-type',
};

export const api = axios.create({
  withCredentials: true,
  baseURL: config.BASE_API || 'https://api.dev.productionbook.io:3030/web',
  timeout: TIMEOUT,
  headers: {
    [RequestHeaders.CONTENT_TYPE]: 'application/json; charset=UTF-8',
  },
});

registerInterceptors(api);

export * from './http.ts';
