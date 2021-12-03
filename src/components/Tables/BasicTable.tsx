import { Button, CardContent, Checkbox, Card as MuiCard, styled } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { spacing } from '@material-ui/system';
import _ from 'lodash';
import React from 'react';

import { StyledTableCell, StyledTableRow } from '../../theme/tables';
import DeleteRecordButton from '../DeleteRecordButton';

const Card = styled(MuiCard)(spacing);

const useStyles = makeStyles((theme: Theme) =>
({
    root: {
        width: '100%',
        paddingLeft: '0px',
        paddingRight: '0px'
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        width: '100%',
    },
    container: {
        maxHeight: 800,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}),
);

export type Column = {
    header: string;
    field: string;
}


type BasicTablePropTypes = {
    columns: Column[];
    data: Array<any>;
    allowEdit: boolean | false;
    allowDelete: boolean | false;
    allowSelect?: boolean | false;
    allowSelectAll?: boolean | false;
    allowMultiSelect?: boolean | false;
    onView: (index: any) => any;
    onDelete?: (index: any) => any;
    onSelectionChange?: (indexes: Array<number>) => any;
};

function BasicTable(props: BasicTablePropTypes) {

    //#region Control State
    const [selections, setSelections] = React.useState<Array<number>>([]);
    //#endregion Control State

    //#region Event Handlers
    function handleView(index: any) {
        props.onView(index);
    }

    function handleDelete(index: number) {
        props.onDelete!(index);
    }

    function handleSelectAll(event: any) {
        if (event.target.checked) {
            const newSelected = props.data.map((item: any, index: number) => index);
            setSelections(newSelected);
        }
        else {
            setSelections([]);
        }

        props.onSelectionChange!(selections);
    }

    function handleSelect(index: number) {

        let newSelected = new Array<number>();

        if (props.allowMultiSelect) {

            if (index === -1) {
                newSelected = newSelected.concat(selections, index);
            } else if (index === 0) {
                newSelected = newSelected.concat(selections.slice(1));
            } else if (index === selections.length - 1) {
                newSelected = newSelected.concat(selections.slice(0, -1));
            } else if (index > 0) {
                newSelected = newSelected.concat(
                    selections.slice(0, index),
                    selections.slice(index + 1),
                );
            }

            setSelections(newSelected);
        }
        else {
            newSelected.push(index);
            setSelections(newSelected);
        }

        props.onSelectionChange!(newSelected);
    }

    function isItemSelected(index: number): boolean {
        return selections.indexOf(index) !== -1;
    }
    //#endregion Event Hanlders

    const classes = useStyles();

    return (
        <React.Fragment>
            <div>
                <Paper className={classes.root}>
                    <Card>
                        <CardContent className={classes.root}>

                            <TableContainer component={Paper} className={classes.container}>

                                <Table stickyHeader aria-label="customized table" className={classes.table}  >
                                    <TableHead >
                                        <StyledTableRow key={-1}>
                                            {
                                                props.allowSelect ?
                                                    <StyledTableCell padding="checkbox">

                                                        {props.allowSelectAll ?
                                                            <Checkbox
                                                                color="primary"
                                                                indeterminate={selections.length > 0 && selections.length < props.data.length}
                                                                checked={props.data.length > 0 && selections.length === props.data.length}
                                                                onChange={handleSelectAll}
                                                                inputProps={{
                                                                    'aria-label': 'select all desserts',
                                                                }}
                                                            />
                                                            :
                                                            null
                                                        }
                                                    </StyledTableCell>
                                                    :
                                                    null
                                            }

                                            {
                                                props.allowEdit ?
                                                    <StyledTableCell padding="checkbox"></StyledTableCell>
                                                    :
                                                    null
                                            }

                                            {
                                                props.allowDelete ?
                                                    <StyledTableCell padding="checkbox"></StyledTableCell>
                                                    :
                                                    null
                                            }

                                            {
                                                props.columns.map((column) => (
                                                    <StyledTableCell align="left" padding="default">{column.header}</StyledTableCell>
                                                )
                                                )}
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody >
                                        {

                                            props.data.map((row, index) => (

                                                <StyledTableRow key={index}
                                                    hover
                                                    onClick={(event) => handleSelect(index)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected(index)}
                                                    tabIndex={-1}
                                                    selected={isItemSelected(index)}
                                                >

                                                    {
                                                        props.allowSelect ?
                                                            <StyledTableCell padding="checkbox">
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={isItemSelected(index)}
                                                                    inputProps={{
                                                                        'aria-labelledby': index.toString(),
                                                                    }}
                                                                />
                                                            </StyledTableCell>
                                                            :
                                                            null
                                                    }

                                                    {
                                                        props.allowEdit ?
                                                            <StyledTableCell padding="checkbox">
                                                                <Button variant="contained" color="primary" disableElevation onClick={() => { handleView(index) }}>View</Button>
                                                            </StyledTableCell>
                                                            :
                                                            null
                                                    }

                                                    {
                                                        props.allowDelete ?
                                                            <StyledTableCell padding="checkbox">
                                                                <DeleteRecordButton index={index} hidden={false} buttonText="Delete" prompt={true} deleteRecordHandler={(index: number) => { handleDelete(index) }} />
                                                            </StyledTableCell>
                                                            :
                                                            null
                                                    }

                                                    {props.columns.map((column) => (
                                                        <StyledTableCell align="left" padding="default">
                                                            {_.get(row, column.field)}
                                                        </StyledTableCell>
                                                    ))}
                                                </StyledTableRow>

                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </ CardContent>
                    </Card>
                </Paper>
            </div>
        </React.Fragment >
    );
}

export default BasicTable