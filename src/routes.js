import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import ShopController from './app/controllers/ShopController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import ItemController from './app/controllers/ItemController';
import StockController from './app/controllers/StockController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/shops', ShopController.store);
routes.post('/sessions', SessionController.store);

routes.get('/items', ItemController.index);
routes.get('/items/:id', ItemController.show);
routes.post('/stocks/:id', StockController.store);
routes.get('/stocks/:id', StockController.show);

routes.use(authMiddleware);

routes.post('/products', upload.single('image'), ProductController.store);
routes.get('/products', ProductController.index);

export default routes;
