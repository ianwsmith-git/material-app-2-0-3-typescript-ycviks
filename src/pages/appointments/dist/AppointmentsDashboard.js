"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var date_fns_1 = require("@date-io/date-fns");
var react_1 = require("@fullcalendar/react");
var daygrid_1 = require("@fullcalendar/daygrid");
var interaction_1 = require("@fullcalendar/interaction");
var core_1 = require("@material-ui/core");
var pickers_1 = require("@material-ui/pickers");
var system_1 = require("@material-ui/system");
var react_2 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var macro_1 = require("styled-components/macro");
var Calendar_style_1 = require("./Calendar.style");
var demo_events_json_1 = require("./demo-events.json");
var FullCalendarWrapper = macro_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), Calendar_style_1["default"]);
var Card = macro_1["default"](core_1.Card)(system_1.spacing);
var CardContent = macro_1["default"](core_1.CardContent)(system_1.spacing);
var Divider = macro_1["default"](core_1.Divider)(system_1.spacing);
var hiddenButtonProps = {
    style: { visibility: "hidden" }
};
function EmptyCard() {
    var _a = react_2.useState(new Date()), startDate = _a[0], changeStartDate = _a[1];
    var injectAddButton = function (args) {
        return (react_2["default"].createElement("div", null,
            react_2["default"].createElement("button", { onClick: function () { return addAppointment(args.date); } }, args.dayNumberText)));
    };
    var addAppointment = function (date) {
        alert("You clicked " + date);
    };
    var addMonths = function (months) {
        var newDate = new date_fns_1["default"]().startOfMonth(startDate);
        newDate.setMonth(startDate.getMonth() + months);
        newDate.setDate(startDate.getDate());
        return newDate;
    };
    var onMonthChanged = function (date) {
        startDate.setMonth(date.getMonth());
        changeStartDate(startDate);
    };
    return (react_2["default"].createElement(Card, { mb: 6 },
        react_2["default"].createElement(CardContent, { p: 6 },
            react_2["default"].createElement(core_1.Grid, { container: true, spacing: 2 },
                react_2["default"].createElement(core_1.Grid, { item: true, md: 2 },
                    react_2["default"].createElement(core_1.Button, { color: "primary", variant: "contained", onClick: function () { return changeStartDate(new Date()); } }, "Today"),
                    react_2["default"].createElement(pickers_1.Calendar, { date: startDate, onChange: function (newDate) { return changeStartDate(newDate); }, disablePast: true, minDate: new Date(), onMonthChange: function (newDate) { return onMonthChanged(newDate); } }),
                    react_2["default"].createElement(Divider, null),
                    react_2["default"].createElement(pickers_1.Calendar, { date: addMonths(1), onChange: function (newDate) { }, leftArrowButtonProps: hiddenButtonProps, rightArrowButtonProps: hiddenButtonProps, disablePast: true }),
                    react_2["default"].createElement(Divider, null),
                    react_2["default"].createElement(pickers_1.Calendar, { date: addMonths(2), onChange: function (newDate) { }, leftArrowButtonProps: hiddenButtonProps, rightArrowButtonProps: hiddenButtonProps, disablePast: true }),
                    react_2["default"].createElement(Divider, null)),
                react_2["default"].createElement(core_1.Grid, { item: true, md: 10 },
                    react_2["default"].createElement(FullCalendarWrapper, null,
                        react_2["default"].createElement(react_1["default"], { initialView: "dayGridMonth", initialDate: startDate, plugins: [daygrid_1["default"], interaction_1["default"]], events: demo_events_json_1["default"], editable: true, selectable: true, dayCellContent: injectAddButton, headerToolbar: {
                                left: "",
                                center: "title",
                                right: "dayGridDay,dayGridWeek,dayGridMonth"
                            } })))))));
}
function AppointmentsCalendar() {
    return (react_2["default"].createElement(react_2["default"].Fragment, null,
        react_2["default"].createElement(react_helmet_async_1.Helmet, { title: "Schedule Appointments" }),
        react_2["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline" }, "Schedule Appointments"),
        react_2["default"].createElement(Divider, { my: 6 }),
        react_2["default"].createElement(core_1.Grid, { container: true, spacing: 6 },
            react_2["default"].createElement(core_1.Grid, { item: true, xs: 12 },
                react_2["default"].createElement(EmptyCard, null)))));
}
exports["default"] = AppointmentsCalendar;
var templateObject_1;
