import express from 'express';
import { FAVICON, MANIFEST } from './web.constants';
import { webController } from './web.controller';

const router = express.Router();

router.get(`/favicon.ico`, webController[FAVICON]);
router.get(`/manifest.json`, webController[MANIFEST]);

export default router;
