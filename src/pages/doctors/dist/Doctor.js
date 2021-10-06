"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var system_1 = require("@material-ui/system");
var react_1 = require("react");
var react_helmet_1 = require("react-helmet");
var macro_1 = require("styled-components/macro");
var LocationEditor_1 = require("../../components/location/LocationEditor");
var BasicTable_1 = require("../../components/Tables/BasicTable");
var Divider = macro_1["default"](core_1.Divider)(system_1.spacing);
var Card = macro_1["default"](core_1.Card)(system_1.spacing);
var FormControl = macro_1["default"](core_1.FormControl)(system_1.spacing);
var TextField = macro_1["default"](core_1.TextField)(system_1.spacing);
var Button = macro_1["default"](core_1.Button)(system_1.spacing);
var CloudUpload = macro_1["default"](icons_1.CloudUpload)(system_1.spacing);
var CenteredContent = macro_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  text-align: center;\n"], ["\n  text-align: center;\n"])));
var BigAvatar = macro_1["default"](core_1.Avatar)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 120px;\n  height: 120px;\n  margin: 0 auto ", "px;\n"], ["\n  width: 120px;\n  height: 120px;\n  margin: 0 auto ", "px;\n"])), function (props) { return props.theme.spacing(2); });
var Paper = macro_1["default"](core_1.Paper)(system_1.spacing);
function Name() {
    return (react_1["default"].createElement(Card, { mb: 6 },
        react_1["default"].createElement(core_1.CardContent, null,
            react_1["default"].createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, "Personal Info"),
            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                    react_1["default"].createElement(TextField, { id: "first-name", label: "First name", variant: "outlined", defaultValue: "Lucy", fullWidth: true, my: 2 })),
                react_1["default"].createElement(core_1.Grid, { item: true, md: 6 },
                    react_1["default"].createElement(TextField, { id: "last-name", label: "Last name", variant: "outlined", defaultValue: "Lavender", fullWidth: true, my: 2 }))),
            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
                react_1["default"].createElement(core_1.Grid, { item: true, md: 12 },
                    react_1["default"].createElement(TextField, { id: "email", label: "Email", variant: "outlined", type: "email", defaultValue: "lucylavender@gmail.com", fullWidth: true, my: 2 }))),
            react_1["default"].createElement(Button, { variant: "contained", color: "primary", mt: 3 }, "Save changes"))));
}
function buildColumns() {
    var columns = new Array();
    columns.push({ header: "Last Name", field: "lastName" });
    columns.push({ header: "First Name", field: "firstName" });
    columns.push({ header: "Email Address", field: "emailAddress" });
    return columns;
}
function Locations() {
    return (react_1["default"].createElement(Card, { mb: 6 },
        react_1["default"].createElement(core_1.CardContent, null,
            react_1["default"].createElement(core_1.Grid, { justify: "space-between", container: true, spacing: 10 },
                react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement(core_1.Typography, { variant: "h6", gutterBottom: true, display: "inline" }, "Locations")),
                react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(LocationEditor_1["default"], null)))),
            react_1["default"].createElement(Divider, { my: 3 }),
            react_1["default"].createElement(BasicTable_1["default"], { columns: buildColumns(), data: [], allowEdit: true, allowDelete: true, viewItemHandler: function () { } }))));
}
function MedicalSpecialities() {
    var _a = react_1["default"].useState({
        gilad: true,
        jason: false,
        antoine: false
    }), state = _a[0], setState = _a[1];
    var handleChange = function (event) {
        var _a;
        setState(__assign(__assign({}, state), (_a = {}, _a[event.target.name] = event.target.checked, _a)));
    };
    var gilad = state.gilad, jason = state.jason, antoine = state.antoine;
    return (react_1["default"].createElement(Card, { mb: 6 },
        react_1["default"].createElement(core_1.CardContent, null,
            react_1["default"].createElement(core_1.Typography, { variant: "h6", gutterBottom: true }, "Medical Specialities"),
            react_1["default"].createElement(Paper, { mt: 3 },
                react_1["default"].createElement(FormControl, null,
                    react_1["default"].createElement(core_1.FormLabel, { component: "legend" }, "Assign one or more specialities"),
                    react_1["default"].createElement(core_1.FormGroup, null,
                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: antoine, onChange: handleChange, name: "gilad" }), label: "Exercise Physiologist" }),
                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: antoine, onChange: handleChange, name: "gilad" }), label: "Nephrologist" }),
                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: antoine, onChange: handleChange, name: "gilad" }), label: "Ophthalmologist" }),
                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: antoine, onChange: handleChange, name: "gilad" }), label: "Optometrist" }),
                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: antoine, onChange: handleChange, name: "gilad" }), label: "Podiatrist" }),
                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: jason, onChange: handleChange, name: "jason" }), label: "Primary care physician" }),
                        react_1["default"].createElement(core_1.FormControlLabel, { control: react_1["default"].createElement(core_1.Checkbox, { checked: antoine, onChange: handleChange, name: "antoine" }), label: "Registered Dietitian Nutritionist" })))),
            react_1["default"].createElement(Button, { variant: "contained", color: "primary", mt: 3 }, "Save changes"))));
}
function DoctorEditor() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_helmet_1.Helmet, { title: "Settings" }),
        react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline" }, "Doctor"),
        react_1["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
            react_1["default"].createElement(core_1.Grid, { item: true, xs: 8 },
                react_1["default"].createElement(Name, null),
                react_1["default"].createElement(Locations, null)),
            react_1["default"].createElement(core_1.Grid, { item: true, xs: 4 },
                react_1["default"].createElement(MedicalSpecialities, null)))));
}
exports["default"] = DoctorEditor;
var templateObject_1, templateObject_2;
