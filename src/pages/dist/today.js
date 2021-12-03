"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_helmet_1 = require("react-helmet");
function Today() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_helmet_1.Helmet, { title: "Today" }),
        react_1["default"].createElement("label", null, "Today")));
}
exports["default"] = Today;
