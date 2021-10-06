import { Button, CardContent, Card as MuiCard, styled, StyledComponentProps, TableCell, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { fontWeight, spacing } from '@material-ui/system';
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
    //HeadCells: HeadCell[];
    columns: Column[];
    data: Array<any>;
    allowEdit: boolean | false;
    allowDelete: boolean | false;
    viewItemHandler: (index: any) => any;
    deleteHandler?: (index: any) => any;

};

function BasicTable(props: BasicTablePropTypes) {

    function handleView(index: any) {
        props.viewItemHandler(index);
    }

    function handleDelete(index: number) {
        props.deleteHandler!(index);
    }

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

                                                <StyledTableRow key={index}>

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
        </React.Fragment>
    );
}

export default BasicTable