"use strict";
exports.__esModule = true;
exports.sidebarRoutes = void 0;
var react_1 = require("react");
var react_feather_1 = require("react-feather");
var Async_1 = require("../components/Async");
// Guards
var Dashboard = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/index"); }); });
var Patients = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/patients/Patients"); }); });
var Patient = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/patients/Patient"); }); });
// const Appointments = async(() => import("../pages/appointments/Appointments"));
var LogOut = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/logout"); }); });
var SurveyForm = Async_1["default"](function () { return Promise.resolve().then(function () { return require("../pages/patients/surveys/Survey"); }); });
var Doctors = Async_1["default"](function () { return Promise.resolve().then(function () { return require('../pages/doctors/Doctors'); }); });
var DoctorEditor = Async_1["default"](function () { return Promise.resolve().then(function () { return require('../pages/doctors/DoctorEditor'); }); });
var dashboardRoutes = {
    id: "",
    path: "/",
    header: "",
    children: null,
    component: Dashboard
};
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
/* const appointmentRoutes = {
    id: "Appointments",
    path: "/appointments",
    header: "",
    icon: <Calendar />,
    children: null,
    component: Appointments
}; */
var logOutRoute = {
    id: "",
    path: "/logout",
    header: "",
    children: null,
    component: LogOut
};
// Routes visible in the sidebar
exports.sidebarRoutes = [
    dashboardRoutes,
    patientsRoutes,
    doctorRoutes,
    //appointmentRoutes,
    patientRoute,
    doctorRoute,
    logOutRoute
];
