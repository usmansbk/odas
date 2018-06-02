import { categories } from '../helpers';

export const auth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).render('login', {
      error: "Not logged in!",
      message: '',
    })
  }
}

export const deAuth = (req, res, next) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect('/');
}