import { Collapse, createStyles, Grid, IconButton, styled, StyledComponentProps, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Close as CloseIcon } from '@material-ui/icons';
import { Alert as MuiAlert } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import React, { useState } from 'react';

import { DiaRegWebApiClient as Client, Contact, ContactPagedResponse } from '../../../api/DiaRegApi';
import ContactDialog from './Contact';

const Alert = styled(MuiAlert)(spacing);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const styles = createStyles({
    root: {
        flexGrow: 1,
    },
});

function getContacts(id: number): Promise<ContactPagedResponse> {
    return new Promise<ContactPagedResponse>((resolve) => {
        new Client().getContacts(id).then((value) => {


            resolve(value);


        });
    });
}

type ContactsTablePropsType = {
    patientId: number;
    parentAlertHandler: Function;
};

function ContactsTable(props: ContactsTablePropsType & StyledComponentProps) {
    const [rows, setRows] = React.useState<Contact[]>([]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState("success");
    const [alertMessage, setAlertMessage] = React.useState("success");
    const [count, setCount] = useState<number>(0);

    const { classes } = props;

    function showAlert(alertSeverity: any, alertMessage: string) {
        setOpenAlert(true);
        setAlertSeverity(alertSeverity);
        setAlertMessage(alertMessage);
    }

    function onDataChange(dataChanged: boolean) {
        if (dataChanged) {
            
            setCount(count => count+1);
        }
    }

    React.useEffect(() => {
        let active = true;

        (async () => {


            var response = await getContacts(props.patientId);
            if (!active) {
                return;
            }

            setRows(response.data!);

        })();

        return () => {
            active = false;
        };
    }, [count, props.patientId]);



    return (



        <React.Fragment>
            <Grid justify="space-between" container>
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Contacts
                    </Typography>
                </Grid>
                <Grid item>

                    <ContactDialog contactId={0} patientId={props.patientId} parentAlertHandler={showAlert} onClose={onDataChange} />

                </Grid>
            </Grid>
            <Grid justify="space-between" container className={classes!.root!}>
                <Collapse in={openAlert} className={classes!.root!}>

                    <Alert variant="filled" severity={alertSeverity as any}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={(e) => {
                                    setOpenAlert(false);
                                    e.preventDefault();
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {alertMessage}
                    </Alert>

                </ Collapse>
            </Grid>
            <TableContainer component={Paper}>

                <Table className={classes!.table!} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">

                            </StyledTableCell>
                            <StyledTableCell align="left">Last Name</StyledTableCell>
                            <StyledTableCell align="left">First Name</StyledTableCell>
                            <StyledTableCell align="left">Home Phone</StyledTableCell>
                            <StyledTableCell align="left">Cell Phone</StyledTableCell>
                            <StyledTableCell>Type of Contact</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell align="left">
                                    <ContactDialog contactId={row.id!} patientId={props.patientId} parentAlertHandler={showAlert} onClose={onDataChange} />
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.lastName}</StyledTableCell>
                                <StyledTableCell align="left">{row.firstName}</StyledTableCell>
                                <StyledTableCell align="left">{row.homePhone}</StyledTableCell>
                                <StyledTableCell align="left">{row.cellPhone}</StyledTableCell>
                                <StyledTableCell align="left">{row.contactType?.name!}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

export default withStyles(styles)(ContactsTable)