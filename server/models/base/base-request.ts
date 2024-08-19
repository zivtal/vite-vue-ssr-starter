import type { Request } from 'express';
import * as core from 'express-serve-static-core';

export type BaseRequest<ReqBody = any, ReqQuery = core.Query, ReqParams = core.ParamsDictionary> = Request<ReqParams, any, ReqBody, ReqQuery>;
export type BaseGetRequest<ReqQuery = core.Query, ReqParams = core.ParamsDictionary> = Request<ReqParams, never, ReqQuery>;
