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
var icons_1 = require("@material-ui/icons");
var lab_1 = require("@material-ui/lab");
var system_1 = require("@material-ui/system");
var react_1 = require("react");
var macro_1 = require("styled-components/macro");
var DiaRegApi_1 = require("../../api/DiaRegApi");
var BasicTable_1 = require("../Tables/BasicTable");
var DiaRegApi_2 = require("./../../api/DiaRegApi");
var LocationEditor_1 = require("./LocationEditor");
var Divider = macro_1["default"](core_1.Divider)(system_1.spacing);
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
var useStyles = core_1.makeStyles(function (theme) {
    return ({
        root: {
            flexGrow: 1
        }
    });
});
function createNewPersonAddress(personId) {
    var newPersonAddress = new DiaRegApi_1.PersonAddress();
    newPersonAddress.active = true;
    newPersonAddress.location = new DiaRegApi_2.Location();
    newPersonAddress.location.city = new DiaRegApi_1.City({ id: 0, name: "", active: true, regionId: 0 });
    newPersonAddress.location.region = new DiaRegApi_1.Region({ id: 0, name: "", active: true, countryId: 0 });
    newPersonAddress.personId = personId;
    newPersonAddress.id = 0;
    newPersonAddress.type = new DiaRegApi_1.AddressType();
    newPersonAddress.type.id = 0;
    return newPersonAddress;
}
function Locations(props) {
    var _this = this;
    var _a = react_1["default"].useState(false), showingEditor = _a[0], setShowingEditor = _a[1];
    var _b = react_1["default"].useState(false), showEditor = _b[0], setShowEditor = _b[1];
    var _c = react_1["default"].useState(new DiaRegApi_1.PersonAddress()), selectedAddress = _c[0], setSelectedAddress = _c[1];
    var _d = react_1["default"].useState(new Array()), addresses = _d[0], setAddresses = _d[1];
    var _e = react_1["default"].useState(0), selectedAddressId = _e[0], setSelectedAddressId = _e[1];
    var _f = react_1["default"].useState(false), openAlert = _f[0], setOpenAlert = _f[1];
    var _g = react_1["default"].useState(""), alertMessage = _g[0], setAlertMessage = _g[1];
    var _h = react_1["default"].useState("success"), alertSeverity = _h[0], setAlertSeverity = _h[1];
    var _j = react_1["default"].useState(true), loading = _j[0], setLoading = _j[1];
    var _k = react_1["default"].useState(false), deleting = _k[0], setDeleting = _k[1];
    var _l = react_1["default"].useState(0), count = _l[0], setCount = _l[1];
    var classes = useStyles();
    function onDataChange(dataChanged) {
        if (dataChanged) {
            setCount(function (count) { return count + 1; });
        }
        setShowEditor(false);
    }
    react_1["default"].useEffect(function () {
        var active = true;
        if (showingEditor) {
            if (selectedAddressId != 0) {
                (function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getAddress(selectedAddressId).then(function (value) {
                                    if (value.status == "success") {
                                        var data = value.data;
                                        setSelectedAddress(data);
                                        setShowEditor(true);
                                    }
                                    else {
                                        showAlert(value.status, value.message);
                                    }
                                })["catch"](function (error) {
                                    showAlert("error", "An expected error has occurred: " + error.message);
                                })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })();
            }
            setShowingEditor(false);
        }
        return function () {
            active = false;
        };
    }, [showEditor, selectedAddressId]);
    react_1["default"].useEffect(function () {
        var active = true;
        if (loading) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getAddresses(props.personId).then(function (value) {
                                if (value.status == "success") {
                                    var data = value.data;
                                    setAddresses(data);
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
    react_1["default"].useEffect(function () {
        var active = true;
        if (deleting) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, deleteAddress(selectedAddressId).then(function (value) {
                                if (value.status == "success") {
                                    setLoading(true);
                                }
                                else {
                                    showAlert(value.status, value.message);
                                }
                            })["catch"](function (error) {
                                showAlert("error", "An expected error has occurred: " + error.message);
                            })];
                        case 1:
                            _a.sent();
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
    function getAddress(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_2.DiaRegWebApiClient().getDoctorLocation(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function getAddresses(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_2.DiaRegWebApiClient().getDoctorLocations(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function deleteAddress(id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DiaRegApi_2.DiaRegWebApiClient().deleteDoctorLocation(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function onDeleteAddress(index) {
        setSelectedAddressId(addresses[index].id);
        setDeleting(true);
    }
    function showAlert(alertSeverity, alertMessage) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    }
    ;
    function showAddress(index) {
        setSelectedAddress(addresses[index]);
        setShowEditor(true);
    }
    function showNewAddress() {
        var personAddress = createNewPersonAddress(props.personId);
        setSelectedAddress(personAddress);
        setShowEditor(true);
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Grid, { justify: "space-between", container: true, spacing: 10 },
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Typography, { variant: "h6", gutterBottom: true, display: "inline" }, "Locations")),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", onClick: function () { showNewAddress(); } },
                        react_1["default"].createElement(icons_1.Add, null),
                        "New Location")))),
        react_1["default"].createElement(Divider, { my: 3 }),
        react_1["default"].createElement(core_1.Collapse, { "in": openAlert },
            react_1["default"].createElement(core_1.Grid, { container: true, spacing: 8, className: classes.root },
                react_1["default"].createElement(core_1.Grid, { item: true, md: 12, className: classes.root },
                    react_1["default"].createElement(lab_1.Alert, { variant: "filled", severity: alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                                setOpenAlert(false);
                                e.preventDefault();
                            } },
                            react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, alertMessage)))),
        react_1["default"].createElement(BasicTable_1["default"], { columns: buildColumns(), data: addresses, allowEdit: true, allowDelete: true, viewItemHandler: showAddress, deleteHandler: onDeleteAddress }),
        showEditor ?
            react_1["default"].createElement(LocationEditor_1["default"], { open: showEditor, personId: props.personId, address: selectedAddress, onClose: onDataChange })
            :
                null));
}
exports["default"] = Locations;
