import { categories } from '../helpers';
import { User } from '../models';

const APP_NAME = 'ODAS';
const DEFAUL_CATEGORY = 'General Practioners';

const isSigned = (req) => {
  const { session } = req;
  return (session && session.user);
}

export default class Routes {
  static index(req, res) {
    if (isSigned(req)) {
      res.redirect('/dashboard');
    } else {
      res.render('index', {
        title: APP_NAME,
        categories,
        selectedCategory: DEFAUL_CATEGORY,
      });
    }
  }

  static dashboard(req, res) {
    const { id } = req.session.user;
    User.findById(id)
      .then(user => user.getAppointments())
      .then(appointments => {
        res.render('dashboard', {
          appointments,
          categories,
          user: req.session.user,
          selectedCategory: DEFAUL_CATEGORY,
        })
      })
  }

  static signup(req, res) {
    res.render('signup', {
      title: `${APP_NAME} | Sign Up`,
      message: '',
      error: '',
    })
  }

  static login(req, res) {
    if (isSigned(req)) {
      res.redirect('/dashboard');
    } else {
      res.render('login', {
        title: `${APP_NAME} | Log In`,
        message: 'Log in to make appointments',
        error: '',
      })
    }
  }
}