"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var Button_1 = require("@material-ui/core/Button");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var styles_1 = require("@material-ui/core/styles");
var Typography_1 = require("@material-ui/core/Typography");
var react_1 = require("react");
var dialogStyle = function (theme) { return styles_1.createStyles({
    root: {
        maxWidth: 'lg',
        backgroundColor: theme.palette.background.paper
    }
}); };
function NotificationDialog(props) {
    var onClose = props.onClose, open = props.open;
    var handleClose = function () {
        onClose();
    };
    var classes = props.classes;
    return (react_1["default"].createElement(Dialog_1["default"], { onClose: handleClose, "aria-labelledby": "Notification-dialog-title", open: open, maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true },
        react_1["default"].createElement(DialogTitle_1["default"], { id: "Notification-dialog-title" }, props.title),
        react_1["default"].createElement(core_1.DialogContent, { dividers: true, className: classes.root },
            react_1["default"].createElement(core_1.DialogContentText, null,
                react_1["default"].createElement(Typography_1["default"], { variant: "subtitle1" }, props.message))),
        react_1["default"].createElement(core_1.DialogActions, null,
            react_1["default"].createElement(Button_1["default"], { onClick: handleClose, color: "primary" }, "Ok"))));
}
exports["default"] = styles_1.withStyles(dialogStyle)(NotificationDialog);
