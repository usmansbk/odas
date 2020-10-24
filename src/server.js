import express from 'express';
import session from 'express-session';
import path from 'path';
import uuid from 'uuid/v1';
import nocache from 'nocache';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import { appRouter, apiRouter } from './routes';
import { auth as authMiddleware, checkSession, deAuth } from './middlewares';

const app = express();

app.set('view engine', 'ejs');

const secret = uuid();
const clientErrorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Server has failed!',
  });
};

app.use(nocache());
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret, resave: false, saveUninitialized: true }));
app.use(morgan('tiny'));
app.use('/api', authMiddleware);
app.use('/dashboard', authMiddleware);
app.use('/logout', deAuth);
app.use(apiRouter);
app.use(appRouter);
app.use(clientErrorHandler);

export default app;