import React from 'react';
import { Home, Users } from 'react-feather';

import async from '../components/Async';

// Guards


const Dashboard = async(() => import("../pages/index"));
const Patients = async(() => import("../pages/patients/Patients"));
const Patient = async(() => import("../pages/patients/Patient"));
// const Appointments = async(() => import("../pages/appointments/Appointments"));
const LogOut = async(() => import("../pages/logout"));
const SurveyForm = async(() => import("../pages/patients/surveys/Survey"));
const Doctors = async(() => import('../pages/doctors/Doctors'));
const DoctorEditor = async(() => import('../pages/doctors/DoctorEditor'));


const dashboardRoutes = {
  id: "",
  path: "/",
  header: "",
  children: null,
  component: Dashboard
};


const patientRoute = {
  id: "",
  path: "/patient/:id",
  header: "",
  children: null,
  component: Patient
};
const doctorRoute = {
  id: "",
  path: "/doctor/:id",
  header: "",
  children: null,
  component: DoctorEditor
};

const patientsRoutes = {
  id: "Patients",
  path: "",
  header: "",
  icon: <Users />,
  children: [{
    path: "/patients",
    name: "Find Patient",
    component: Patients,
  },
  {
    path: "/patient",
    name: "New Patient",
    component: Patient,
  },
  {
    path: "/surveys",
    name: "Surveys",
    component: SurveyForm,
  }
  ],

  component: Patients
};

const doctorRoutes = {
  id: "Doctors",
  path: "",
  header: "",
  icon: <Users />,
  children: [{
    path: "/doctors",
    name: "Find Doctor",
    component: Doctors,
  },
  {
    path: "/doctor",
    name: "New Doctor",
    component: DoctorEditor,
  }
  ],

  component: null
};

/* const appointmentRoutes = {
    id: "Appointments",
    path: "/appointments",
    header: "",
    icon: <Calendar />,
    children: null,
    component: Appointments
}; */

const logOutRoute = {
  id: "",
  path: "/logout",
  header: "",
  children: null,
  component: LogOut
};

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardRoutes,
  patientsRoutes,
  doctorRoutes,
  //appointmentRoutes,
  patientRoute,
  doctorRoute,

  logOutRoute
];



