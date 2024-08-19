import type { BaseRequest, SSRData } from '../../models';
import { GET_CONTENT } from './web.constants';
import { webService } from './web.service';

export const webController = {
  [GET_CONTENT]: async (req: BaseRequest<never, { lang?: string }>): Promise<SSRData> => {
    const language = req.query.lang || req.session.language;
    const identify = req.session.identify || req.session.domain || req.headers.host;

    return (await webService[GET_CONTENT](identify!, language, req.headers.cookie)) || {};
  },
};
