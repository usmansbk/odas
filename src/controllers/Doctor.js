import db from '../models';
import { categories } from '../helpers';

const { Doctor } = db;

export default class DoctorController {

  static search(req, res) {
    const { category, latitude, longitude } = req.query;
    Doctor.findAll()
      .then(doctors => {
        res.render('search', {
          selectedCategory: category,
          doctors, categories
        });
      })
      .catch(error => {
        throw error;
      });
  }

  static editProfile(req, res) {
    const { id } = req.params;
    Doctor.findById(id)
      .then(doctor => {
        if (!doctor) throw new Error("The page you followed may be broken");
        res.render("edit_dr_profile", {
          doctor,
          title: `Edit | Dr. ${doctor.surname}`
        });
      })
      .catch(error => {
        res.status(400).send(error.message);
      })
  }

  static getProfile(req, res) {
    const { id } = req.params;
    Doctor.findById(id)
      .then(doctor => {
        if (!doctor) throw new Error("The page you followed may be broken");
        res.render('drprofile', {
          doctor,
          title: `Profile | Dr. ${doctor.surname}`,
        });
      })
      .catch(error => {
        res.status(400).send(error.message);
      });
  }

  static updateProfile(req, res) {
    const { id } = req.params;
    const user = req.session.user;
    Doctor.findById(id)
      .then(doctor => {
        if (!doctor) throw new Error('The page you followed may be broken');
        console.log(req.body);
        for (let key in req.body) {
          console.log(key, req.body[key]);
        }
        return doctor.update(req.body);
      })
      .then((updatedProfile) => {
        res.render('user_profile', {
          title: 'Profile',
          user,
          doctor: updatedProfile
        });
      })
      .catch((error) => console.log(error.message))
  }
}