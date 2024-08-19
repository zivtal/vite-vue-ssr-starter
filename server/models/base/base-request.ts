import type { Request } from 'express';
import * as core from 'express-serve-static-core';

export interface BaseRequest<ReqBody = any, ReqQuery = core.Query, ReqParams = core.ParamsDictionary>
  extends Request<ReqParams, any, ReqBody, ReqQuery> {}
