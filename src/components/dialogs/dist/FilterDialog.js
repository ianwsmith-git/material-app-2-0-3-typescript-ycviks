"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var core_1 = require("@material-ui/core");
var Button_1 = require("@material-ui/core/Button");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var FilterList_1 = require("@material-ui/icons/FilterList");
var throttle_1 = require("lodash/throttle");
var react_1 = require("react");
var react_awesome_query_builder_1 = require("react-awesome-query-builder");
var lib_1 = require("react-awesome-query-builder/lib");
var material_1 = require("react-awesome-query-builder/lib/config/material");
var QueryBuilder_1 = require("../querybuilder/QueryBuilder");
var useStyles = core_1.makeStyles(function (theme) { return ({
    root: {
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper,
        maxHeight: 480
    },
    button: {
        margin: theme.spacing(1)
    }
}); });
// Choose your skin (ant/material/vanilla):
var InitialConfig = material_1["default"]; // or AntdConfig or BasicConfig
InitialConfig.settings.showNot = false;
InitialConfig.operators.equal.label = "Equal";
InitialConfig.settings.showErrorMessage = true;
/* const conjunctions: Conjunctions = {
    ...InitialConfig.conjunctions,
  };
 */
var localeSettings = {
    valueLabel: "Value",
    valuePlaceholder: "Value",
    fieldLabel: "Field",
    operatorLabel: "Operator",
    funcLabel: "Function",
    fieldPlaceholder: "Select field",
    funcPlaceholder: "Select function",
    operatorPlaceholder: "Select operator",
    //deleteLabel: null,
    addGroupLabel: "Add group",
    addRuleLabel: "Add rule",
    addSubRuleLabel: "Add sub rule",
    //delGroupLabel: null,
    notLabel: "Not",
    valueSourcesPopupTitle: "Select value source",
    removeRuleConfirmOptions: {
        title: "Are you sure delete this rule?",
        okText: "Yes",
        okType: "danger"
    },
    removeGroupConfirmOptions: {
        title: "Are you sure delete this group?",
        okText: "Yes",
        okType: "danger"
    }
};
var settings = __assign(__assign(__assign({}, InitialConfig.settings), localeSettings), { valueSourcesInfo: {
        value: {
            label: "Value"
        },
        field: {
            label: "Field",
            widget: "field"
        },
        func: {
            label: "Function",
            widget: "func"
        }
    }, 
    // canReorder: true,
    // canRegroup: true,
    // showNot: true,
    // showLabels: true,
    maxNesting: 5, canLeaveEmptyGroup: true, showErrorMessage: true });
var config = __assign(__assign({}, InitialConfig), { settings: settings, fields: {
        firstName: {
            label: "First Name",
            type: "text",
            valueSources: ["value"],
            preferWidgets: ["text"],
            operators: ["equal", "not_equal"],
            fieldSettings: {
                validateValue: function (val, _fieldSettings) {
                    return (val === undefined ? "Invalid value" : null);
                }
            }
        },
        lastName: {
            label: "Last Name",
            type: "text",
            valueSources: ["value"],
            preferWidgets: ["text"],
            operators: ["equal", "not_equal"]
        }
    } });
var emptyInitValue = { id: react_awesome_query_builder_1.Utils.uuid(), type: "group" };
var immutableTree = react_awesome_query_builder_1.Utils.loadTree(emptyInitValue);
function FilterDialog(props) {
    var _a = react_1["default"].useState(false), openDialog = _a[0], setOpenDialog = _a[1];
    var _b = react_1["default"].useState({
        tree: immutableTree,
        config: config
    }), filter = _b[0], setFilter = _b[1];
    var classes = useStyles();
    function handleCancelClose() {
        setOpenDialog(false);
    }
    ;
    function handleFilter() {
        var tree = react_awesome_query_builder_1.Utils.checkTree(filter.tree, config);
        var logic = react_awesome_query_builder_1.Utils.jsonLogicFormat(tree, config);
        var jsonTree = react_awesome_query_builder_1.Utils.getTree(tree);
        console.log(logic);
        console.log(jsonTree);
        if (react_awesome_query_builder_1.Utils.isValidTree(tree)) {
            setOpenDialog(false);
            props.filterHander(react_awesome_query_builder_1.Utils.getTree(filter.tree));
        }
    }
    ;
    function handleFilterChanged(tree) {
        tree = lib_1.Utils.checkTree(tree, config);
        immutableTree = tree;
        updateResult();
    }
    var updateResult = throttle_1["default"](function () {
        setFilter({ tree: immutableTree, config: config });
    }, 100);
    function handleOpenDialog() {
        setOpenDialog(true);
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(Button_1["default"], { variant: "contained", color: "default", className: classes.button, startIcon: react_1["default"].createElement(FilterList_1["default"], null), onClick: function () {
                handleOpenDialog();
            } }, "Filter"),
        react_1["default"].createElement(Dialog_1["default"], { open: openDialog, "aria-labelledby": "form-dialog-title", maxWidth: "lg", disableBackdropClick: true, disableEscapeKeyDown: true, fullWidth: true },
            react_1["default"].createElement(DialogTitle_1["default"], { id: "form-dialog-title" },
                react_1["default"].createElement(FilterList_1["default"], null),
                "   ",
                react_1["default"].createElement(core_1.Typography, { variant: "h3", gutterBottom: true, display: "inline", color: "textPrimary" }, "Filter"),
                " "),
            react_1["default"].createElement(DialogContent_1["default"], { dividers: true },
                react_1["default"].createElement(DialogContentText_1["default"], null,
                    react_1["default"].createElement(core_1.Typography, { variant: "h4", gutterBottom: true, display: "inline", color: "textPrimary" }, "User the filter options below to filter your list.")),
                react_1["default"].createElement(QueryBuilder_1["default"], { onFilterChange: handleFilterChanged, config: filter.config, tree: filter.tree })),
            react_1["default"].createElement(DialogActions_1["default"], null,
                react_1["default"].createElement(Button_1["default"], { color: "primary", onClick: handleCancelClose, variant: "outlined" }, "Cancel"),
                react_1["default"].createElement(Button_1["default"], { type: "submit", color: "primary", onClick: handleFilter, variant: "outlined" }, "Filter")))));
}
exports["default"] = FilterDialog;
