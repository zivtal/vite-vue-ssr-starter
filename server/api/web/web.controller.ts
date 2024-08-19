import type { Response } from 'express';
import type { BaseRequest, GetContent } from '../../models';
import { FAVICON, GET_CONTENT, MANIFEST } from './web.constants';
import { webService } from './web.service';
import { dataService } from '../data/data.service';
import { GET_DATA } from '../data/data.constants';

export const webController = {
  [GET_CONTENT]: async (req: BaseRequest<never, { lang?: string }>): Promise<GetContent> => {
    const language = req.query.lang || req.session.language;
    const identify = req.session.identify || req.session.domain || req.headers.host;

    try {
      const data = (await webService[GET_CONTENT](identify!, language, req.headers.cookie)) || {};

      req.session.identify = data.templateId;
      req.session.domain = req.headers.host;
      req.session.favicon = data.favicon;
      req.session.manifest = data.manifest;

      return data;
    } catch (e) {
      return {} as GetContent;
    }
  },

  [FAVICON]: async (req: BaseRequest<never, { lang?: string }>, res: Response) => {
    try {
      const data = req.session.favicon || (await webController[GET_CONTENT](req)).favicon;
      const identify = req.session.identify || req.session.domain || req.headers.host;
      const favicon = await dataService[GET_DATA](data!, identify!);

      res.status(200).type('image/x-icon').send(favicon.data);
    } catch (e) {
      res.status(204).send(e as any);
    }
  },

  [MANIFEST]: async (req: BaseRequest<never, { lang?: string }>, res: Response) => {
    const manifest = req.session.manifest || (await webController[GET_CONTENT](req)).manifest;

    res.status(200).type('application/manifest+json').json(manifest);
  },
};
