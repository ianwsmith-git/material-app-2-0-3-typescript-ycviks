"use strict";
exports.__esModule = true;
exports.sidebarRoutes = void 0;
var icons_1 = require("@material-ui/icons");
var react_1 = require("react");
var react_feather_1 = require("react-feather");
var Async_1 = require("../components/Async");
// Guards
var Today = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/today"); }); });
var Patients = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/patients/Patients"); }); });
var Patient = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/patients/Patient"); }); });
var AppointmentsCalendar = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/appointments/AppointmentsDashboard"); }); });
var LogOut = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/logout"); }); });
var SurveyForm = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/patients/surveys/Survey"); }); });
var Doctors = Async_1["default"](function () { return Promise.resolve().then(function () { return require('../pages/doctors/Doctors'); }); });
var DoctorEditor = Async_1["default"](function () { return Promise.resolve().then(function () { return require('../pages/doctors/DoctorEditor'); }); });
var DoctorsCalendars = Async_1["default"](function () { return Promise.resolve().then(function () { return require('./../pages/appointments/DoctorsCalendars'); }); });
var PatientsAppointments = Async_1["default"](function () { return Promise.resolve().then(function () { return require('./../pages/appointments/PatientsAppointments'); }); });
var PatientAppointment = Async_1["default"](function () { return Promise.resolve().then(function () { return require('./../pages/appointments/PatientAppointment'); }); });
var patientRoute = {
    id: "",
    path: "/patient/:id",
    header: "",
    children: null,
    component: Patient
};
var doctorRoute = {
    id: "",
    path: "/doctor/:id",
    header: "",
    children: null,
    component: DoctorEditor
};
var patientsRoutes = {
    id: "Patients",
    path: "",
    header: "",
    icon: react_1["default"].createElement(react_feather_1.Users, null),
    children: [{
            path: "/patients",
            name: "Find Patient",
            component: Patients
        },
        {
            path: "/patient",
            name: "New Patient",
            component: Patient
        },
        {
            path: "/surveys",
            name: "Surveys",
            component: SurveyForm
        }
    ],
    component: Patients
};
var doctorRoutes = {
    id: "Doctors",
    path: "",
    header: "",
    icon: react_1["default"].createElement(react_feather_1.Users, null),
    children: [{
            path: "/doctors",
            name: "Find Doctor",
            component: Doctors
        },
        {
            path: "/doctor",
            name: "New Doctor",
            component: DoctorEditor
        }
    ],
    component: null
};
var appointmentRoutes = {
    id: "Appointments",
    path: "/",
    header: "",
    icon: react_1["default"].createElement(react_feather_1.Calendar, null),
    children: [{
            path: "/appointments/calendar",
            name: "Schedule Appointments",
            component: AppointmentsCalendar
        }, {
            path: "/appointments/patients",
            name: "Find Appointments",
            component: PatientsAppointments
        },
        {
            path: "/appointments/newpatientappointment",
            name: "New Appointment",
            component: PatientAppointment
        },
        {
            path: "/appointments/patients",
            name: "Doctors Calenddars",
            component: DoctorsCalendars
        }
    ],
    component: null
};
var logOutRoute = {
    id: "",
    path: "/logout",
    header: "",
    children: null,
    component: LogOut
};
var todayRoute = {
    id: "Today",
    path: "/",
    header: "",
    icon: react_1["default"].createElement(icons_1.DashboardOutlined, null),
    children: null,
    component: Today
};
// Routes visible in the sidebar
exports.sidebarRoutes = [
    todayRoute,
    appointmentRoutes,
    patientsRoutes,
    doctorRoutes,
    //appointmentRoutes,
    patientRoute,
    doctorRoute,
    logOutRoute
];
