import {
    Button as MuiButton,
    Collapse,
    createStyles,
    Divider as MuiDivider,
    Grid,
    IconButton,
    StyledComponentProps,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { Alert as MuiAlert } from '@material-ui/lab';
import { spacing, SpacingProps } from '@material-ui/system';
import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { DiaRegWebApiClient as Client, VisitPagedResponse } from '../../../api/DiaRegApi';
import BasicTable, { Column } from '../../../components/Tables/BasicTable';
import { VisitEditor } from './Visit';

const Alert = styled(MuiAlert)(spacing);
const Divider = styled(MuiDivider)(spacing);

interface ButtonPropstype extends SpacingProps {
    component?: string;
}
const Button = styled(MuiButton)<ButtonPropstype>(spacing);

const styles = createStyles({
    root: {
        flexGrow: 1,
    },
});

type VisitType = {
    [key: string]: string | number | Date
    id: number;
    date: string;
    type: string;
}

function getVisits(id: number): Promise<VisitPagedResponse> {
    return new Promise<VisitPagedResponse>((resolve) => {
        new Client().getVisits(id).then((value) => {


            resolve(value);


        });
    });
}

type VisitsTablePropsType = {
    patientId: number;
    parentAlertHandler: Function;
};

function VisitsTable(props: VisitsTablePropsType & StyledComponentProps) {
    const [rows, setRows] = React.useState<VisitType[]>([]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState("success");
    const [alertMessage, setAlertMessage] = React.useState("success");
    const [count, setCount] = useState<number>(0);
    const [selectedVisitId, setSelectedVisitId] = useState<number>(0);
    const [showEditor, setShowEditor] = useState<boolean>(false);

    const { classes } = props;

    function showAlert(alertSeverity: any, alertMessage: string) {
        setOpenAlert(true);
        setAlertSeverity(alertSeverity);
        setAlertMessage(alertMessage);
    }

    function onDataChange(dataChanged: boolean) {
        if (dataChanged) {

            setCount(count => count + 1);
        }

        setShowEditor(false);

    }


    function viewRecord(index: number) {
        var selectedRow = rows[index];
        setShowEditor(true);
        setSelectedVisitId(selectedRow.id);
    }

    function buildColumns(): Array<Column> {

        var columns = new Array<Column>();
        columns.push({ header: "Type of Visit", field: "type" });
        columns.push({ header: "Date of Visit", field: "date" });
        return columns;

    }

    React.useEffect(() => {
        let active = true;

        (async () => {


            try {
                var response = await getVisits(props.patientId);

                if (response.status == "success") {
                    const newRows = response.data?.map((visit) => {
                        return {
                            id: visit.id,
                            date: (new Date(moment.utc(visit.visitDate!).format("MM/DD/YYYY"))).toLocaleDateString(),
                            type: visit.visitType?.name
                        };
                    }) as Array<VisitType>;


                    if (!active) {
                        return;
                    }

                    setRows(newRows);
                }
                else {
                    showAlert("error", response.message!);
                }

            } catch (error: any) {
                showAlert("error", error.message);
            }

        })();

        return () => {
            active = false;
        };
    }, [count, props.patientId]);


    return (



        <React.Fragment>
            <Grid justify="space-between" container spacing={10}>
                <Grid item>
                    <Typography variant="h6" gutterBottom display="inline">
                        Visits
                    </Typography>
                </Grid>
                <Grid item>
                    <div>
                        <Button variant="contained" color="primary" onClick={() => { }}>
                            <AddIcon /> New Visit
                        </Button>
                    </div>
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
            <BasicTable columns={buildColumns()} data={rows} allowEdit={true} allowDelete={false} viewItemHandler={viewRecord} />

            {showEditor ?
                <VisitEditor open={showEditor} visitId={selectedVisitId} patientId={props.patientId} onClose={onDataChange} parentAlertHandler={() => { }} />
                :
                null
            }



        </React.Fragment>
    );
}

export default withStyles(styles)(VisitsTable)