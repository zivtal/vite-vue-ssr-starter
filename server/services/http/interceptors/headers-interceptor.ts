import type {AxiosRequestInterceptor} from './index.ts'
import type {AxiosError, InternalAxiosRequestConfig} from 'axios';

export const headersInterceptor: AxiosRequestInterceptor = {
    onFulfilled: (request: InternalAxiosRequestConfig) => {
        (request.headers || {}).timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        return request;
    },
    onRejected: (error: AxiosError) => Promise.reject(error),
};
