"use strict";
exports.__esModule = true;
exports.StyledTableRow = exports.StyledTableCell = exports.StyledTable = void 0;
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/styles");
exports.StyledTable = styles_1.withStyles(function (theme) { return ({}); })(core_1.Table);
exports.StyledTableCell = styles_1.withStyles(function (theme) { return ({
    head: {
        backgroundColor: theme.palette.grey[300],
        color: theme.palette.common.black,
        fontWeight: 600
    },
    body: {
        fontSize: 14
    }
}); })(core_1.TableCell);
exports.StyledTableRow = styles_1.withStyles(function (theme) { return ({
    root: {
        padding: "none",
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}); })(core_1.TableRow);
