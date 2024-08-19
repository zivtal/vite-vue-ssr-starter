import type { Response } from 'express';

export type BaseResponse<T = Record<never, never>> = Response<{ returnCode: number } & T>;
