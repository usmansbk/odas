import express from 'express';
import {
  UserController,
  DoctorController,
  RoutesController,
  AppointmentController,
} from './controllers';

const appRouter = express.Router();
const apiRouter = express.Router();

apiRouter.route('/api/cancel/appointment/:id')
  .post(AppointmentController.cancelAppointment);

apiRouter.route('/api/confirm/appointment/:id')
  .post(AppointmentController.confirmAppointment);

apiRouter.route('/api/view/appointment/:id')
  .get(UserController.getAppointment);

apiRouter.route('/api/appointment/:id')
  .get(UserController.newAppointment)
  .post(UserController.makeAppointment);

apiRouter.route('/api/user/:id')
  .get(UserController.getProfile);

apiRouter.route('/api/user/public/:id')
  .get(UserController.getPublicProfile);

apiRouter.route('/api/update/user/:id')
  .post(UserController.updateProfile);

apiRouter.route('/api/edit/user/:id')
  .get(UserController.editProfile);

apiRouter.route('/api/update/doctor/:id')
  .post(DoctorController.updateProfile);

apiRouter.route('/api/edit/doctor/:id')
.get(DoctorController.editProfile);

apiRouter.route('/api/doctor/:id')
  .get(DoctorController.getProfile);

appRouter.route('/search')
  .get(DoctorController.search);

appRouter.route('/dashboard')
  .get(RoutesController.dashboard);

appRouter.get('/',RoutesController.index);

appRouter.route('/login')
  .post(UserController.logIn)
  .get(RoutesController.login);

appRouter.route('/signup')
  .post(UserController.createAccount)
  .get(RoutesController.signup);

export {
  appRouter,
  apiRouter
};