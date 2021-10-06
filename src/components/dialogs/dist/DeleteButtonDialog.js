"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var Button_1 = require("@material-ui/core/Button");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var icons_1 = require("@material-ui/icons");
var react_1 = require("react");
var dialogStyle = function (theme) { return core_1.createStyles({
    root: {
        maxWidth: 'lg',
        backgroundColor: theme.palette.background.paper
    }
}); };
var DeleteDialogButton = /** @class */ (function (_super) {
    __extends(DeleteDialogButton, _super);
    function DeleteDialogButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { open: false, buttonText: "Cancel" };
        _this.handleOKDelete = function () {
            _this.props.deleteDialogHandler();
            _this.setState({ open: false });
        };
        _this.handleCancelDelete = function () {
            _this.setState({ open: false });
        };
        _this.handleClick = function () {
            if (_this.props.prompt) {
                _this.setState({ open: true });
            }
            else {
                _this.props.deleteDialogHandler();
            }
        };
        return _this;
    }
    DeleteDialogButton.prototype.render = function () {
        var classes = this.props.classes;
        return (react_1["default"].createElement("div", null,
            this.props.hidden === false ?
                react_1["default"].createElement(Button_1["default"], { variant: "contained", color: "secondary", onClick: this.handleClick }, this.props.buttonText)
                :
                    null,
            this.state.open === true ?
                react_1["default"].createElement(Dialog_1["default"], { open: this.state.open, "aria-labelledby": "form-dialog-title", maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true },
                    react_1["default"].createElement(DialogTitle_1["default"], { id: "form-dialog-title" },
                        react_1["default"].createElement(icons_1.Warning, { color: "error" }),
                        this.props.title),
                    react_1["default"].createElement(DialogContent_1["default"], { dividers: true, className: classes.root },
                        react_1["default"].createElement(DialogContentText_1["default"], null, this.props.message)),
                    react_1["default"].createElement(DialogActions_1["default"], null,
                        react_1["default"].createElement(Button_1["default"], { onClick: this.handleCancelDelete, color: "primary" }, "Cancel"),
                        react_1["default"].createElement(Button_1["default"], { type: "submit", color: "primary", onClick: this.handleOKDelete }, "OK")))
                :
                    null));
    };
    return DeleteDialogButton;
}(react_1["default"].Component));
exports["default"] = core_1.withStyles(dialogStyle)(DeleteDialogButton);
