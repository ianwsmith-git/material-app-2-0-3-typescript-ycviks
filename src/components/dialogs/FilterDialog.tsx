import { makeStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilterListIcon from '@material-ui/icons/FilterList';
import throttle from 'lodash/throttle';
import React from 'react';
import { Config, ImmutableTree, LocaleSettings, Utils as QBUtils, Settings } from 'react-awesome-query-builder';
import { JsonTree, Utils as QbUtils } from 'react-awesome-query-builder/lib';
import MaterialConfig from 'react-awesome-query-builder/lib/config/material';

import QueryBuilder from '../querybuilder/QueryBuilder';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper,
        maxHeight: 480,
    },
    button: {
        margin: theme.spacing(1),
    },

}));
// Choose your skin (ant/material/vanilla):
const InitialConfig = MaterialConfig; // or AntdConfig or BasicConfig
InitialConfig.settings.showNot = false;
InitialConfig.operators.equal.label = "Equal";
InitialConfig.settings.showErrorMessage = true;

/* const conjunctions: Conjunctions = {
    ...InitialConfig.conjunctions,
  };
 */

const localeSettings: LocaleSettings = {
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
        okType: "danger",
    },
    removeGroupConfirmOptions: {
        title: "Are you sure delete this group?",
        okText: "Yes",
        okType: "danger",
    },
};

const settings: Settings = {
    ...InitialConfig.settings,
    ...localeSettings,

    valueSourcesInfo: {
        value: {
            label: "Value"
        },
        field: {
            label: "Field",
            widget: "field",
        },
        func: {
            label: "Function",
            widget: "func",
        }
    },
    // canReorder: true,
    // canRegroup: true,
    // showNot: true,
    // showLabels: true,
    maxNesting: 5,
    canLeaveEmptyGroup: true,
    showErrorMessage: true,
    // renderField: (props) => <FieldCascader {...props} />,
    // renderOperator: (props) => <FieldDropdown {...props} />,
    // renderFunc: (props) => <FieldSelect {...props} />,
    // maxNumberOfRules: 10 // number of rules can be added to the query builder
};


const config: Config = {
    ...InitialConfig,
    settings,
    fields: {
        firstName: {
            label: "First Name",
            type: "text",
            valueSources: ["value"],
            preferWidgets: ["text"],
            operators: ["equal", "not_equal"],
            fieldSettings: {
                validateValue: (val: string, _fieldSettings) => {
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
    }
};

const emptyInitValue: JsonTree = { id: QBUtils.uuid(), type: "group" };
var immutableTree = QBUtils.loadTree(emptyInitValue);

type FilterDialogPropTypes =
    {
        title: string | "Filter Results";
        filterHander: (tree: any) => any;
    };

export default function FilterDialog(props: FilterDialogPropTypes) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [filter, setFilter] = React.useState({
        tree: immutableTree,
        config: config
    });


    const classes = useStyles();



    function handleCancelClose() {
        setOpenDialog(false);
    };

    function handleFilter() {


        var tree = QBUtils.checkTree(filter.tree, config);
        var logic = QBUtils.jsonLogicFormat(tree, config)
        const jsonTree = QBUtils.getTree(tree);
        console.log(logic);
        console.log(jsonTree);

        if (QBUtils.isValidTree(tree)) {
            setOpenDialog(false);
            props.filterHander(QBUtils.getTree(filter.tree));
        }
    };



    function handleFilterChanged(tree: ImmutableTree) {
        tree = QbUtils.checkTree(tree, config);
        immutableTree = tree;

        updateResult();
    }

    const updateResult = throttle(() => {
        setFilter({ tree: immutableTree, config: config });
    }, 100)

    function handleOpenDialog() {
        setOpenDialog(true);
    }



    return (
        <div>

            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<FilterListIcon />}
                onClick={() => {
                    handleOpenDialog();
                }}
            >
                Filter
            </Button>

            <Dialog open={openDialog} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                disableEscapeKeyDown fullWidth={true} >
                <DialogTitle id="form-dialog-title"><FilterListIcon />   <Typography variant="h3" gutterBottom display="inline" color="textPrimary">
                    Filter
                </Typography> </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <Typography variant="h4" gutterBottom display="inline" color="textPrimary">
                            User the filter options below to filter your list.
                        </Typography>
                    </DialogContentText>
                    <QueryBuilder onFilterChange={handleFilterChanged} config={filter.config} tree={filter.tree} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleCancelClose} variant="outlined">
                        Cancel
                    </Button>

                    <Button type="submit" color="primary" onClick={handleFilter} variant="outlined" >
                        Filter
                    </Button>

                </DialogActions>
            </Dialog >


        </div>
    );

}
