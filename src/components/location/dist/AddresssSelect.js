"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var useStyles = core_1.makeStyles(function (theme) {
    return ({
        root: {
            flexGrow: 1
        }
    });
});
function PopupListSelect(props) {
    //#region Dialog State
    var _a = react_1["default"].useState(props.show), show = _a[0], setShow = _a[1];
    //#endregion Dialog state
    function handleSelect() {
    }
    function handleClose() {
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Dialog, { open: props.show, "aria-labelledby": "form-dialog-title", maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true, fullWidth: true },
            react_1["default"].createElement(core_1.DialogTitle, { id: "form-dialog-title" },
                "  ",
                react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline", color: "textPrimary" }, props.title),
                " "),
            react_1["default"].createElement(core_1.DialogContent, { dividers: true },
                react_1["default"].createElement(core_1.DialogContentText, null,
                    react_1["default"].createElement(core_1.Typography, { variant: "h4", gutterBottom: true, display: "inline", color: "textPrimary" }, props.instructions))),
            react_1["default"].createElement(core_1.DialogActions, null,
                react_1["default"].createElement(core_1.Button, { color: "primary", onClick: handleClose, variant: "outlined" }, "Cancel"),
                react_1["default"].createElement(core_1.Button, { type: "submit", color: "primary", onClick: handleSelect, variant: "outlined" }, "Select")))));
}
exports["default"] = PopupListSelect;
