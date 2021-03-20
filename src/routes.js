import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import ShopController from './app/controllers/ShopController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/shops', ShopController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/products', upload.single('image'), ProductController.store);

export default routes;
