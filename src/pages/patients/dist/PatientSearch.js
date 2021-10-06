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
var system_1 = require("@material-ui/system");
var react_1 = require("react");
var react_feather_1 = require("react-feather");
var macro_1 = require("styled-components/macro");
var TextField = macro_1["default"](core_1.TextField)(system_1.spacing);
var Button = macro_1["default"](core_1.Button)(system_1.spacing);
var PatientSearch = /** @class */ (function (_super) {
    __extends(PatientSearch, _super);
    function PatientSearch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { lastName: "", firstName: "" };
        _this.handleSearch = function () {
            if (!_this.props.onSearch) {
                return;
            }
            else {
                _this.props.onSearch(_this.state.lastName, _this.state.firstName);
            }
        };
        return _this;
    }
    PatientSearch.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(core_1.Grid, { justify: "space-between", container: true, spacing: 6 },
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(TextField, { name: "lastName", label: "Last Name", fullWidth: true, variant: "outlined", size: "small", 
                    // eslint-disable-next-line react/no-direct-mutation-state
                    onChange: function (e) { return _this.state.lastName = e.target.value; } })),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(TextField, { name: "firstName", label: "First Name", fullWidth: true, variant: "outlined", size: "small", 
                    // eslint-disable-next-line react/no-direct-mutation-state
                    onChange: function (e) { return _this.state.firstName = e.target.value; } })),
            react_1["default"].createElement(core_1.Grid, { item: true },
                react_1["default"].createElement(core_1.Tooltip, { title: "Search for Patient" },
                    react_1["default"].createElement(Button, { variant: "contained", color: "primary", startIcon: react_1["default"].createElement(react_feather_1.Search, null), onClick: this.handleSearch }, "Search")))));
    };
    return PatientSearch;
}(react_1.Component));
exports["default"] = PatientSearch;
