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
var colors_1 = require("@material-ui/core/colors");
var icons_1 = require("@material-ui/icons");
var lab_1 = require("@material-ui/lab");
var Autocomplete_1 = require("@material-ui/lab/Autocomplete");
var system_1 = require("@material-ui/system");
var formik_1 = require("formik");
var react_1 = require("react");
var macro_1 = require("styled-components/macro");
var Yup = require("yup");
var DiaRegApi_1 = require("../../api/DiaRegApi");
var CloseDialogButton_1 = require("../dialogs/CloseDialogButton");
var TextField = macro_1["default"](core_1.TextField)(system_1.spacing);
var Button = macro_1["default"](core_1.Button)(system_1.spacing);
var Select = macro_1["default"](core_1.Select)(system_1.spacing);
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
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width: '100%'
        }
    });
});
var validationSchema = Yup.object().shape({
    name: Yup.string().required('The Name field is required.'),
    address1: Yup.string().required('The Address 1 field is required.'),
    "type": Yup.object().shape({ id: Yup.number().moreThan(0) }),
    "phoneNumber": Yup.string().required('This Phone Number field is required.'),
    "location": Yup.object().shape({
        city: Yup.object().shape({
            id: Yup.number().moreThan(0)
        })
    })
});
function LocationEditor(props) {
    var _this = this;
    var _a = react_1["default"].useState(props.address), personAddress = _a[0], setPersonAddress = _a[1];
    var _b = react_1["default"].useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_1["default"].useState(true), openDialog = _c[0], setOpenDialog = _c[1];
    var _d = react_1["default"].useState([]), options = _d[0], setOptions = _d[1];
    var _e = react_1["default"].useState(props.address.location), selectedLocation = _e[0], setSelectedLocation = _e[1];
    var _f = react_1["default"].useState(true), loading = _f[0], setLoading = _f[1];
    var _g = react_1["default"].useState(false), dataChanged = _g[0], setDataChanged = _g[1];
    var _h = react_1["default"].useState(false), openAlert = _h[0], setOpenAlert = _h[1];
    var _j = react_1["default"].useState(""), alertMessage = _j[0], setAlertMessage = _j[1];
    var _k = react_1["default"].useState("success"), alertSeverity = _k[0], setAlertSeverity = _k[1];
    var _l = react_1["default"].useState([]), addressTypes = _l[0], setAddressTypes = _l[1];
    var saveButtonRef = react_1["default"].createRef();
    var cancelButtonRef = react_1["default"].createRef();
    var classes = useStyles();
    var onChangeHandle = function (value) { return __awaiter(_this, void 0, void 0, function () {
        var response, cities, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    // use the changed value to make request and then use the result. Which
                    console.log(value);
                    return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().searchLocationByCityName(value)];
                case 1:
                    response = _a.sent();
                    if (!(response.status == "success")) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.data];
                case 2:
                    cities = _a.sent();
                    setOptions(cities);
                    return [3 /*break*/, 4];
                case 3:
                    console.log(response.message);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log(error_1.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var onLocationSelectionChanged = function (city) { return __awaiter(_this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getLocationByCityId(city.id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    function showAlert(alertSeverity, alertMessage) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    }
    ;
    function getAddressTypes() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().getAddressTypes()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    react_1["default"].useEffect(function () {
        var active = true;
        if (loading) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getAddressTypes().then(function (value) {
                                if (value.status == "success") {
                                    var data = value.data;
                                    setAddressTypes(data);
                                }
                                else {
                                    showAlert(value.status, value.message);
                                }
                            })["catch"](function (error) {
                                showAlert("error", "An expected error has occurred: " + error.message);
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
    function handleCancelClose() {
        setOpenAlert(false);
        props.onClose(dataChanged);
    }
    ;
    function handleSave() {
    }
    ;
    function handleShow() {
        setLoading(true);
    }
    ;
    function addLocation(address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().addDoctorLocation(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function updateLocation(address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_1.DiaRegWebApiClient().updateDoctorLocation(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function onSumbit(values, _a) {
        var resetForm = _a.resetForm, setErrors = _a.setErrors, setStatus = _a.setStatus, setSubmitting = _a.setSubmitting, touched = _a.touched;
        return __awaiter(this, void 0, void 0, function () {
            var responseInfo, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        //values.location = selectedLocation!;
                        //.values.type = personAddress.type;
                        setSubmitting(true);
                        responseInfo = void 0;
                        if (!(values.id !== 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, updateLocation(values)];
                    case 1:
                        responseInfo = (_b.sent());
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, addLocation(values)];
                    case 3:
                        responseInfo = (_b.sent());
                        _b.label = 4;
                    case 4:
                        if (responseInfo.status === "success") {
                            if (values.id === 0) {
                                values.id = responseInfo.data;
                            }
                            setDataChanged(true);
                            resetForm({ values: values });
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
    return (react_1["default"].createElement("div", null, loading ?
        react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: loading },
            react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" }))
        :
            react_1["default"].createElement(formik_1.Formik, { enableReinitialize: true, initialValues: props.address, validationSchema: validationSchema, onSubmit: onSumbit, name: "locationForm" }, function (_a) {
                var errors = _a.errors, handleBlur = _a.handleBlur, handleChange = _a.handleChange, handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, touched = _a.touched, values = _a.values, dirty = _a.dirty, isValid = _a.isValid, setFieldValue = _a.setFieldValue, setFieldTouched = _a.setFieldTouched;
                return (react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: isSubmitting },
                        react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" })),
                    react_1["default"].createElement(core_1.Dialog, { open: props.open, onClose: handleCancelClose, "aria-labelledby": "form-dialog-title", maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true, fullWidth: true },
                        react_1["default"].createElement(core_1.DialogTitle, { id: "form-dialog-title" },
                            "  ",
                            react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline", color: "textPrimary" }, "Location"),
                            " "),
                        react_1["default"].createElement(core_1.DialogContent, { dividers: true },
                            react_1["default"].createElement(core_1.Collapse, { "in": openAlert },
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                                        react_1["default"].createElement(lab_1.Alert, { variant: "filled", severity: alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                                                    setOpenAlert(false);
                                                    e.preventDefault();
                                                } },
                                                react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, alertMessage)))),
                            react_1["default"].createElement("form", { onSubmit: handleSubmit },
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                        react_1["default"].createElement(TextField, { id: "name", label: "Name", variant: "outlined", fullWidth: true, my: 2, required: true, value: values.name, onBlur: handleBlur, onChange: handleChange, error: Boolean(touched.name && errors.name) })),
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                        react_1["default"].createElement(core_1.InputLabel, { id: "address-type-label" }, "Address Type"),
                                        react_1["default"].createElement(Select, { labelId: "address-type-label", variant: "outlined", name: "address-type", fullWidth: true, required: true, onBlur: handleBlur, onChange: function (event) {
                                                var type = values.type;
                                                type.id = +event.target.value;
                                                type.active = true;
                                                setFieldValue("type", type);
                                            }, id: "address-type", label: "Address Type", value: values.type.id == 0 ? "" : values.type.id, defaultValue: "" }, addressTypes.map(function (item, index) {
                                            return (react_1["default"].createElement(core_1.MenuItem, { key: item.id, value: item.id }, item.name));
                                        })))),
                                react_1["default"].createElement(TextField, { id: "phoneNumber", label: "Phone Number", variant: "outlined", error: Boolean(touched.phoneNumber && errors.phoneNumber), required: true, fullWidth: true, my: 2, onBlur: handleBlur, onChange: handleChange, value: values.phoneNumber }),
                                react_1["default"].createElement(TextField, { id: "address1", label: "Address", variant: "outlined", error: Boolean(touched.address1 && errors.address1), required: true, fullWidth: true, my: 2, onBlur: handleBlur, onChange: handleChange, value: values.address1 }),
                                react_1["default"].createElement(TextField, { id: "address2", label: "Apartment, suite, studio, or floor", variant: "outlined", fullWidth: true, my: 2, onBlur: handleBlur, onChange: handleChange, value: values.address2 }),
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                                        react_1["default"].createElement(Autocomplete_1["default"], { id: "city", onOpen: handleBlur, onChange: function (event, newValue) {
                                                onLocationSelectionChanged(newValue).then(function (value) {
                                                    setFieldValue("location", value.data);
                                                })["catch"](function (error) {
                                                    showAlert("Error", error.message);
                                                });
                                            }, getOptionSelected: function (option, value) {
                                                return option.id === value.id;
                                            }, getOptionLabel: function (option) { return option.name; }, options: options, loading: loading, fullWidth: true, value: values.location.city, renderInput: function (params) { return (react_1["default"].createElement(TextField, __assign({}, params, { label: "City (start type the name of the city)", variant: "outlined", name: "value.location.city", onChange: function (ev) {
                                                    if (ev.target.value !== "" || ev.target.value !== null) {
                                                        onChangeHandle(ev.target.value);
                                                    }
                                                }, required: true, value: values.location.city.name == null ? "" : values.location.city.name, InputProps: __assign(__assign({}, params.InputProps), { endAdornment: (react_1["default"].createElement(react_1["default"].Fragment, null,
                                                        loading ? (react_1["default"].createElement(core_1.CircularProgress, { color: "inherit", size: 20 })) : null,
                                                        params.InputProps.endAdornment)) }) }))); } })),
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 4 },
                                        react_1["default"].createElement(TextField, { id: "state", label: "Region", variant: "outlined", fullWidth: true, my: 2, value: values.location.region != null ? values.location.region.name : "", InputProps: {
                                                readOnly: true
                                            } })),
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 2 },
                                        react_1["default"].createElement(TextField, { id: "zip", label: "Zip", variant: "outlined", fullWidth: true, my: 2, hidden: true, InputProps: {
                                                readOnly: true
                                            } }))),
                                react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                                    react_1["default"].createElement(core_1.Grid, { item: true, md: 2 },
                                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: values.active, value: values.active }), label: "Active" }))),
                                react_1["default"].createElement(Button, { type: "submit", ref: saveButtonRef, hidden: true }),
                                react_1["default"].createElement(Button, { ref: cancelButtonRef, hidden: true }))),
                        react_1["default"].createElement(core_1.DialogActions, null,
                            react_1["default"].createElement(CloseDialogButton_1["default"], { hidden: false, buttonText: dirty ? "Cancel" : "Close", prompt: dirty, closeDialogHandler: handleCancelClose }),
                            react_1["default"].createElement(Button, { onClick: function () {
                                    var _a;
                                    (_a = saveButtonRef.current) === null || _a === void 0 ? void 0 : _a.click();
                                }, disabled: isSubmitting || !isValid || !dirty, variant: "outlined", color: "primary" }, "Save")))));
            })));
}
exports["default"] = LocationEditor;
