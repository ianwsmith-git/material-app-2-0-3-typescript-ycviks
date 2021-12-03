import { DashboardOutlined } from '@material-ui/icons';
import React from 'react';
import { Calendar as CalendarIcon, Users } from 'react-feather';

import async from '../components/Async';

// Guards


const Today = async(() => import("../pages/today"));
const Patients = async(() => import("../pages/patients/Patients"));
const Patient = async(() => import("../pages/patients/Patient"));
const AppointmentsCalendar = async(() => import("../pages/appointments/AppointmentsDashboard"));
const LogOut = async(() => import("../pages/logout"));
const SurveyForm = async(() => import("../pages/patients/surveys/Survey"));
const Doctors = async(() => import('../pages/doctors/Doctors'));
const DoctorEditor = async(() => import('../pages/doctors/DoctorEditor'));
const DoctorsCalendars = async(() => import('./../pages/appointments/DoctorsCalendars'));
const PatientsAppointments = async(() => import('./../pages/appointments/PatientsAppointments'));
const PatientAppointment = async(() => import('./../pages/appointments/PatientAppointment'));

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

const appointmentRoutes = {
  id: "Appointments",
  path: "/",
  header: "",
  icon: <CalendarIcon />,
  children: [{
    path: "/appointments/calendar",
    name: "Schedule Appointments",
    component: AppointmentsCalendar,
  }, {
    path: "/appointments/patients",
    name: "Find Appointments",
    component: PatientsAppointments,
  },
  {
    path: "/appointments/newpatientappointment",
    name: "New Appointment",
    component: PatientAppointment,
  },
  {
    path: "/appointments/patients",
    name: "Doctors Calenddars",
    component: DoctorsCalendars,
  }
  ],
  component: null
};

const logOutRoute = {
  id: "",
  path: "/logout",
  header: "",
  children: null,
  component: LogOut
};

const todayRoute = {
  id: "Today",
  path: "/",
  header: "",
  icon: <DashboardOutlined />,
  children: null,
  component: Today
};

// Routes visible in the sidebar
export const sidebarRoutes = [
  todayRoute,
  appointmentRoutes,
  patientsRoutes,
  doctorRoutes,
  //appointmentRoutes,
  patientRoute,
  doctorRoute,

  logOutRoute
];



