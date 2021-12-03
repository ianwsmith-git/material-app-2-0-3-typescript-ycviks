"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var date_fns_1 = require("@date-io/date-fns");
var core_1 = require("@material-ui/core");
var colors_1 = require("@material-ui/core/colors");
var icons_1 = require("@material-ui/icons");
var lab_1 = require("@material-ui/lab");
var pickers_1 = require("@material-ui/pickers");
var system_1 = require("@material-ui/system");
var formik_1 = require("formik");
var react_1 = require("react");
var macro_1 = require("styled-components/macro");
var Yup = require("yup");
var DiaRegApi_1 = require("../../api/DiaRegApi");
var CloseDialogButton_1 = require("../../components/dialogs/CloseDialogButton");
var ListSelectDialog_1 = require("../../components/dialogs/ListSelectDialog");
var DiaRegApi_2 = require("./../../api/DiaRegApi");
var Divider = macro_1["default"](core_1.Divider)(system_1.spacing);
var Card = macro_1["default"](core_1.Card)(system_1.spacing);
var Alert = macro_1["default"](lab_1.Alert)(system_1.spacing);
var TextField = macro_1["default"](core_1.TextField)(system_1.spacing);
var Button = macro_1["default"](core_1.Button)(system_1.spacing);
var validationSchema = Yup.object().shape({
    patient: Yup.object().shape({}).required("A patient is required."),
    doctor: Yup.object().shape({}).required("A doctor is required."),
    appointmentDate: Yup.date().required("An appointment date is required."),
    visitType: Yup.object().shape({}).required("A visit type is required."),
    appointmentAddress: Yup.object().shape({}).required("An appointment address is required.")
});
var useStyles = core_1.makeStyles(function (theme) {
    return ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            "& .MuiTextField-root": {
                margin: theme.spacing(1)
            }
        },
        indicator: {
            backgroundColor: 'red'
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative'
        },
        buttonSuccess: {
            backgroundColor: colors_1.green[500],
            '&:hover': {
                backgroundColor: colors_1.green[700]
            }
        },
        fabProgress: {
            color: colors_1.green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1
        },
        buttonProgress: {
            color: colors_1.green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
        },
        textarea: {
            resize: "both",
            padding: theme.spacing(2),
            textAlign: "left",
            color: theme.palette.text.secondary,
            display: "flex",
            flex: 1
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        },
        zIndex: {
            zIndex: 99999999
        }
    });
});
var initialValues = new DiaRegApi_1.Patient({
    id: 0,
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    emailAddress: "",
    location: new DiaRegApi_1.Location({ city: new DiaRegApi_1.City({ id: 0, name: "", regionId: 0 }), region: new DiaRegApi_1.Region({ id: 0, name: "", countryId: 0 }), country: new DiaRegApi_1.Country({ id: 0, name: "" }) }),
    middleName: "",
    address1: "",
    address2: "",
    title: "",
    suffix: "",
    cellPhone: "",
    homePhone: "",
    gender: { id: 1, name: "Male" }
});
function buildColumns() {
    var columns = new Array();
    columns.push({ header: "Name", field: "name" });
    columns.push({ header: "Type", field: "type.name" });
    columns.push({ header: "Phone Number", field: "phoneNumber" });
    columns.push({ header: "Address 1", field: "address1" });
    columns.push({ header: "Address 2", field: "address2" });
    columns.push({ header: "City", field: "location.city.name" });
    columns.push({ header: "Region", field: "location.region.name" });
    return columns;
}
var newAppointment = new DiaRegApi_1.Appointment();
newAppointment.id = 0;
newAppointment.appointmentStatus = new DiaRegApi_1.AppointmentStatus();
newAppointment.appointmentDate = new Date();
newAppointment.active = false;
newAppointment.auditInfo = new DiaRegApi_2.AuditInfo();
newAppointment.notes = "These are the notes";
function PatientAppointment(props) {
    var _this = this;
    //#region Alert State
    var _a = react_1["default"].useState(false), openAlert = _a[0], setOpenAlert = _a[1];
    var _b = react_1["default"].useState(""), alertMessage = _b[0], setAlertMessage = _b[1];
    var _c = react_1["default"].useState("success"), alertSeverity = _c[0], setAlertSeverity = _c[1];
    //#endregion Alert States
    //#region User Interface State
    var _d = react_1["default"].useState(true), loading = _d[0], setLoading = _d[1];
    //#endregion User Interface State
    //#region Patient Appointment State
    var _e = react_1["default"].useState(newAppointment), appointment = _e[0], setAppointment = _e[1];
    var _f = react_1["default"].useState([]), patients = _f[0], setPatients = _f[1];
    var _g = react_1["default"].useState([]), visitTypes = _g[0], setVisitTypes = _g[1];
    var _h = react_1["default"].useState([]), doctors = _h[0], setDoctors = _h[1];
    var _j = react_1["default"].useState([]), addresses = _j[0], setAddresses = _j[1];
    //#endregion Patient Appointment State
    //#region Address Select State
    var _k = react_1["default"].useState(false), showAddressSelect = _k[0], setShowAddressSelect = _k[1];
    //#endregion Address Select State
    //#region Buttons References
    var saveButtonRef = react_1["default"].createRef();
    var cancelButtonRef = react_1["default"].createRef();
    //#endregion Buttons References
    //#region Style
    var classes = useStyles();
    //#endregion Style
    var showAlert = function (alertMessage, alertSeverity) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    };
    //#endregion "Alert Handlers"
    //#endregion "Alert Hanlders"
    //#region Auto Complete Event Handlers
    var onPatientChangeHandle = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var response, patients_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().searchPatientByName(value)];
                case 1:
                    response = _a.sent();
                    if (response.status == "success") {
                        patients_1 = response.data;
                        setPatients(patients_1);
                    }
                    else {
                        console.log(response.message);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var onDoctorChangeHandle = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var response, doctors_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().searchDoctorByName(value)];
                case 1:
                    response = _a.sent();
                    if (response.status == "success") {
                        doctors_1 = response.data;
                        setDoctors(doctors_1);
                    }
                    else {
                        console.log(response.message);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //#endregion
    //#region Use Effects
    var getVisitTypes = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getAppointmentTypes()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    react_1["default"].useEffect(function () {
        var active = true;
        if (loading) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getVisitTypes().then(function (value) {
                                if (value.status == "success") {
                                    var data = value.data;
                                    setVisitTypes(data);
                                }
                                else {
                                    showAlert(value.status, value.message);
                                }
                            })["catch"](function (error) {
                                showAlert("error", "An expected error has occurred while loading Appointment Types: " + error.message);
                            })];
                        case 1:
                            _a.sent();
                            setLoading(false);
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
        return function () {
            active = false;
        };
    }, [loading]);
    var getDoctorAddresses = function (doctorId) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getDoctorLocations(doctorId)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    react_1["default"].useEffect(function () {
        var active = true;
        if (!loading) {
            if (showAddressSelect) {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getDoctorAddresses(appointment.doctor.id).then(function (value) {
                                    if (value.status == "success") {
                                        var data = value.data;
                                        setAddresses(data);
                                    }
                                    else {
                                        showAlert(value.status, value.message);
                                    }
                                })["catch"](function (error) {
                                    showAlert("error", "An expected error has occurred while loading the addresses for this doctor: " + error.message);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
        }
        return function () {
            active = false;
        };
    }, [showAddressSelect]);
    //#endregion Use Effects
    //#region Discard
    function handleCancelClose() {
        setOpenAlert(false);
    }
    ;
    //#endregion Discard
    //#region Form Event handlers
    function onSubmit(values, _a) {
        var resetForm = _a.resetForm, setErrors = _a.setErrors, setStatus = _a.setStatus, setSubmitting = _a.setSubmitting, touched = _a.touched;
        return __awaiter(this, void 0, void 0, function () {
            var client, response, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setSubmitting(true);
                        client = new DiaRegApi_1.DiaRegWebApiClient();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.addAppointment(values)];
                    case 2:
                        response = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        showAlert(error_3, "severe");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    //#endregion Form Event handlers
    //#region User Interface
    return (react_1["default"].createElement("div", null, loading ?
        react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: loading },
            react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" }))
        :
            react_1["default"].createElement(formik_1.Formik, { enableReinitialize: true, initialValues: appointment, 
                // validationSchema={validationSchema}
                onSubmit: onSubmit }, function (_a) {
                var errors = _a.errors, handleBlur = _a.handleBlur, handleChange = _a.handleChange, handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, touched = _a.touched, values = _a.values, status = _a.status, isValid = _a.isValid, dirty = _a.dirty, setFieldValue = _a.setFieldValue;
                return (react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: isSubmitting },
                        react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" })),
                    react_1["default"].createElement(core_1.Collapse, { "in": openAlert },
                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                            react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                                react_1["default"].createElement(Alert, { variant: "filled", severity: alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                                            setOpenAlert(false);
                                            e.preventDefault();
                                        } },
                                        react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, alertMessage)))),
                    react_1["default"].createElement(Card, { mb: 6 },
                        react_1["default"].createElement(core_1.CardContent, null,
                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(core_1.Typography, { variant: "h5", gutterBottom: true, display: "inline" }, "Patient Information"))),
                            react_1["default"].createElement("form", { onSubmit: handleSubmit },
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                        react_1["default"].createElement(lab_1.Autocomplete, { id: "patient", onOpen: handleBlur, onBlur: handleBlur, onChange: function (event, newValue) {
                                                setFieldValue("patient", newValue);
                                            }, getOptionSelected: function (option, value) {
                                                return option.id === value.id;
                                            }, getOptionLabel: function (option) { return option.displayName; }, options: patients, loading: loading, fullWidth: true, disablePortal: true, value: values.patient, className: classes.zIndex, renderInput: function (params) { return (react_1["default"].createElement(TextField, __assign({}, params, { label: "Patient (type the last or first name of a patient)", variant: "outlined", name: "value.patient.displayName", onChange: function (ev) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(ev.target.value !== "" || ev.target.value !== null)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, onPatientChangeHandle(ev.target.value)];
                                                            case 1:
                                                                _a.sent();
                                                                _a.label = 2;
                                                            case 2: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, required: true, value: values.patient == null ? "" : values.patient.displayName, InputProps: __assign(__assign({}, params.InputProps), { endAdornment: (react_1["default"].createElement(react_1["default"].Fragment, null,
                                                        loading ? (react_1["default"].createElement(core_1.CircularProgress, { color: "inherit", size: 20 })) : null,
                                                        params.InputProps.endAdornment)) }) }))); } }))),
                                react_1["default"].createElement(Divider, { m: 4 }),
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                        react_1["default"].createElement(core_1.Typography, { variant: "h5", gutterBottom: true, display: "inline" }, "Visit Information"))),
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                        react_1["default"].createElement(lab_1.Autocomplete, { fullWidth: true, id: "visitType", options: visitTypes, onBlur: handleBlur, getOptionLabel: function (visitType) { return visitType === null || visitType === void 0 ? void 0 : visitType.name; }, disableClearable: true, autoComplete: false, onChange: function (event, newValue) {
                                                setFieldValue("visitType", newValue);
                                            }, value: values.appointmentType, renderInput: function (params) { return react_1["default"].createElement(TextField, __assign({}, params, { label: "Purpose/Appointment Type", variant: "outlined" })); } })),
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 2 },
                                        react_1["default"].createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1["default"] },
                                            react_1["default"].createElement(pickers_1.DateTimePicker, { fullWidth: true, variant: "inline", inputVariant: "outlined", onBlur: handleBlur, label: "Start Date/Time", value: values.appointmentDate, format: "MM/dd/yyyy hh:mm a", onChange: function (date) {
                                                    setFieldValue("appointmentDate", date);
                                                } })))),
                                react_1["default"].createElement(Divider, { m: 4 }),
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                        react_1["default"].createElement(core_1.Typography, { variant: "h5", gutterBottom: true, display: "inline" }, "Doctor Information"))),
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                        react_1["default"].createElement(lab_1.Autocomplete, { id: "patient", onOpen: handleBlur, onBlur: handleBlur, onChange: function (event, newValue) {
                                                setFieldValue("doctor", newValue);
                                                appointment.doctor = newValue;
                                                setAppointment(appointment);
                                                setShowAddressSelect(true);
                                            }, getOptionSelected: function (option, value) {
                                                return option.id === value.id;
                                            }, getOptionLabel: function (option) { return option.displayName; }, options: doctors, loading: loading, fullWidth: true, disablePortal: true, value: values.doctor, className: classes.zIndex, renderInput: function (params) { return (react_1["default"].createElement(TextField, __assign({}, params, { label: "Doctor (type the last or first name of a doctor)", variant: "outlined", name: "value.doctor.displayName", onChange: function (ev) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(ev.target.value !== "" || ev.target.value !== null)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, onDoctorChangeHandle(ev.target.value)];
                                                            case 1:
                                                                _a.sent();
                                                                _a.label = 2;
                                                            case 2: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, required: true, value: values.doctor == null ? "" : values.doctor.displayName, InputProps: __assign(__assign({}, params.InputProps), { endAdornment: (react_1["default"].createElement(react_1["default"].Fragment, null,
                                                        loading ? (react_1["default"].createElement(core_1.CircularProgress, { color: "inherit", size: 20 })) : null,
                                                        params.InputProps.endAdornment)) }) }))); } })),
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                        react_1["default"].createElement(Button, { onClick: function () {
                                                setShowAddressSelect(true);
                                            }, variant: "outlined", color: "primary" }, "Change Address"),
                                        values.appointmentAddress != null ?
                                            react_1["default"].createElement(Card, null,
                                                react_1["default"].createElement(core_1.CardContent, null,
                                                    react_1["default"].createElement(core_1.Typography, { gutterBottom: true, display: "inline" }, values.appointmentAddress.name),
                                                    react_1["default"].createElement(core_1.Typography, { component: "div" }, values.appointmentAddress.address1),
                                                    react_1["default"].createElement(core_1.Typography, { component: "div" }, values.appointmentAddress.address2 === "" ? "" : values.appointmentAddress.address2),
                                                    react_1["default"].createElement(core_1.Typography, { component: "div" }, values.appointmentAddress.location.city.name),
                                                    react_1["default"].createElement(core_1.Typography, { component: "div" }, values.appointmentAddress.location.region.name)))
                                            :
                                                null,
                                        showAddressSelect ?
                                            react_1["default"].createElement(ListSelectDialog_1["default"], { columns: buildColumns(), title: "Appointment Location", instructions: "Select the address of the appointment.", show: showAddressSelect, onCancel: function () { setShowAddressSelect(false); }, data: addresses, onSelect: function (selected) {
                                                    setFieldValue("appointmentAddress", addresses[selected[0]]);
                                                    setShowAddressSelect(false);
                                                } })
                                            :
                                                null)),
                                react_1["default"].createElement(Divider, { m: 4 }),
                                react_1["default"].createElement(Button, { type: "submit", ref: saveButtonRef, hidden: true }),
                                react_1["default"].createElement(Button, { ref: cancelButtonRef, hidden: true })),
                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2 },
                                react_1["default"].createElement(core_1.Grid, { item: true },
                                    react_1["default"].createElement(CloseDialogButton_1["default"], { hidden: false, buttonText: dirty ? "Cancel" : "Close", prompt: dirty, closeDialogHandler: handleCancelClose })),
                                react_1["default"].createElement(core_1.Grid, { item: true },
                                    react_1["default"].createElement(Button, { onClick: function () {
                                            var _a;
                                            (_a = saveButtonRef.current) === null || _a === void 0 ? void 0 : _a.click();
                                        }, 
                                        //disabled={isSubmitting || !isValid || !dirty}
                                        variant: "outlined", color: "primary" }, "Save")))))));
            })));
    //#endregion User Interface
}
exports["default"] = PatientAppointment;
