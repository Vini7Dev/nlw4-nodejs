import { Router } from 'express';
import SendMailController from './controllers/SendMailController';
import SurveysController from './controllers/SurveysController';
import UsersController from './controllers/UsersController';

const routes = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

routes.post('/users', usersController.create);

routes.get('/surveys', surveysController.index);
routes.post('/surveys', surveysController.create);

routes.post('/send-mail', sendMailController.execute);

export default routes;