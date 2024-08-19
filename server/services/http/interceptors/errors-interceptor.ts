import type { AxiosResponseInterceptor } from './index.ts';
import type { ErrorResponse } from '../../../models';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import ServerError from '../server-error.ts';

export const errorsInterceptor: AxiosResponseInterceptor = {
  onFulfilled: (response: AxiosResponse) => {
    return response;
  },
  onRejected: async (error: AxiosError) => {
    const err: AxiosError<ErrorResponse> = error as AxiosError<ErrorResponse>;
    const serverError = new ServerError(err);

    if (axios.isCancel(error)) {
      return;
    }

    throw serverError;
  },
};
