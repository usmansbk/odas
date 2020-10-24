import db from '../models';

const { User, Doctor, Appointment } = db;
const ERROR_NAME = 'ODAS_Error';

export default class UserController {

  static getPublicProfile(req, res) {
    const { id } = req.params;
    User.findByPk(id)
      .then(user => {
        if (!user) throw new Error('The link you followed may be broken');
          res.render('user_public_profile', {
            title: 'Profile',
            user,
          })
      })
  }

  static getAppointment(req, res) {
    const { id } = req.params;
    const { user } = req.session;
    User.findByPk(user.id)
      .then(user => {
        return Appointment.findByPk(id)
          .then(appointment => {
            return appointment.getDoctor()
              .then(doctor => {
                return appointment.getPatient()
                  .then(patient => {
                    res.render('app_details',{
                      title: 'Appointment | Details',
                      isPatient: user.id === patient.id,
                      isDoctor: user.id === doctor.id,
                      isPending: appointment.status === 'PENDING',
                      user,
                      doctor,
                      patient,
                      appointment,
                })
              })
            })
          })
      })
    .catch(error => res.json(error));
  }

  static makeAppointment(req, res) {
    const { id } = req.params;
    const { user } = req.session;
    User.findByPk(user.id)
      .then(foundUser => {
        return User.findOne({include: [
          {
            model: Doctor,
            as: 'DoctorProfile',
            where: {
              id
            }
          }
        ]})
          .then(foundDoctor => {
            if (!foundDoctor) throw new Error('Failed to make appointment');
            return Appointment.create(req.body)
              .then(newAppointment => {
                req.session.hasAlert = newAppointment;
                return foundUser.addAppointment(newAppointment)
                  .then(result => foundDoctor.addAppointment(newAppointment))
                  .then(result => newAppointment.setPatient(foundUser))
                  .then(result => newAppointment.setDoctor(foundDoctor))
              });
          })
      })
      .then(() => {
        res.redirect('/dashboard');
      })
      .catch(error => res.json(error.message));
  }

  static newAppointment(req, res) {
    const { id } = req.params;
    const { user } = req.session;
    User.findByPk(user.id)
      .then(verifiedUser => {
        Doctor.findByPk(id)
        .then(doctor => {
          verifiedUser.getAppointments()
            .then(appointments => {
              const count = appointments.length;
              res.render('appointment', {
                date: new Date(),
                count: count + 1,
                user,
                doctor,
                title: 'New Appointment',
              })
            })
        })
      })
  }

  static editProfile(req, res) {
    const { id } = req.params;
    User.findByPk(id)
      .then(user => {
        res.render('edit_user_profile', {
          user,
          title: 'Edit Profile',
        })
      });
  }

  static updateProfile(req, res) {
    const { id } = req.params;
    User.findByPk(id)
      .then(user => {
        if (!user) throw new Error('The link you followed may be broken');
        user.update(req.body)
          .then((updatedUser) => {
            req.session.user = updatedUser;
            updatedUser.getDoctorProfile()
              .then(doctor => {
                if (doctor) {
                  return doctor.update(req.body)
                }
                return Doctor.create(req.body).then(newProfile => {
                  return updatedUser.setDoctorProfile(newProfile)
                    .then(() => newProfile)
                })
              })
              .then(updatedDoctor => {
                res.render('user_profile', {
                  title: 'Profile',
                  user: updatedUser,
                  doctor: updatedDoctor,
                })
              })
          });
      })
  }

  static getProfile(req, res) {
    const { id } = req.params;
    User.findByPk(id)
      .then(user => {
        if (!user) throw new Error('The link you followed may be broken');
        user.getDoctorProfile()
          .then(doctorProfile => {
            res.render('user_profile', {
              title: 'Profile',
              user,
              doctor: doctorProfile,
            })
          })
      })
  }

  static logIn(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email, password } })
      .then(foundUser => {
        if (!foundUser) throw new Error();
        req.session.user = foundUser;
        res.redirect('/dashboard');
      })
      .catch(error => {
        res.status(400).render('login', {
          title: 'ODAS | Login',
          error: 'Invalid email or password',
          message: '',
        });
      });
  }
  static createAccount(req, res) {
    User.findOrCreate({
      where: { email: req.body.email},
      defaults: req.body,
    })
    .then((user, created) => {
      if (!created) {
        const ConflictError = new Error('User already exist. Login or use another email');
        ConflictError.name = ERROR_NAME;
        throw ConflictError;
      }
      const { accountType } = req.body;
      if (!user || (accountType === 'PATIENT')) return user;
      return Doctor.create(req.body)
        .then((newDoctor => user.setDoctorProfile(newDoctor)))
        .then(() => user);
    })
    .then(newUser => {
      req.session.user = newUser;
      res.redirect('/dashboard');
    })
    .catch(error => {
      console.log(error);
      let message = 'Invalid form data';
      if (error.name === ERROR_NAME) message = error.message;
      res.status(400).render('signup', {
        title: 'ODAS | Sign Up',
        message,
      })
    })
  }
}