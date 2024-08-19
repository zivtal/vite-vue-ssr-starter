import express from 'express';
import { dataController } from './data.controller.js';
import { GET_DATA } from './data.constants.js';

const router = express.Router();

router.get(`/data/:id`, dataController[GET_DATA]);

export default router;
