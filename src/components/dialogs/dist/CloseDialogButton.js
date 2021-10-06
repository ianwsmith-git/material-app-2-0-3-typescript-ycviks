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
var CloseDialogButton = /** @class */ (function (_super) {
    __extends(CloseDialogButton, _super);
    function CloseDialogButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { open: false, buttonText: "Cancel" };
        _this.handleOKClose = function () {
            _this.setState({ open: false });
            _this.props.closeDialogHandler();
        };
        _this.handleCancelClose = function () {
            _this.setState({ open: false });
        };
        _this.handleClick = function () {
            if (_this.props.prompt) {
                _this.setState({ open: true });
            }
            else {
                _this.props.closeDialogHandler();
            }
        };
        return _this;
    }
    CloseDialogButton.prototype.render = function () {
        var classes = this.props.classes;
        return (react_1["default"].createElement("div", null,
            this.props.hidden === false ?
                react_1["default"].createElement(Button_1["default"], { variant: "outlined", color: "primary", onClick: this.handleClick }, this.props.buttonText)
                :
                    null,
            this.state.open === true ?
                react_1["default"].createElement(Dialog_1["default"], { open: this.state.open, "aria-labelledby": "form-dialog-title", maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true },
                    react_1["default"].createElement(DialogTitle_1["default"], { id: "form-dialog-title" },
                        react_1["default"].createElement(icons_1.Warning, { color: "error" }),
                        " Unsaved changes"),
                    react_1["default"].createElement(DialogContent_1["default"], { dividers: true, className: classes.root },
                        react_1["default"].createElement(DialogContentText_1["default"], null, "You have unsaved changes.  If you close this window those changes will be lost.  Click Cancel to go back and save your changes otherwise click OK to continue without saving.")),
                    react_1["default"].createElement(DialogActions_1["default"], null,
                        react_1["default"].createElement(Button_1["default"], { onClick: this.handleCancelClose, color: "primary" }, "Cancel"),
                        react_1["default"].createElement(Button_1["default"], { type: "submit", color: "primary", onClick: this.handleOKClose }, "OK")))
                :
                    null));
    };
    return CloseDialogButton;
}(react_1["default"].Component));
/* const VisitDialog = withStyles(moreStyles)(ContactBaseDialog);

VisitDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(moreStyles)(ContactBaseDialog)
 */
exports["default"] = core_1.withStyles(dialogStyle)(CloseDialogButton);
