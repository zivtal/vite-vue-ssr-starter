import type { AxiosResponse, InternalAxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';
import { errorsInterceptor } from './errors-interceptor.ts';
import { removeReturnCodeInterceptor } from './remove-return-code-interceptor.ts';
import { headersInterceptor } from './headers-interceptor.ts';

export type AxiosRequestInterceptor = {
  onFulfilled: (value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRejected: (error: AxiosError) => AxiosError | Promise<AxiosError>;
};

export type AxiosResponseInterceptor = {
  onFulfilled: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected: (error: AxiosError) => AxiosError | Promise<AxiosError> | Promise<unknown>;
};

// register interceptors here
export const requestInterceptors: Array<AxiosRequestInterceptor> = [headersInterceptor];
export const responseInterceptors: Array<AxiosResponseInterceptor> = [errorsInterceptor, removeReturnCodeInterceptor];

export const registerInterceptors = (api: AxiosInstance) => {
  for (const interceptor of requestInterceptors) {
    api.interceptors.request.use(
      (value: InternalAxiosRequestConfig) => interceptor.onFulfilled(value),
      (error: AxiosError) => interceptor.onRejected(error)
    );
  }

  for (const interceptor of responseInterceptors) {
    api.interceptors.response.use(
      (value: AxiosResponse) => interceptor.onFulfilled(value),
      (error: AxiosError) => interceptor.onRejected(error)
    );
  }
};
