"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var react_feather_1 = require("react-feather");
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = require("styled-components");
var Popover = styled_components_1["default"](core_1.Popover)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .MuiPaper-root {\n    width: 300px;\n    ", ";\n    border: 1px solid ", ";\n  }\n"], ["\n  .MuiPaper-root {\n    width: 300px;\n    ", ";\n    border: 1px solid ", ";\n  }\n"])), function (props) { return props.theme.shadows[1]; }, function (props) { return props.theme.palette.divider; });
var Indicator = styled_components_1["default"](core_1.Badge)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  .MuiBadge-badge {\n    background: ", ";\n    color: ", ";\n  }\n"], ["\n  .MuiBadge-badge {\n    background: ", ";\n    color: ", ";\n  }\n"])), function (props) { return props.theme.header.indicator.background; }, function (props) { return props.theme.palette.common.white; });
var Avatar = styled_components_1["default"](core_1.Avatar)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: ", ";\n"], ["\n  background: ", ";\n"])), function (props) { return props.theme.palette.primary.main; });
var NotificationHeader = styled_components_1["default"](core_1.Box)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-align: center;\n  border-bottom: 1px solid ", ";\n"], ["\n  text-align: center;\n  border-bottom: 1px solid ", ";\n"])), function (props) { return props.theme.palette.divider; });
function Notification(_a) {
    var title = _a.title, description = _a.description, Icon = _a.Icon;
    return (react_1["default"].createElement(core_1.ListItem, { divider: true, component: react_router_dom_1.Link, to: "#" },
        react_1["default"].createElement(core_1.ListItemAvatar, null,
            react_1["default"].createElement(Avatar, null,
                react_1["default"].createElement(core_1.SvgIcon, { fontSize: "small" },
                    react_1["default"].createElement(Icon, null)))),
        react_1["default"].createElement(core_1.ListItemText, { primary: title, primaryTypographyProps: {
                variant: "subtitle2",
                color: "textPrimary"
            }, secondary: description })));
}
function NotificationsDropdown() {
    var ref = react_1.useRef(null);
    var _a = react_1.useState(false), isOpen = _a[0], setOpen = _a[1];
    var handleOpen = function () {
        setOpen(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(core_1.Tooltip, { title: "Notifications" },
            react_1["default"].createElement(core_1.IconButton, { color: "inherit", ref: ref, onClick: handleOpen },
                react_1["default"].createElement(Indicator, { badgeContent: 7 },
                    react_1["default"].createElement(react_feather_1.Bell, null)))),
        react_1["default"].createElement(Popover, { anchorOrigin: {
                vertical: "bottom",
                horizontal: "center"
            }, anchorEl: ref.current, onClose: handleClose, open: isOpen },
            react_1["default"].createElement(NotificationHeader, { p: 2 },
                react_1["default"].createElement(core_1.Typography, { variant: "subtitle1", color: "textPrimary" }, "7 New Notifications")),
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(core_1.List, { disablePadding: true },
                    react_1["default"].createElement(Notification, { title: "Update complete", description: "Restart server to complete update.", Icon: react_feather_1.Server }),
                    react_1["default"].createElement(Notification, { title: "New connection", description: "Anna accepted your request.", Icon: react_feather_1.UserPlus }),
                    react_1["default"].createElement(Notification, { title: "Lorem ipsum", description: "Aliquam ex eros, imperdiet vulputate hendrerit et", Icon: react_feather_1.Bell }),
                    react_1["default"].createElement(Notification, { title: "New login", description: "Login from 192.186.1.1.", Icon: react_feather_1.Home })),
                react_1["default"].createElement(core_1.Box, { p: 1, display: "flex", justifyContent: "center" },
                    react_1["default"].createElement(core_1.Button, { size: "small", component: react_router_dom_1.Link, to: "#" }, "Show all notifications"))))));
}
exports["default"] = NotificationsDropdown;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
