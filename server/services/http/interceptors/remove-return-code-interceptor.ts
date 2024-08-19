import type { AxiosError, AxiosResponse } from 'axios';
import type { AxiosResponseInterceptor } from './index.ts';

export const removeReturnCodeInterceptor: AxiosResponseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    if (response?.data?.returnCode === 0) {
      delete response.data.returnCode;
    }

    return response;
  },
  onRejected: (error: AxiosError) => Promise.reject(error),
};
