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
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var system_1 = require("@material-ui/system");
var react_1 = require("react");
var macro_1 = require("styled-components/macro");
var DiaRegApi_1 = require("../../api/DiaRegApi");
var BasicTable_1 = require("../../components/Tables/BasicTable");
var FilterDialog_1 = require("../dialogs/FilterDialog");
var constants_1 = require("./../../constants");
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    },
    button: {
        margin: theme.spacing(1)
    }
}); });
var Divider = macro_1["default"](core_1.Divider)(system_1.spacing);
var defaultSearch = new DiaRegApi_1.ListSearch({
    "criteria": null,
    "paging": new DiaRegApi_1.Paging({
        "pageSize": 10,
        "pageIndex": 1
    })
});
function ListPage(props) {
    var classes = useStyles();
    var _a = react_1["default"].useState(0), page = _a[0], setPage = _a[1];
    var _b = react_1["default"].useState(constants_1.DEFAULT_PAGESIZE), rowsPerPage = _b[0], setRowsPerPage = _b[1];
    var _c = react_1["default"].useState(defaultSearch), searchParams = _c[0], setSearchParams = _c[1];
    function handleChangePage(event, newPage) {
        setPage(newPage);
        props.pagingHandler(newPage, rowsPerPage);
    }
    ;
    function saveSearch(criteria, page, pageSize) {
        setSearchParams(new DiaRegApi_1.ListSearch({
            "criteria": criteria,
            "paging": new DiaRegApi_1.Paging({
                "pageSize": pageSize,
                "pageIndex": page
            })
        }));
    }
    function handleChangeRowsPerPage(event) {
        var val = parseInt(event.target.value, 10);
        setRowsPerPage(val);
        setPage(0);
        props.pagingHandler(page, val);
    }
    ;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline" }, props.title),
        react_1["default"].createElement(Divider, { my: 2 }),
        react_1["default"].createElement(core_1.Paper, { className: classes.root },
            react_1["default"].createElement(core_1.Card, null,
                react_1["default"].createElement(core_1.CardContent, null,
                    react_1["default"].createElement(core_1.Grid, { justify: "space-between", container: true },
                        react_1["default"].createElement(core_1.Grid, { item: true },
                            react_1["default"].createElement(FilterDialog_1["default"], { title: "Filter Doctors", filterHander: props.filterHander })),
                        react_1["default"].createElement(core_1.Grid, { item: true }, props.allowPaging ?
                            react_1["default"].createElement(core_1.TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: props.rowCount, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }) :
                            null)),
                    react_1["default"].createElement(BasicTable_1["default"], __assign({}, props)),
                    react_1["default"].createElement(core_1.Grid, { justify: "space-between", container: true },
                        react_1["default"].createElement(core_1.Grid, { item: true }),
                        react_1["default"].createElement(core_1.Grid, { item: true }, props.allowPaging ?
                            react_1["default"].createElement(core_1.TablePagination, { rowsPerPageOptions: [5, 10, 25], component: "div", count: props.rowCount, rowsPerPage: rowsPerPage, page: page, onChangePage: handleChangePage, onChangeRowsPerPage: handleChangeRowsPerPage }) :
                            null)))))));
}
exports["default"] = ListPage;
