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
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var lab_1 = require("@material-ui/lab");
var system_1 = require("@material-ui/system");
var formik_1 = require("formik");
var formik_material_ui_1 = require("formik-material-ui");
var react_1 = require("react");
var react_helmet_1 = require("react-helmet");
var macro_1 = require("styled-components/macro");
var Yup = require("yup");
var DiaRegApi_1 = require("../../api/DiaRegApi");
var DeleteButtonDialog_1 = require("../../components/dialogs/DeleteButtonDialog");
var NotificationDialog_1 = require("../../components/dialogs/NotificationDialog");
var Locations_1 = require("../../components/location/Locations");
var Response_1 = require("./../../models/Response");
var Divider = macro_1["default"](core_1.Divider)(system_1.spacing);
var Card = macro_1["default"](core_1.Card)(system_1.spacing);
var TextField = macro_1["default"](core_1.TextField)(system_1.spacing);
var Button = macro_1["default"](core_1.Button)(system_1.spacing);
var Paper = macro_1["default"](core_1.Paper)(system_1.spacing);
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        flexGrow: 1
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    },
    section1: {
        margin: theme.spacing(3, 2)
    },
    section2: {
        margin: theme.spacing(3, 2)
    },
    section3: {
        margin: theme.spacing(3, 1, 1)
    }
}); });
var validationSchema = Yup.object().shape({
    firstName: Yup.string().required('The First Name field is required.'),
    lastName: Yup.string().required('The Last Name field is required.'),
    //gender: Yup.string().required('The Gender field is required.'),
    emailAddress: Yup.string().email("Invalid Email Address format.").required('The Email Address field is required.')
});
function DoctorEditor(props) {
    var _this = this;
    var _a = react_1["default"].useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1["default"].useState(false), dataChanged = _b[0], setDataChanged = _b[1];
    var _c = react_1["default"].useState(false), openAlert = _c[0], setOpenAlert = _c[1];
    var _d = react_1["default"].useState(""), alertMessage = _d[0], setAlertMessage = _d[1];
    var _e = react_1["default"].useState("success"), alertSeverity = _e[0], setAlertSeverity = _e[1];
    var _f = react_1["default"].useState(), doctor = _f[0], setDoctor = _f[1];
    var _g = react_1["default"].useState([]), genders = _g[0], setGenders = _g[1];
    var _h = react_1["default"].useState(false), deleted = _h[0], setDeleted = _h[1];
    var _j = react_1["default"].useState(false), deleting = _j[0], setDeleting = _j[1];
    var _k = react_1["default"].useState(new Response_1["default"]()), deleteReponse = _k[0], setDeletedResponse = _k[1];
    var classes = useStyles();
    react_1["default"].useEffect(function () {
        var active = true;
        var doctor;
        if (loading) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var params;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = props.match.params;
                            params.id = params.id === undefined ? 0 : params.id;
                            return [4 /*yield*/, getGenders().then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        setGenders(data.data);
                                        return [2 /*return*/];
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            if (!(params.id != 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, getDoctor(params.id).then(function (value) {
                                    if (value.status == "success") {
                                        var data = value.data;
                                        setDoctor(data);
                                        doctor = data;
                                    }
                                    else {
                                        showAlert(value.status, value.message);
                                        //---Handle Error
                                    }
                                })["catch"](function (error) {
                                    showAlert("error", "An expected error has occurred: " + error.message);
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, newDoctor().then(function (value) {
                                if (value.status == "success") {
                                    var data = value.data;
                                    data.firstName = "";
                                    data.lastName = "";
                                    data.emailAddress = "";
                                    data.middleName = "";
                                    setDoctor(data);
                                    doctor = data;
                                }
                                else {
                                    showAlert(value.status, value.message);
                                }
                            })["catch"](function (error) {
                                showAlert("error", "An expected error has occurred: " + error.message);
                            })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            setLoading(false);
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
        return function () {
            active = false;
        };
    }, [loading, props.match.params]);
    react_1["default"].useEffect(function () {
        var active = true;
        if (deleting) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var response, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, deleteDoctor()];
                        case 1:
                            response = _a.sent();
                            if (response.status == "success") {
                                setDeleted(true);
                                setDeletedResponse(response);
                            }
                            else {
                                showAlert(response.status, response.message);
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            showAlert("error", "An expected error has occurred: " + error_1.message);
                            return [3 /*break*/, 3];
                        case 3:
                            setDeleting(false);
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
        return function () {
            active = false;
        };
    }, [deleting]);
    function getDoctor(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getDoctor(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function updateDoctor(doctor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().updateDoctor(doctor)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function addDoctor(doctor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().addDoctor(doctor)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function deleteDoctor() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().deleteDoctor(doctor === null || doctor === void 0 ? void 0 : doctor.id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function newDoctor() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().newDoctor()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function getGenders() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new DiaRegApi_1.DiaRegWebApiClient().getGenders()];
            });
        });
    }
    function showAlert(alertSeverity, alertMessage) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    }
    ;
    function onSumbit(values, _a) {
        var resetForm = _a.resetForm, setErrors = _a.setErrors, setStatus = _a.setStatus, setSubmitting = _a.setSubmitting;
        return __awaiter(this, void 0, void 0, function () {
            var responseInfo, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        setSubmitting(true);
                        responseInfo = void 0;
                        if (!(values.id !== 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, updateDoctor(values)];
                    case 1:
                        responseInfo = (_b.sent());
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, addDoctor(values)];
                    case 3:
                        responseInfo = (_b.sent());
                        _b.label = 4;
                    case 4:
                        if (responseInfo.status === "success") {
                            if (values.id === 0) {
                                values.id = responseInfo.data;
                            }
                            setDoctor(values);
                            setDataChanged(true);
                            resetForm();
                            showAlert("success", "Your changes have been saved.");
                            setStatus({ sent: true });
                            setSubmitting(false);
                        }
                        else {
                            showAlert("error", responseInfo.message);
                            setStatus({ sent: true });
                            setSubmitting(false);
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _b.sent();
                        showAlert("error", error_2.message);
                        setStatus({ sent: false });
                        setErrors({ submit: error_2.message });
                        setSubmitting(false);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    ;
    function DoctorLocations() {
        return (react_1["default"].createElement(Card, { mb: 6 },
            react_1["default"].createElement(core_1.CardContent, null,
                react_1["default"].createElement(Locations_1["default"], { personId: doctor === null || doctor === void 0 ? void 0 : doctor.id }))));
    }
    function DoctorInfo() {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(formik_1.Formik, { enableReinitialize: true, initialValues: doctor, validationSchema: validationSchema, onSubmit: onSumbit }, function (_a) {
                var _b;
                var errors = _a.errors, handleBlur = _a.handleBlur, handleChange = _a.handleChange, handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, touched = _a.touched, values = _a.values, status = _a.status, isValid = _a.isValid, dirty = _a.dirty, setFieldValue = _a.setFieldValue, setFieldTouched = _a.setFieldTouched;
                return (react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: isSubmitting },
                        react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" })),
                    react_1["default"].createElement("form", { onSubmit: handleSubmit },
                        react_1["default"].createElement(Card, { mb: 6 },
                            react_1["default"].createElement(core_1.CardContent, null,
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, "Personal Info"),
                                    react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                        react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                            react_1["default"].createElement(TextField, { id: "firstName", label: "First name", variant: "outlined", value: values.firstName, onBlur: handleBlur, onChange: handleChange, fullWidth: true, error: Boolean(touched.firstName && errors.firstName), my: 2, required: true })),
                                        react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                            react_1["default"].createElement(TextField, { id: "lastName", label: "Last name", variant: "outlined", value: values.lastName, onBlur: handleBlur, onChange: handleChange, fullWidth: true, my: 2, required: true, error: Boolean(touched.lastName && errors.lastName) })),
                                        react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                            react_1["default"].createElement(TextField, { id: "middleName", label: "Middle name", variant: "outlined", value: values.middleName, onBlur: handleBlur, onChange: handleChange, fullWidth: true, my: 2 }))),
                                    react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                        react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                            react_1["default"].createElement(lab_1.Autocomplete, { id: "gender", options: genders, getOptionLabel: function (gender) { return gender === null || gender === void 0 ? void 0 : gender.name; }, disableClearable: true, style: { width: 300 }, autoComplete: false, onChange: function (event, newValue) {
                                                    doctor.gender = newValue;
                                                    setDoctor(doctor);
                                                }, value: values.gender, renderInput: function (params) { return react_1["default"].createElement(TextField, __assign({}, params, { required: true, name: "gender-field", label: "Gender", variant: "outlined" })); }, getOptionSelected: function (option, value) { return option.id === value.id; } })),
                                        react_1["default"].createElement(core_1.Grid, { item: true, md: 8 },
                                            react_1["default"].createElement(TextField, { id: "emailAddress", label: "Email", variant: "outlined", type: "email", value: values.emailAddress, onBlur: handleBlur, onChange: handleChange, fullWidth: true, my: 2, required: true, error: Boolean(touched.emailAddress && errors.emailAddress) }))),
                                    react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                        react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                            react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: values.active, onChange: handleChange, value: values.active, name: "active" }), color: "primary", label: "Active" })),
                                        react_1["default"].createElement(core_1.Grid, { item: true, md: 8 }))),
                                react_1["default"].createElement(Divider, { my: 3 }),
                                react_1["default"].createElement("div", null,
                                    react_1["default"].createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, "Medical Specialities"),
                                    react_1["default"].createElement(Paper, { mt: 3 },
                                        react_1["default"].createElement(core_1.FormControl, { required: true, error: ((_b = values.roles) === null || _b === void 0 ? void 0 : _b.filter(function (x) { return x.active; }).length) === 0, component: "fieldset" },
                                            react_1["default"].createElement(core_1.FormLabel, { component: "legend" }, "Assign responsibility"),
                                            react_1["default"].createElement(core_1.FormGroup, { row: true }, doctor === null || doctor === void 0 ? void 0 : doctor.roles.map(function (role) {
                                                var _a, _b;
                                                return react_1["default"].createElement(formik_1.Field, { type: "checkbox", component: formik_material_ui_1.CheckboxWithLabel, checked: (_b = (_a = values.roles) === null || _a === void 0 ? void 0 : _a.find(function (x) { return x.id == role.id; })) === null || _b === void 0 ? void 0 : _b.active, onBlur: handleBlur, onChange: function (event, value) {
                                                        var roles = values.roles;
                                                        var role = roles.find(function (x) { return x.id == +event.target.value; });
                                                        role.active = !role.active;
                                                        setFieldValue("roles", roles);
                                                        setFieldTouched("roles", true, true);
                                                        setFieldValue(role.id.toString(), role.active);
                                                    }, value: role.id, label: role.name, name: "numbers", key: role.id, id: role.id, Label: { label: role.name } });
                                            }))))),
                                react_1["default"].createElement(Divider, { my: 3 }),
                                react_1["default"].createElement(Button, { type: "submit", disabled: isSubmitting || !isValid || !dirty, variant: "contained", color: "primary", mt: 3 }, "Save changes"))))));
            })));
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_helmet_1.Helmet, { title: "Doctor" }),
        react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline" }, "Doctor"),
        react_1["default"].createElement(core_1.Collapse, { "in": openAlert },
            react_1["default"].createElement(lab_1.Alert, { variant: "filled", severity: alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                        setOpenAlert(false);
                        e.preventDefault();
                    } },
                    react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, alertMessage)),
        loading ?
            react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: loading },
                react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" }))
            :
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 12 },
                            react_1["default"].createElement(DoctorInfo, null),
                            (doctor === null || doctor === void 0 ? void 0 : doctor.id) != 0 ?
                                react_1["default"].createElement(DoctorLocations, null)
                                :
                                    null),
                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 }, (doctor === null || doctor === void 0 ? void 0 : doctor.id) != 0 ?
                            react_1["default"].createElement(Card, { mb: 8, variant: "outlined" },
                                react_1["default"].createElement(core_1.CardContent, null,
                                    react_1["default"].createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, "Delete Doctor"),
                                    react_1["default"].createElement(core_1.Grid, { container: true, spacing: 2 },
                                        react_1["default"].createElement(core_1.Grid, { item: true, xs: 12 },
                                            react_1["default"].createElement(core_1.Typography, { gutterBottom: true }, "Deleting a doctor will not remove them from the system if they have already treated patients or conducted any type of medical assessments with patients.")))),
                                react_1["default"].createElement(core_1.CardActions, null,
                                    react_1["default"].createElement(DeleteButtonDialog_1["default"], { buttonText: "Delete Doctor", prompt: true, hidden: false, message: "You are choosing to remove a doctor from the system.  This action cannot be undone.  Click Cancel to abort or OK to continue with the Delete.", title: "Delete Doctor?", deleteDialogHandler: function () { setDeleting(true); } })))
                            :
                                null))),
        deleted ?
            react_1["default"].createElement(NotificationDialog_1["default"], { open: deleted, title: "Delete Doctor", message: deleteReponse.message, onClose: function () { props.history.goBack(); } })
            :
                null));
}
exports["default"] = DoctorEditor;
