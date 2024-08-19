import type { ErrorResponse, ErrorResponseMessage } from '../../models';
import { AxiosError } from 'axios';

export default class ServerError extends Error {
  public constructor(e: AxiosError<ErrorResponse> | string) {
    super(e instanceof AxiosError ? e.message : e);

    if (e instanceof AxiosError) {
      this.errorMessage = e.response?.data?.errorMessage || [];
      this.errorCode = e.response?.data.errorCode as number;
      this.errorData = e.response?.data as ErrorResponse;

      return;
    }

    this.errorCode = 9999;
    this.errorMessage = [{ message: e }];
  }

  public errorMessage: Array<ErrorResponseMessage>;
  public errorCode: number;
  public errorData: ErrorResponse | undefined;
}
