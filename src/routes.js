import express from 'express';
import app from './server';

const router = express.Router();

app.get('/home', (req, res) => {
  res.send('Welcome client');
});

app.get('/dashboard', (req, res) => {
  res.send('Welcome Doctor!');
});

// login/doctor
app.post('/login/doctor', (req, res) => {
  res.send('Welcome Doctor!');
});
// login/patient
app.post('/login', (req, res) => {
  res.send('Welcome Patient!');
});
// signup/doctor
app.post('/signup/doctor', (req, res) => {
  res.send('Created professional account');
});
// signup/patient
app.post('/signup', (req, res) => {
  res.send('Created client account');
});

// find doctor in location
app.post('/search', (req, res) => {
  res.send('Searching for doctor');
});
// schedule appointment
app.post('/schedule', (req, res) => {
  res.send('Schedule appointment');
});
// cancel appointment
app.post('/cancel', (req, res) => {
  res.send('Cancel appointment');
});

// get user preferred doctors list
app.get('/user/doctors', (req, res) => {
  res.send('Get all doctors');
});

// view doctors profile
app.get('/doctor/:dr_id', (req, res) => {
  res.send('Get doctor information');
});
// get appointsments
app.get('/doctor/appointments', (req, res) => {
  res.send('Get total number of appointments');
});

app.get('/doctor/appointment/:app_id', (req, res) => {
  res.send('Get specific appointment');
});

// charge route
router.get('/about', (req, res) => {
  res.send('About ODAS');
});

export default router;