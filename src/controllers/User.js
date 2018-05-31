import db from '../models';

const { User } = db;

export default class UserController {
  static signUp(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error('Invalid details');
    }
    User.create(req.body)
      .then(newUser => {
        if (!newUser) throw new Error('User Already Exists! Login or choose another user id');
        req.session.user = newUser;
        res.redirect('/home');
      })
      .catch((error) => {
        res.status(400)
          .json({
            status: 'Failed',
            data: {
              message: 'Invalid details!',
              error: error.message,
            }
          })
      })
  }
}