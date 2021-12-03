"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var date_fns_1 = require("@date-io/date-fns");
var core_1 = require("@material-ui/core");
var AppBar_1 = require("@material-ui/core/AppBar");
var Box_1 = require("@material-ui/core/Box");
var colors_1 = require("@material-ui/core/colors");
var Tab_1 = require("@material-ui/core/Tab");
var Tabs_1 = require("@material-ui/core/Tabs");
var icons_1 = require("@material-ui/icons");
var lab_1 = require("@material-ui/lab");
var pickers_1 = require("@material-ui/pickers");
var system_1 = require("@material-ui/system");
var formik_1 = require("formik");
var prop_types_1 = require("prop-types");
var react_1 = require("react");
var react_helmet_1 = require("react-helmet");
var react_router_1 = require("react-router");
var macro_1 = require("styled-components/macro");
var Yup = require("yup");
var DiaRegApi_1 = require("../../api/DiaRegApi");
var commandBarReducer_1 = require("../../redux/reducers/commandBarReducer");
var store_1 = require("../../redux/store");
var Contacts_1 = require("./contacts/Contacts");
var PatientSurveys_1 = require("./surveys/PatientSurveys");
var Visits_1 = require("./visits/Visits");
var Divider = macro_1["default"](core_1.Divider)(system_1.spacing);
var Card = macro_1["default"](core_1.Card)(system_1.spacing);
var Alert = macro_1["default"](lab_1.Alert)(system_1.spacing);
var TextField = macro_1["default"](core_1.TextField)(system_1.spacing);
var Button = macro_1["default"](core_1.Button)(system_1.spacing);
var validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required")
});
var styles = function (theme) { return core_1.createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
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
    }
}); };
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
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (react_1["default"].createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "simple-tabpanel-" + index, "aria-labelledby": "simple-tab-" + index }, other), value === index && (react_1["default"].createElement(Box_1["default"], { p: 3 },
        react_1["default"].createElement(core_1.Typography, null, children)))));
}
var ParentChildForm = /** @class */ (function (_super) {
    __extends(ParentChildForm, _super);
    function ParentChildForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { id: 0, patient: initialValues, genders: [], regions: [], cities: [], panelValue: 0, confirmClose: false };
        _this.a11yProps = function (index) {
            return {
                id: "simple-tab-" + index,
                'aria-controls': "simple-tabpanel-" + index
            };
        };
        _this.getGenders = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new DiaRegApi_1.DiaRegWebApiClient().getGenders()];
            });
        }); };
        _this.getRegions = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new DiaRegApi_1.DiaRegWebApiClient().getRegions()];
            });
        }); };
        _this.getCities = function (regionId) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new DiaRegApi_1.DiaRegWebApiClient().getCities(regionId)];
            });
        }); };
        _this.createNewPatient = function () { return __awaiter(_this, void 0, void 0, function () {
            var location, newPatient;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getGenders().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.setState({ genders: response.data });
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getRegions().then(function (response) {
                                _this.setState({ regions: response.data });
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getCities(+this.state.regions[0].id).then(function (response) {
                                _this.setState({ cities: response.data });
                            })];
                    case 3:
                        _a.sent();
                        location = new DiaRegApi_1.Location();
                        location.region = this.state.regions[0];
                        location.city = this.state.cities[0];
                        location.country = new DiaRegApi_1.Country({ id: 0, name: "", active: true });
                        newPatient = new DiaRegApi_1.Patient({
                            id: 0,
                            firstName: "",
                            lastName: "",
                            birthDate: new Date(),
                            emailAddress: "",
                            location: location,
                            middleName: "",
                            address1: "",
                            address2: "",
                            title: "",
                            suffix: "",
                            cellPhone: "",
                            homePhone: "",
                            gender: this.state.genders[0],
                            active: true,
                            role: new DiaRegApi_1.PersonRole(),
                            auditInfo: new DiaRegApi_1.AuditInfo(),
                            roles: Array(),
                            addresses: Array(),
                            displayName: ""
                        });
                        this.setState({ patient: newPatient });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.getPatient = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getPatient(this.state.id).then(function (value) { return __awaiter(_this, void 0, void 0, function () {
                            var patient;
                            var _this = this;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        patient = value.data;
                                        return [4 /*yield*/, this.getGenders().then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    this.setState({ genders: data });
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 1:
                                        _b.sent();
                                        return [4 /*yield*/, this.getRegions().then(function (data) {
                                                _this.setState({ regions: data });
                                            })];
                                    case 2:
                                        _b.sent();
                                        return [4 /*yield*/, this.getCities(patient.location.region.id).then(function (data) {
                                                _this.setState({ cities: data });
                                            })];
                                    case 3:
                                        _b.sent();
                                        if (((_a = value.data) === null || _a === void 0 ? void 0 : _a.address2) == null) {
                                            value.data.address2 = "";
                                        }
                                        this.setState({ patient: value.data });
                                        return [2 /*return*/];
                                }
                            });
                        }); })["catch"](function (error) {
                            _this.props.parentAlertHandler("error", "Could not load patient data due to: " + error.message);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.hideAlert = function () {
            _this.setState({ openAlert: false });
        };
        _this.submitForm = function (event) {
            var _a, _b;
            var that = _this;
            if ((_a = that.formRef.current) === null || _a === void 0 ? void 0 : _a.isValid) {
                (_b = _this.saveButtonRef.current) === null || _b === void 0 ? void 0 : _b.click();
            }
            else {
                _this.props.parentAlertHandler("error", "Correct errors and try again.");
            }
        };
        _this.cancelEdit = function () {
            var that = _this;
            if (that.formRef.current.dirty) {
                that.setState({ confirmClose: true });
            }
            else {
                that.close();
            }
        };
        _this.close = function () {
            _this.props.history.goBack();
        };
        _this.configureCommandBar = function () {
            store_1["default"].dispatch(commandBarReducer_1.setupCommandBar("Patient", _this.submitForm, _this.cancelEdit));
        };
        _this.updatePatient = function (patient) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().updatePatient(patient)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.addPatient = function (patient) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().addPatient(patient)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.handlePanelChange = function (event, newValue) {
            _this.setState({ panelValue: newValue });
        };
        _this.handleSubmit = function (values, _a) {
            var resetForm = _a.resetForm, setErrors = _a.setErrors, setStatus = _a.setStatus, setSubmitting = _a.setSubmitting;
            return __awaiter(_this, void 0, void 0, function () {
                var responseInfo, response, addResponse, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            setSubmitting(true);
                            responseInfo = void 0;
                            if (!(values.id !== 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.updatePatient(values)];
                        case 1:
                            response = _b.sent();
                            responseInfo = response;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.addPatient(values)];
                        case 3:
                            addResponse = _b.sent();
                            ;
                            responseInfo = addResponse;
                            _b.label = 4;
                        case 4:
                            if (responseInfo.status === "success") {
                                if (values.id === 0) {
                                    values.id = responseInfo.data;
                                }
                                this.setState({ patient: values });
                                this.setState({ dataChanged: true });
                                resetForm();
                                this.props.parentAlertHandler("success", "Patient data saved.");
                                setStatus({ sent: true });
                                setSubmitting(false);
                            }
                            else {
                                this.props.parentAlertHandler("error", responseInfo.message);
                                setStatus({ sent: true });
                                setSubmitting(false);
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _b.sent();
                            setStatus({ sent: false });
                            setErrors({ submit: error_1.message });
                            setSubmitting(false);
                            this.props.parentAlertHandler("error", error_1.message);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        _this.saveButtonRef = react_1["default"].createRef();
        _this.cancelButtonRef = react_1["default"].createRef();
        _this.formRef = react_1["default"].createRef();
        return _this;
    }
    ParentChildForm.prototype.componentDidMount = function () {
        var _this = this;
        this.configureCommandBar();
        var params = this.props.match.params;
        params.id = params.id === undefined ? 0 : params.id;
        this.setState({ id: params.id }, function () {
            if (+_this.state.id !== 0) {
                _this.getPatient();
            }
            else {
                _this.createNewPatient();
            }
        });
    };
    ParentChildForm.prototype.render = function () {
        var _this = this;
        var classes = this.props.classes;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(formik_1.Formik, { enableReinitialize: true, initialValues: this.state.patient, validationSchema: validationSchema, onSubmit: this.handleSubmit, innerRef: this.formRef }, function (_a) {
                var _b, _c;
                var errors = _a.errors, handleBlur = _a.handleBlur, handleChange = _a.handleChange, handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, touched = _a.touched, values = _a.values, status = _a.status, isValid = _a.isValid, dirty = _a.dirty;
                return (react_1["default"].createElement(Card, { mb: 6 },
                    react_1["default"].createElement(core_1.CardContent, null,
                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                            react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                react_1["default"].createElement(core_1.Typography, { variant: "h5", gutterBottom: true, display: "inline" }, "Details"))),
                        react_1["default"].createElement("form", { onSubmit: handleSubmit },
                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(TextField, { name: "lastName", label: "Last Name", value: values.lastName, error: Boolean(touched.lastName && errors.lastName), fullWidth: true, helperText: touched.lastName && errors.lastName, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 })),
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(TextField, { name: "firstName", label: "First Name", value: values.firstName, error: Boolean(touched.firstName && errors.firstName), fullWidth: true, helperText: touched.firstName && errors.firstName, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 })),
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(TextField, { name: "middleName", label: "Middle Name", value: values.middleName, error: Boolean(touched.middleName && errors.middleName), fullWidth: true, helperText: touched.middleName && errors.middleName, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 }))),
                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1["default"] },
                                        react_1["default"].createElement(pickers_1.KeyboardDatePicker, { autoOk: true, variant: "inline", inputVariant: "outlined", label: "Date of Birth", format: "MM/dd/yyyy", value: values.birthDate, InputAdornmentProps: { position: "start" }, onChange: function (date) {
                                                var patient = _this.state.patient;
                                                patient.birthDate = date;
                                                _this.setState({ patient: patient });
                                            } }))),
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(lab_1.Autocomplete, { id: "gender", options: _this.state.genders, getOptionLabel: function (gender) { return gender === null || gender === void 0 ? void 0 : gender.name; }, disableClearable: true, style: { width: 300 }, autoComplete: false, onChange: function (event, newValue) {
                                            var patient = _this.state.patient;
                                            patient.gender = newValue;
                                            _this.setState({ patient: patient });
                                        }, value: values.gender, renderInput: function (params) { return react_1["default"].createElement(TextField, __assign({}, params, { label: "Gender", variant: "outlined" })); } }))),
                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                    react_1["default"].createElement(TextField, { name: "address1", label: "Address1", value: values.address1, error: Boolean(touched.address1 && errors.address1), fullWidth: true, helperText: touched.address1 && errors.address1, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 })),
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                    react_1["default"].createElement(TextField, { name: "address2", label: "Address2", value: values.address2, error: Boolean(touched.address2 && errors.address2), fullWidth: true, helperText: touched.address2 && errors.address2, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 }))),
                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(lab_1.Autocomplete, { id: "region", options: _this.state.regions, getOptionLabel: function (region) { return region === null || region === void 0 ? void 0 : region.name; }, disableClearable: true, style: { width: 300 }, autoComplete: false, onChange: function (event, newValue) {
                                            _this.getCities(newValue.id).then(function (data) {
                                                _this.setState({ cities: data });
                                                var patient = _this.state.patient;
                                                patient.location.region = newValue;
                                                patient.location.city = _this.state.cities[0];
                                                _this.setState({ patient: patient });
                                            });
                                        }, value: (_b = values.location) === null || _b === void 0 ? void 0 : _b.region, renderInput: function (params) { return react_1["default"].createElement(TextField, __assign({}, params, { label: "Region", variant: "outlined" })); } })),
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                    react_1["default"].createElement(lab_1.Autocomplete, { id: "city", options: _this.state.cities, getOptionLabel: function (city) { return city === null || city === void 0 ? void 0 : city.name; }, disableClearable: true, style: { width: 300 }, autoComplete: false, onChange: function (event, newValue) {
                                            var patient = _this.state.patient;
                                            patient.location.city = newValue;
                                            _this.setState({ patient: patient });
                                        }, value: (_c = values.location) === null || _c === void 0 ? void 0 : _c.city, renderInput: function (params) { return react_1["default"].createElement(TextField, __assign({}, params, { label: "City", variant: "outlined" })); } }))),
                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                    react_1["default"].createElement(TextField, { name: "homePhone", label: "Home Phone", value: values.homePhone, error: Boolean(touched.homePhone && errors.homePhone), fullWidth: true, helperText: touched.homePhone && errors.homePhone, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2, type: "" })),
                                react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                    react_1["default"].createElement(TextField, { name: "cellPhone", label: "Cell Phone", value: values.cellPhone, error: Boolean(touched.cellPhone && errors.cellPhone), fullWidth: true, helperText: touched.cellPhone && errors.cellPhone, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 })))),
                        react_1["default"].createElement(Button, { variant: "contained", color: "primary", mt: 3 }, "Save changes"))));
            }),
            react_1["default"].createElement(Card, { hidden: +this.state.patient.id === 0 },
                react_1["default"].createElement(core_1.CardContent, null,
                    react_1["default"].createElement(AppBar_1["default"], { position: "static", elevation: 10 },
                        react_1["default"].createElement(Tabs_1["default"], { value: this.state.panelValue, onChange: this.handlePanelChange, classes: { indicator: classes.indicator } },
                            react_1["default"].createElement(Tab_1["default"], __assign({ label: "CONTACTS" }, this.a11yProps(0), { disabled: +this.state.patient.id === 0 })),
                            react_1["default"].createElement(Tab_1["default"], __assign({ label: "VISITS" }, this.a11yProps(1), { disabled: +this.state.patient.id === 0 })),
                            react_1["default"].createElement(Tab_1["default"], __assign({ label: "SURVEYS" }, this.a11yProps(2), { disabled: +this.state.patient.id === 0 })))),
                    react_1["default"].createElement(TabPanel, { value: this.state.panelValue, index: 0 },
                        react_1["default"].createElement(core_1.Grid, { className: classes.root, container: true, spacing: 3 },
                            react_1["default"].createElement(core_1.Grid, { item: true, className: classes.root },
                                react_1["default"].createElement(Contacts_1["default"], { patientId: this.state.id, parentAlertHandler: this.props.parentAlertHandler })))),
                    react_1["default"].createElement(TabPanel, { value: this.state.panelValue, index: 1 },
                        react_1["default"].createElement(core_1.Grid, { className: classes.root, container: true, spacing: 3 },
                            react_1["default"].createElement(core_1.Grid, { item: true, className: classes.root },
                                react_1["default"].createElement(Visits_1["default"], { patientId: this.state.id, parentAlertHandler: this.props.parentAlertHandler })))),
                    react_1["default"].createElement(TabPanel, { value: this.state.panelValue, index: 2 },
                        react_1["default"].createElement(core_1.Grid, { className: classes.root, container: true, spacing: 3 },
                            react_1["default"].createElement(core_1.Grid, { item: true, className: classes.root },
                                react_1["default"].createElement(PatientSurveys_1["default"], { patientId: this.state.id, parentAlertHandler: this.props.parentAlertHandler }))))))));
    };
    return ParentChildForm;
}(react_1["default"].Component));
var PatientSubForm = react_router_1.withRouter(core_1.withStyles(styles)(ParentChildForm));
PatientSubForm.propTypes = {
    classes: prop_types_1["default"].object.isRequired
};
var PatientForm = /** @class */ (function (_super) {
    __extends(PatientForm, _super);
    function PatientForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { openAlert: false, alertMessage: "", alertSeverity: "success" };
        _this.showAlert = function (alertSeverity, alertMessage) {
            _this.setState({ openAlert: true, alertMessage: alertMessage, alertSeverity: alertSeverity });
        };
        return _this;
    }
    PatientForm.prototype.render = function () {
        var _this = this;
        var classes = this.props.classes;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(react_helmet_1.Helmet, { title: "Patient" }),
            react_1["default"].createElement(core_1.Collapse, { "in": this.state.openAlert },
                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                    react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                        react_1["default"].createElement(Alert, { variant: "filled", severity: this.state.alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                                    _this.setState({ openAlert: false });
                                    e.preventDefault();
                                } },
                                react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, this.state.alertMessage)))),
            react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline" }, "Patient"),
            react_1["default"].createElement(Divider, { my: 3 }),
            react_1["default"].createElement(ParentChildForm, __assign({}, this.props, { parentAlertHandler: this.showAlert }))));
    };
    return PatientForm;
}(react_1.Component));
exports["default"] = core_1.withStyles(styles)(react_router_1.withRouter(PatientForm));
