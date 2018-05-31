import express from 'express';
import session from 'express-session';
import uuid from 'uuid/v1'
import morgan from 'morgan';
import routes from './routes';

app.set('view engine', 'ejs');

const app = express();
const secret = uuid();
const clientErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    error: 'Something failed!',
  });
};

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret }));
app.use(morgan('tiny'));
app.use(routes);
app.use(clientErrorHandler);

export default app;