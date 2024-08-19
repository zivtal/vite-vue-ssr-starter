import type { Response } from 'express';
import type { BaseGetRequest } from '../../models';
import { GET_DATA } from './data.constants.js';
import { dataService } from './data.service.ts';

export const dataController = {
  [GET_DATA]: async (req: BaseGetRequest<{ cache?: 'none' }, { id: string }>, res: Response<Buffer>) => {
    try {
      const identify = req.session.identify;
      const isNoCache = req.query.cache === 'none';

      if (!req.params.id || !identify) {
        res.status(400).end();

        return;
      }

      const { type, data } = await dataService[GET_DATA](req.params.id, identify!);

      res
        .status(200)
        .type(type)
        .set('Cache-control', !isNoCache ? `public, max-age=${24 * 60 * 60}` : 'no-cache')
        .send(data);
    } catch (e) {
      res.status(204).send(e as any);
    }
  },
};
