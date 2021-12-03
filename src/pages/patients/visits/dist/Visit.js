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
exports.VisitEditor = void 0;
var date_fns_1 = require("@date-io/date-fns");
var core_1 = require("@material-ui/core");
var Button_1 = require("@material-ui/core/Button");
var colors_1 = require("@material-ui/core/colors");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var icons_1 = require("@material-ui/icons");
var lab_1 = require("@material-ui/lab");
var pickers_1 = require("@material-ui/pickers");
var system_1 = require("@material-ui/system");
var formik_1 = require("formik");
var react_1 = require("react");
var macro_1 = require("styled-components/macro");
var Yup = require("yup");
var DiaRegApi_1 = require("../../../api/DiaRegApi");
var CloseDialogButton_1 = require("../../../components/dialogs/CloseDialogButton");
var Alert = macro_1["default"](lab_1.Alert)(system_1.spacing);
var TextField = macro_1["default"](core_1.TextField)(system_1.spacing);
var useStyles = core_1.makeStyles(function (theme) {
    return ({
        root: {
            flexGrow: 1
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
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        }
    });
});
var validationSchema = Yup.object().shape({
    visitDate: Yup.date().required('The date of visit is required.'),
    foodMedicationAllergies: Yup.string().required('This field is required. Enter None for no food/medication allergies.'),
    typeOfAllergies: Yup.string().required('This field is required. Enter None for no types of allergies.'),
    medications: Yup.string().required('This field is required. Enter None for no types medications.'),
    smokes: Yup.boolean().required("This field is required"),
    smokesPacksPerDay: Yup.number().when('smokes', { is: true, then: Yup.number().min(1, "The minimum is 1") })
});
function VisitEditor(props) {
    var _this = this;
    var _a = react_1["default"].useState(createNewVisit()), visit = _a[0], setVisit = _a[1];
    var _b = react_1["default"].useState([]), visitTypes = _b[0], setVisitTypes = _b[1];
    var _c = react_1["default"].useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1["default"].useState(false), dataChanged = _d[0], setDataChanged = _d[1];
    var _e = react_1["default"].useState(false), openAlert = _e[0], setOpenAlert = _e[1];
    var _f = react_1["default"].useState(""), alertMessage = _f[0], setAlertMessage = _f[1];
    var _g = react_1["default"].useState("success"), alertSeverity = _g[0], setAlertSeverity = _g[1];
    var _h = react_1["default"].useState(""), visitTypeName = _h[0], setVisitTypeName = _h[1];
    var _j = react_1["default"].useState(false), manualDirty = _j[0], setManualDirty = _j[1];
    var saveButtonRef = react_1["default"].createRef();
    var cancelButtonRef = react_1["default"].createRef();
    var classes = useStyles();
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
                                showAlert("error", "An expected error has occurred: " + error.message);
                            })];
                        case 1:
                            _a.sent();
                            if (!(props.visitId != 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, getVisit().then(function (value) {
                                    if (value.status == "success") {
                                        var data = value.data;
                                        setVisit(data);
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
                            _a.label = 3;
                        case 3:
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
    function showAlert(alertSeverity, alertMessage) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    }
    ;
    function getVisit() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getVisit(props.visitId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function getVisitTypes() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getAppointmentTypes()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function createNewVisit() {
        var newVisit = new DiaRegApi_1.Visit();
        newVisit.id = 0;
        newVisit.appointmentDate = new Date();
        newVisit.patientId = props.patientId;
        newVisit.lastFluShotDate = null;
        newVisit.lastPneumoShotDate = null;
        newVisit.appointmentType = new DiaRegApi_1.AppointmentType();
        newVisit.appointmentTypeId = 0;
        newVisit.smokes = false;
        newVisit.smokesPacksPerDay = 0;
        newVisit.drinksAlcohol = false;
        newVisit.alcoholPerDay = 0;
        return newVisit;
    }
    function onClose() {
        props.onClose(dataChanged);
    }
    function updateVisit(visit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().updateVisit(visit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function addVisit(visit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        visit.patientId = props.patientId;
                        return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().addVisit(visit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function onSumbit(values, _a) {
        var resetForm = _a.resetForm, setErrors = _a.setErrors, setStatus = _a.setStatus, setSubmitting = _a.setSubmitting;
        return __awaiter(this, void 0, void 0, function () {
            var responseInfo, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        setSubmitting(true);
                        responseInfo = void 0;
                        values.smokes = visit.smokes;
                        values.smokesPacksPerDay = visit.smokesPacksPerDay;
                        values.drinksAlcohol = visit.drinksAlcohol;
                        values.alcoholPerDay = visit.alcoholPerDay;
                        if (!(values.id !== 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, updateVisit(values)];
                    case 1:
                        responseInfo = (_b.sent());
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, addVisit(values)];
                    case 3:
                        responseInfo = (_b.sent());
                        _b.label = 4;
                    case 4:
                        if (responseInfo.status === "success") {
                            if (values.id === 0) {
                                values.id = responseInfo.data;
                            }
                            setVisit(values);
                            setDataChanged(true);
                            resetForm();
                            showAlert("success", "Your changes have been saved.");
                            setStatus({ sent: true });
                            setSubmitting(false);
                            setManualDirty(false);
                        }
                        else {
                            showAlert("error", responseInfo.message);
                            setStatus({ sent: true });
                            setSubmitting(false);
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        showAlert("error", error_1.message);
                        setStatus({ sent: false });
                        setErrors({ submit: error_1.message });
                        setSubmitting(false);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    ;
    return (loading ?
        react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: loading },
            react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" }))
        :
            react_1["default"].createElement(formik_1.Formik, { enableReinitialize: true, initialValues: visit, validationSchema: validationSchema, onSubmit: onSumbit, name: "visitForm" }, function (_a) {
                var errors = _a.errors, handleBlur = _a.handleBlur, handleChange = _a.handleChange, handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, touched = _a.touched, values = _a.values, dirty = _a.dirty, isValid = _a.isValid, setFieldValue = _a.setFieldValue, setFieldTouched = _a.setFieldTouched;
                return (react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: isSubmitting },
                        react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" })),
                    react_1["default"].createElement(Dialog_1["default"], { open: props.open, onClose: onClose, "aria-labelledby": "form-dialog-title", maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true },
                        react_1["default"].createElement(DialogTitle_1["default"], { id: "form-dialog-title" }, "Patient Visit"),
                        react_1["default"].createElement(DialogContent_1["default"], { className: classes.root, dividers: true },
                            react_1["default"].createElement(core_1.Collapse, { "in": openAlert },
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                                        react_1["default"].createElement(Alert, { variant: "filled", severity: alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                                                    setOpenAlert(false);
                                                    e.preventDefault();
                                                } },
                                                react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, alertMessage)))),
                            react_1["default"].createElement(DialogContentText_1["default"], null, "For new patients select Initial Visit as the type of visit."),
                            react_1["default"].createElement(core_1.Card, null,
                                react_1["default"].createElement(core_1.CardContent, null,
                                    react_1["default"].createElement("form", { onSubmit: handleSubmit },
                                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                                react_1["default"].createElement(lab_1.Autocomplete, { autoHighlight: true, id: "visitType", options: visitTypes, getOptionLabel: function (visitType) { return visitType === null || visitType === void 0 ? void 0 : visitType.name; }, getOptionSelected: function (option, value) { return option.id === value.id; }, includeInputInList: true, disableClearable: true, onOpen: handleBlur("visitTypeField"), autoComplete: false, onChange: function (event, newValue) {
                                                        values.appointmentType = newValue;
                                                        values.appointmentTypeId = newValue.id;
                                                        setVisit(values);
                                                        handleChange("visitType");
                                                        setManualDirty(true);
                                                    }, onInputChange: function (event, newInputValue) {
                                                        setVisitTypeName(newInputValue);
                                                    }, inputValue: visitTypeName, value: visit.appointmentType, renderInput: function (params) { return react_1["default"].createElement(TextField, __assign({ required: true }, params, { label: "Purpose of Visit", error: Boolean(touched.appointmentType && errors.appointmentType), fullWidth: true, helperText: touched.appointmentType && errors.appointmentType, name: "visitTypeField", variant: "outlined" })); } }))),
                                        react_1["default"].createElement(pickers_1.MuiPickersUtilsProvider, { utils: date_fns_1["default"] },
                                            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 4 },
                                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                                    react_1["default"].createElement(pickers_1.KeyboardDatePicker, { disableFuture: true, id: "visitDate", required: true, variant: "inline", inputVariant: "outlined", label: "Date of Visit", format: "MM/dd/yyyy", value: values.appointmentDate, InputAdornmentProps: { position: "start" }, onChange: function (date) {
                                                            values.appointmentDate = date;
                                                            setVisit(values);
                                                        }, maxDate: new Date(), error: Boolean(touched.appointmentDate && errors.appointmentDate), onBlur: handleBlur, helperText: errors.appointmentDate && touched.appointmentDate })),
                                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                                    react_1["default"].createElement(pickers_1.KeyboardDatePicker, { autoOk: true, variant: "inline", inputVariant: "outlined", label: "Last Flu Shot Date", format: "MM/dd/yyyy", value: values.lastFluShotDate || null, InputAdornmentProps: { position: "start" }, onChange: function (date) { if (date != null)
                                                            values.lastFluShotDate = date; }, maxDate: new Date() })),
                                                react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                                    react_1["default"].createElement(pickers_1.KeyboardDatePicker, { autoOk: true, variant: "inline", inputVariant: "outlined", label: "Last Pneumo Shot Date", format: "MM/dd/yyyy", value: values.lastPneumoShotDate || null, InputAdornmentProps: { position: "start" }, onChange: function (date) { if (date != null)
                                                            values.lastPneumoShotDate = date; }, maxDate: new Date() })))),
                                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                                                react_1["default"].createElement(TextField, { name: "foodMedicationAllergies", multiline: true, rows: 3, label: "Food/Medication Allergies (command separated)", value: values.foodMedicationAllergies || "", error: Boolean(touched.foodMedicationAllergies && errors.foodMedicationAllergies), fullWidth: true, helperText: touched.foodMedicationAllergies && errors.foodMedicationAllergies, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 }))),
                                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                                                react_1["default"].createElement(TextField, { name: "typeOfAllergies", multiline: true, rows: 3, label: "Type of Allergies", value: values.typeOfAllergies || "", error: Boolean(touched.typeOfAllergies && errors.typeOfAllergies), fullWidth: true, helperText: touched.typeOfAllergies && errors.typeOfAllergies, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 }))),
                                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 1 },
                                                react_1["default"].createElement(core_1.InputLabel, { id: "smokes-select-label" }, "Smokes"),
                                                react_1["default"].createElement(core_1.Select, { labelId: "smoke-select-label", name: "smokeSelect", value: visit.smokes ? 2 : 1, onBlur: handleBlur, onChange: function (e) {
                                                        var newval = e.target.value;
                                                        setFieldValue(e.target.name, newval);
                                                        values.smokes = newval === 1 ? false : true;
                                                        if (!values.smokes) {
                                                            values.smokesPacksPerDay = 0;
                                                            setFieldValue("packsPerDay", 0);
                                                        }
                                                        setVisit(values);
                                                        handleChange(e.target.name);
                                                    } },
                                                    react_1["default"].createElement(core_1.MenuItem, { value: 1 }, "No"),
                                                    react_1["default"].createElement(core_1.MenuItem, { value: 2 }, "Yes"))),
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                                react_1["default"].createElement(TextField, { id: "outlined-number", label: "Number of Packs Per Day", type: "number", name: "packsPerDay", error: Boolean(errors.smokesPacksPerDay), helperText: errors.smokesPacksPerDay, fullWidth: true, InputProps: { inputProps: { min: "0", max: "10", step: "1" } }, InputLabelProps: {
                                                        shrink: true
                                                    }, variant: "outlined", onBlur: handleBlur, 
                                                    /*     onChange={(e) => {
                                                            setFieldValue(e.target.name!, e.target.value);
                                                            this.setState({ smokesPerDay: e.target.value });
                                                            values.smokesPacksPerDay = +this.state.smokesPerDay;
                                                            handleChange(e.target.name);
                                                        }
                                                        } */
                                                    value: visit.smokesPacksPerDay, disabled: !visit.smokes }),
                                                errors.smokesPacksPerDay && react_1["default"].createElement("p", null,
                                                    errors.smokesPacksPerDay,
                                                    " ")),
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 1 },
                                                react_1["default"].createElement(core_1.InputLabel, { id: "alcohol-select-label" }, "Alcohol"),
                                                react_1["default"].createElement(core_1.Select, { labelId: "alcohol-select-label", name: "alcohol-select", value: values.drinksAlcohol ? 2 : 1, onBlur: handleBlur, onChange: function (e) {
                                                        var newval = e.target.value;
                                                        setFieldValue(e.target.name, e.target.value);
                                                        //this.setState({ drinks: newval });
                                                        values.drinksAlcohol = newval === 1 ? false : true;
                                                        if (!values.drinksAlcohol) {
                                                            values.alcoholPerDay = 0;
                                                        }
                                                        setVisit(values);
                                                        handleChange(e.target.name);
                                                    } },
                                                    react_1["default"].createElement(core_1.MenuItem, { value: 1 }, "No"),
                                                    react_1["default"].createElement(core_1.MenuItem, { value: 2 }, "Yes"))),
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                                react_1["default"].createElement(TextField, { name: "drinks-per-day", label: "Drinks Per Day", type: "number", InputLabelProps: {
                                                        shrink: true
                                                    }, fullWidth: true, InputProps: { inputProps: { min: "0", max: "20", step: "1" } }, variant: "outlined", onBlur: handleBlur, 
                                                    /* onChange={(e) => {
                                                        setFieldValue(e.target.name!, e.target.value);
                                                        this.setState({ drinksPerDay: e.target.value });
                                                        handleChange(e.target.name);

                                                    }
                                                    } */
                                                    value: values.alcoholPerDay, disabled: !values.drinksAlcohol }))),
                                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                                                react_1["default"].createElement(TextField, { name: "medications", multiline: true, rows: 4, label: "Medication (command separated)", value: values.medications || "", error: Boolean(touched.medications && errors.medications), fullWidth: true, helperText: touched.medications && errors.medications, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 }))),
                                        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                                            react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                                                react_1["default"].createElement(TextField, { name: "additionalInfo", multiline: true, rows: 4, label: "Additional Information", value: values.additionalInfo || "", error: Boolean(touched.additionalInfo && errors.additionalInfo), fullWidth: true, helperText: touched.additionalInfo && errors.additionalInfo, onBlur: handleBlur, onChange: handleChange, variant: "outlined", my: 2 }))),
                                        react_1["default"].createElement(Button_1["default"], { type: "submit", ref: saveButtonRef, hidden: true }),
                                        react_1["default"].createElement(Button_1["default"], { ref: cancelButtonRef, hidden: true }))))),
                        react_1["default"].createElement(DialogActions_1["default"], null,
                            react_1["default"].createElement(CloseDialogButton_1["default"], { hidden: false, buttonText: dirty ? "Cancel" : "Close", prompt: dirty, closeDialogHandler: onClose }),
                            react_1["default"].createElement(Button_1["default"], { onClick: function () { var _a; (_a = saveButtonRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, variant: "outlined", color: "primary", disabled: isSubmitting || !isValid || !dirty }, "Save")))));
            }));
}
exports.VisitEditor = VisitEditor;
/* const VisitDialog = withStyles(moreStyles)(VisitBaseDialog);



VisitDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(moreStyles)(VisitDialog)
 */ 
