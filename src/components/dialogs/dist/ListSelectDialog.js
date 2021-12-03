"use strict";
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var BasicTable_1 = require("../Tables/BasicTable");
function ListSelectDialog(props) {
    var _a = react_1["default"].useState(new Array()), selections = _a[0], setSelections = _a[1];
    function handleSelect() {
        props.onSelect(selections);
    }
    function onSelectionChange(selected) {
        setSelections(selected);
    }
    function handleClose() {
        props.onCancel();
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Dialog, { open: props.show, "aria-labelledby": "form-dialog-title", maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true, fullWidth: true },
            react_1["default"].createElement(core_1.DialogTitle, { id: "form-dialog-title" },
                "  ",
                react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline", color: "textPrimary" }, props.title),
                " "),
            react_1["default"].createElement(core_1.DialogContent, { dividers: true },
                react_1["default"].createElement(core_1.DialogContentText, null,
                    react_1["default"].createElement(core_1.Typography, { variant: "h4", gutterBottom: true, display: "inline", color: "textPrimary" }, props.instructions)),
                react_1["default"].createElement(BasicTable_1["default"], { columns: props.columns, data: props.data, allowEdit: false, allowDelete: false, allowSelect: true, onView: handleSelect, onSelectionChange: onSelectionChange })),
            react_1["default"].createElement(core_1.DialogActions, null,
                react_1["default"].createElement(core_1.Button, { color: "primary", onClick: handleClose, variant: "outlined" }, "Cancel"),
                react_1["default"].createElement(core_1.Button, { type: "submit", color: "primary", onClick: handleSelect, variant: "outlined", disabled: selections.length == 0 }, "Select")))));
}
exports["default"] = ListSelectDialog;
