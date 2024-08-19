import axios, { type AxiosError, type AxiosResponse } from 'axios';
import type { AxiosResponseInterceptor } from './index.ts';
import type { ErrorResponse } from '../../../models';
import ServerError from '../server-error.ts';

export const errorsInterceptor: AxiosResponseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    return response;
  },
  onRejected: async (error: AxiosError) => {
    const err: AxiosError<ErrorResponse> = error as AxiosError<ErrorResponse>;
    const serverError = new ServerError(err);

    if (axios.isCancel(error)) {
      throw serverError;
    }

    if (!err.response || err.response.status === 503) {
      return;
    }
  },
};
