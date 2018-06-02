import { Appointment, User } from '../models';

export default class AppointmentController {
  static cancelAppointment(req, res) {
    const { id } = req.params;
    const { user } = req.session;

    User.findById(user.id)
      .then(user => {
        return Appointment.findById(id)
        .then(appointment => {
          return appointment.update({status: 'CANCELLED'})
            .then(() => {
              return appointment.getDoctor()
                .then((doctor) => {
                  return appointment.getPatient()
                    .then(patient => {
                      res.render('app_details', {
                        isPatient: false,
                        isDoctor: false,
                        isPending: appointment.status === 'PENDING',
                        appointment,
                        doctor,
                        patient,
                        user,
                      })
                    })
                })
            })
        })
      })
  }

  static confirmAppointment(req, res) {
    const { id } = req.params;
    const { user } = req.session;

    User.findById(user.id)
      .then(user => {
        return Appointment.findById(id)
        .then(appointment => {
          return appointment.update({status: 'CONFIRMED'})
            .then(() => {
              return appointment.getDoctor()
                .then((doctor) => {
                  return appointment.getPatient()
                    .then(patient => {
                      res.render('app_details', {
                        isPatient: false,
                        appointment,
                        doctor,
                        patient,
                        user,
                      })
                    })
                })
            })
        })
      })
  }
}