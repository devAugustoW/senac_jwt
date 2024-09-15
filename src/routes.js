import { Router } from 'express';
import UserController from './controller/UserController';
import LoginController from './controller/LoginController';

import authMiddleware from './middleware/authMiddleware';

const routes = new Router();

routes.post('/createUser', UserController.store);
routes.post('/login', LoginController.login);

routes.get('/users', authMiddleware, UserController.getUsers);
routes.put('/update/:id', authMiddleware, UserController.updateUser);
routes.delete('/delete/:id', authMiddleware, UserController.delete);

export default routes;