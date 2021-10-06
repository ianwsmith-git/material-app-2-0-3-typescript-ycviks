"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var Paper_1 = require("@material-ui/core/Paper");
var styles_1 = require("@material-ui/core/styles");
var Table_1 = require("@material-ui/core/Table");
var TableBody_1 = require("@material-ui/core/TableBody");
var TableContainer_1 = require("@material-ui/core/TableContainer");
var TableHead_1 = require("@material-ui/core/TableHead");
var system_1 = require("@material-ui/system");
var lodash_1 = require("lodash");
var react_1 = require("react");
var tables_1 = require("../../theme/tables");
var DeleteRecordButton_1 = require("../DeleteRecordButton");
var Card = core_1.styled(core_1.Card)(system_1.spacing);
var useStyles = styles_1.makeStyles(function (theme) {
    return ({
        root: {
            width: '100%',
            paddingLeft: '0px',
            paddingRight: '0px'
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        table: {
            width: '100%'
        },
        container: {
            maxHeight: 800
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)'
        },
        title: {
            fontSize: 14
        },
        pos: {
            marginBottom: 12
        }
    });
});
function BasicTable(props) {
    function handleView(index) {
        props.viewItemHandler(index);
    }
    function handleDelete(index) {
        props.deleteHandler(index);
    }
    var classes = useStyles();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(Paper_1["default"], { className: classes.root },
                react_1["default"].createElement(Card, null,
                    react_1["default"].createElement(core_1.CardContent, { className: classes.root },
                        react_1["default"].createElement(TableContainer_1["default"], { component: Paper_1["default"], className: classes.container },
                            react_1["default"].createElement(Table_1["default"], { stickyHeader: true, "aria-label": "customized table", className: classes.table },
                                react_1["default"].createElement(TableHead_1["default"], null,
                                    react_1["default"].createElement(tables_1.StyledTableRow, { key: -1 },
                                        props.allowEdit ?
                                            react_1["default"].createElement(tables_1.StyledTableCell, { padding: "checkbox" })
                                            :
                                                null,
                                        props.allowDelete ?
                                            react_1["default"].createElement(tables_1.StyledTableCell, { padding: "checkbox" })
                                            :
                                                null,
                                        props.columns.map(function (column) { return (react_1["default"].createElement(tables_1.StyledTableCell, { align: "left", padding: "default" }, column.header)); }))),
                                react_1["default"].createElement(TableBody_1["default"], null, props.data.map(function (row, index) { return (react_1["default"].createElement(tables_1.StyledTableRow, { key: index },
                                    props.allowEdit ?
                                        react_1["default"].createElement(tables_1.StyledTableCell, { padding: "checkbox" },
                                            react_1["default"].createElement(core_1.Button, { variant: "contained", color: "primary", disableElevation: true, onClick: function () { handleView(index); } }, "View"))
                                        :
                                            null,
                                    props.allowDelete ?
                                        react_1["default"].createElement(tables_1.StyledTableCell, { padding: "checkbox" },
                                            react_1["default"].createElement(DeleteRecordButton_1["default"], { index: index, hidden: false, buttonText: "Delete", prompt: true, deleteRecordHandler: function (index) { handleDelete(index); } }))
                                        :
                                            null,
                                    props.columns.map(function (column) { return (react_1["default"].createElement(tables_1.StyledTableCell, { align: "left", padding: "default" }, lodash_1["default"].get(row, column.field))); }))); }))))))))));
}
exports["default"] = BasicTable;
