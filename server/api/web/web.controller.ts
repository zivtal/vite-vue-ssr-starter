import type { Response } from 'express';
import type { BaseRequest, GetContent, GetContentReq } from '../../models';
import { FAVICON, GET_CONTENT, ID_KEY, MANIFEST } from './web.constants';
import { webService } from './web.service';
import { dataService } from '../data/data.service';
import { GET_DATA } from '../data/data.constants';

export const webController = {
  [GET_CONTENT]: async (req: BaseRequest<never, { lang?: string }>): Promise<GetContent> => {
    const host = (req.session.domain || req.headers.host)!;
    const { lang = req.session.language } = req.query;

    try {
      const data = (await webService[GET_CONTENT](host, { lang }, req.headers.cookie)) || {};

      req.session.domain = req.headers.host;
      req.session.identify = data[ID_KEY];
      req.session.favicon = data.favicon;
      req.session.manifest = data.manifest;

      return data;
    } catch (e) {
      return {} as GetContent;
    }
  },

  [FAVICON]: async (req: BaseRequest<never, GetContentReq>, res: Response) => {
    try {
      const { favicon: faviconId, [ID_KEY]: idKey } = await webController[GET_CONTENT](req);
      const identify = req.session.identify || idKey;

      if (!faviconId || !identify) {
        res.status(204).end();

        return;
      }

      const favicon = await dataService[GET_DATA](faviconId, identify);

      if (!favicon) {
        res.status(204).end();

        return;
      }

      res.status(200).type('image/x-icon').send(favicon.data);
    } catch (e) {
      res.status(204).send(e as any);
    }
  },

  [MANIFEST]: async (req: BaseRequest<never, { lang?: string }>, res: Response) => {
    const manifest = req.session.manifest || (await webController[GET_CONTENT](req)).manifest;

    if (manifest) {
      res.status(200).type('application/manifest+json').json(manifest);
    } else {
      res.status(404).end();
    }
  },
};
