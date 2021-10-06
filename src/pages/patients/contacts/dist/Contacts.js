"use strict";
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
var Paper_1 = require("@material-ui/core/Paper");
var styles_1 = require("@material-ui/core/styles");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableCell_1 = require("@material-ui/core/TableCell");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var TableRow_1 = require("@material-ui/core/TableRow");
var icons_1 = require("@material-ui/icons");
var lab_1 = require("@material-ui/lab");
var system_1 = require("@material-ui/system");
var react_1 = require("react");
var DiaRegApi_1 = require("../../../api/DiaRegApi");
var Contact_1 = require("./Contact");
var Alert = core_1.styled(lab_1.Alert)(system_1.spacing);
var StyledTableCell = styles_1.withStyles(function (theme) { return ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}); })(TableCell_1["default"]);
var StyledTableRow = styles_1.withStyles(function (theme) { return ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}); })(TableRow_1["default"]);
var styles = core_1.createStyles({
    root: {
        flexGrow: 1
    }
});
function getContacts(id) {
    return new Promise(function (resolve) {
        new DiaRegApi_1.DiaRegWebApiClient().getContacts(id).then(function (value) {
            resolve(value);
        });
    });
}
function ContactsTable(props) {
    var _this = this;
    var _a = react_1["default"].useState([]), rows = _a[0], setRows = _a[1];
    var _b = react_1["default"].useState(false), openAlert = _b[0], setOpenAlert = _b[1];
    var _c = react_1["default"].useState("success"), alertSeverity = _c[0], setAlertSeverity = _c[1];
    var _d = react_1["default"].useState("success"), alertMessage = _d[0], setAlertMessage = _d[1];
    var _e = react_1.useState(0), count = _e[0], setCount = _e[1];
    var classes = props.classes;
    function showAlert(alertSeverity, alertMessage) {
        setOpenAlert(true);
        setAlertSeverity(alertSeverity);
        setAlertMessage(alertMessage);
    }
    function onDataChange(dataChanged) {
        if (dataChanged) {
            setCount(function (count) { return count + 1; });
        }
    }
    react_1["default"].useEffect(function () {
        var active = true;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getContacts(props.patientId)];
                    case 1:
                        response = _a.sent();
                        if (!active) {
                            return [2 /*return*/];
                        }
                        setRows(response.data);
                        return [2 /*return*/];
                }
            });
        }); })();
        return function () {
            active = false;
        };
    }, [count, props.patientId]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Grid, { justify: "space-between", container: true },
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline" }, "Contacts")),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(Contact_1["default"], { contactId: 0, patientId: props.patientId, parentAlertHandler: showAlert, onClose: onDataChange }))),
        react_1["default"].createElement(core_1.Grid, { justify: "space-between", container: true, className: classes.root },
            react_1["default"].createElement(core_1.Collapse, { "in": openAlert, className: classes.root },
                react_1["default"].createElement(Alert, { variant: "filled", severity: alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                            setOpenAlert(false);
                            e.preventDefault();
                        } },
                        react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, alertMessage))),
        react_1["default"].createElement(TableContainer_1["default"], { component: Paper_1["default"] },
            react_1["default"].createElement(Table_1["default"], { className: classes.table, "aria-label": "customized table" },
                react_1["default"].createElement(TableHead_1["default"], null,
                    react_1["default"].createElement(TableRow_1["default"], null,
                        react_1["default"].createElement(StyledTableCell, { padding: "checkbox" }),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, "Last Name"),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, "First Name"),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, "Home Phone"),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, "Cell Phone"),
                        react_1["default"].createElement(StyledTableCell, null, "Type of Contact"))),
                react_1["default"].createElement(TableBody_1["default"], null, rows.map(function (row) {
                    var _a;
                    return (react_1["default"].createElement(StyledTableRow, { key: row.id },
                        react_1["default"].createElement(StyledTableCell, { align: "left" },
                            react_1["default"].createElement(Contact_1["default"], { contactId: row.id, patientId: props.patientId, parentAlertHandler: showAlert, onClose: onDataChange })),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, row.lastName),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, row.firstName),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, row.homePhone),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, row.cellPhone),
                        react_1["default"].createElement(StyledTableCell, { align: "left" }, (_a = row.contactType) === null || _a === void 0 ? void 0 : _a.name)));
                }))))));
}
exports["default"] = styles_1.withStyles(styles)(ContactsTable);
