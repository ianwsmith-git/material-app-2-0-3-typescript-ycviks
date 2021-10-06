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
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var DiaRegApi_1 = require("../../api/DiaRegApi");
var ListPage_1 = require("../../components/pages/ListPage");
var constants_1 = require("../../constants");
var commandBarReducer_1 = require("../../redux/reducers/commandBarReducer");
var store_1 = require("../../redux/store");
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        flexGrow: 1
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff'
    }
}); });
function getDoctors(search) {
    return new DiaRegApi_1.DiaRegWebApiClient().getDoctors(search);
}
function getDoctorsConfig() {
    return new DiaRegApi_1.DiaRegWebApiClient().getDoctorsGridConfiguration();
}
function Doctors() {
    var _this = this;
    var _a = react_1.useState([]), rows = _a[0], setRows = _a[1];
    var _b = react_1["default"].useState(0), rowCount = _b[0], setRowCount = _b[1];
    var _c = react_1.useState(true), refresh = _c[0], setRefresh = _c[1];
    var _d = react_1["default"].useState(true), loading = _d[0], setLoading = _d[1];
    var _e = react_1["default"].useState(false), openAlert = _e[0], setOpenAlert = _e[1];
    var _f = react_1["default"].useState(""), alertMessage = _f[0], setAlertMessage = _f[1];
    var _g = react_1["default"].useState("success"), alertSeverity = _g[0], setAlertSeverity = _g[1];
    var _h = react_1["default"].useState(0), pageIndex = _h[0], setPageIndex = _h[1];
    var _j = react_1["default"].useState(constants_1.DEFAULT_PAGESIZE), pageSize = _j[0], setPageSize = _j[1];
    var _k = react_1["default"].useState(), filter = _k[0], setFilter = _k[1];
    var _l = react_1["default"].useState(false), columnsLoaded = _l[0], setColumnsLoaded = _l[1];
    var _m = react_1["default"].useState([]), columns = _m[0], setColumns = _m[1];
    var classes = useStyles();
    var history = react_router_dom_1.useHistory();
    store_1["default"].dispatch(commandBarReducer_1.hideCommandBar());
    function showAlert(alertSeverity, alertMessage) {
        setOpenAlert(true);
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
    }
    function hideAlert() {
        setOpenAlert(false);
    }
    function handlePageChange(pageIndex, pageSize) {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setRefresh(true);
    }
    function handleFilter(tree) {
        setFilter(tree);
        setRefresh(true);
    }
    function handleView(index) {
        var row = rows[index];
        history.push('/doctor/' + row.id);
    }
    var isMounted = react_1.useRef(false);
    react_1.useEffect(function () {
        var active = true;
        if (refresh) {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var search;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            search = {
                                "criteria": JSON.stringify(filter),
                                "paging": {
                                    "pageSize": pageSize,
                                    "pageIndex": pageIndex
                                }
                            };
                            if (!!columnsLoaded) return [3 /*break*/, 2];
                            return [4 /*yield*/, getDoctorsConfig().then(function (response) {
                                    var data = response.data;
                                    var columns = new Array();
                                    data.forEach(function (column) {
                                        columns.push({ header: column.value, field: column.key });
                                    });
                                    setColumns(columns);
                                    setColumnsLoaded(true);
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, getDoctors(search).then(function (response) {
                                var _a;
                                if (response.status === "success") {
                                    var newRows = (_a = response.data) === null || _a === void 0 ? void 0 : _a.map(function (person) {
                                        return person;
                                    });
                                    if (!active) {
                                        return;
                                    }
                                    setRows(newRows);
                                    setRowCount(response.rowCount);
                                    hideAlert();
                                }
                                else {
                                    showAlert("error", response.message);
                                }
                                isMounted.current = true;
                            })["catch"](function (error) {
                                showAlert("error", error.message);
                            })];
                        case 3:
                            _a.sent();
                            setLoading(false);
                            setRefresh(false);
                            return [2 /*return*/];
                    }
                });
            }); })();
        }
    }, [refresh, pageIndex, pageSize, filter, columnsLoaded]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Backdrop, { className: classes.backdrop, open: loading },
            react_1["default"].createElement(core_1.CircularProgress, { color: "inherit" })),
        react_1["default"].createElement(core_1.Collapse, { "in": openAlert },
            react_1["default"].createElement(lab_1.Alert, { variant: "filled", severity: alertSeverity, action: react_1["default"].createElement(core_1.IconButton, { "aria-label": "close", color: "inherit", size: "small", onClick: function (e) {
                        setOpenAlert(false);
                        e.preventDefault();
                    } },
                    react_1["default"].createElement(icons_1.Close, { fontSize: "inherit" })) }, alertMessage)),
        react_1["default"].createElement(ListPage_1["default"], { title: "Doctors", data: rows, columns: columns, allowDelete: false, allowEdit: true, rowCount: rowCount, allowPaging: true, pagingHandler: handlePageChange, filterHander: handleFilter, viewItemHandler: handleView })));
}
exports["default"] = Doctors;
