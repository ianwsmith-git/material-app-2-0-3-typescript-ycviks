import { Button, Collapse, createStyles, Grid, IconButton, styled, StyledComponentProps, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons';
import { Alert as MuiAlert } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { ReactSurveyModel } from 'survey-react';

import { DiaRegWebApiClient as Client, PatientSurveyPagedResponse, Response, StringResponse } from '../../../api/DiaRegApi';
import SurveyDialog from '../../../components/surveys/SurveyDialog';
import { hideAlert as hideAlertDispatch, showAlert as showAlertDispach } from '../../../redux/reducers/alertReducer';
import store from '../../../redux/store';
import { StyledTableCell, StyledTableRow } from './../../../theme/tables';

const Alert = styled(MuiAlert)(spacing);




const styles = createStyles({
    root: {
        flexGrow: 1,
    }
});

type PatientSurveyType = {
    [key: string]: string | number | Date
    id: number;
    status: string;
    name: string,
    dateAssigned: Date,
    dateCompleted: Date,
    completedBy: string
}

function getSurveys(id: number): Promise<PatientSurveyPagedResponse> {
    return new Client().getPatientSurveys(id)
}

function getPatientSurvey(id: number): Promise<StringResponse> {
    return new Client().getPatientSurvey(id)
}

function saveSurveyData(id: number, answers: any): Promise<Response> {
    return new Client().updatePatientSurvey(id, answers);
}

function completeSurveyData(id: number): Promise<Response> {
    return new Client().completePatientSurvey(id);
}

type SurveysTablePropsType = {
    patientId: number;
    parentAlertHandler: Function;
};

function SurveysTable(props: SurveysTablePropsType & StyledComponentProps) {
    const [rows, setRows] = React.useState<PatientSurveyType[]>([]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState("success");
    const [alertMessage, setAlertMessage] = React.useState("success");
    const [refresh, setRefresh] = useState(true);
    const [openSurvey, setOpenSurvey] = React.useState(false);
    const [surveyModel, setSurveyModel] = React.useState({});
    const [surveyData, setSurveyData] = React.useState({});
    const [surveyId, setSurveyId] = useState<number>(0);
    const [saveSurvey, setSaveSurvey] = useState(false);
    const [completeSurvey, setCompleteSurvey] = useState(false);

    const { classes } = props;


    function showSurvey(id: number) {
        setSurveyId(id);
    }

    function hideSurveyAlert() {
        store.dispatch(hideAlertDispatch());
    }

    function onSave(data: any) {
        hideSurveyAlert();
        setSaveSurvey(true);
        setSurveyData(data);
        setRefresh(true);
    }

    function onCloseSurvey() {
        setSurveyId(0);
        setOpenSurvey(false);
    }

    function onCompleteSurvey(data : any) {
        setCompleteSurvey(true);
        onSave(data);
    }

    function showAlert(alertSeverity: any, alertMessage: string) {
        setOpenAlert(true);
        setAlertSeverity(alertSeverity);
        setAlertMessage(alertMessage);
    }

    const isMounted = useRef(false);

    useEffect(() => {
        let active = true;

        (async () => {


            await getSurveys(props.patientId).then((response: PatientSurveyPagedResponse) => {
                const newRows = response.data?.map((patientSurvey) => {
                    return {
                        id: patientSurvey.patientSurveyId,
                        name: patientSurvey.surveyName,
                        dateAssigned: new Date(moment.utc(patientSurvey.dateAssigned).format("MM/DD/YYYY")),
                        dateCompleted: new Date(moment.utc(patientSurvey.completedDate).format("MM/DD/YYYY")),
                        completedBy: patientSurvey.completedBy,
                        status: patientSurvey.status.name
                    }
                }) as Array<PatientSurveyType>;

                if (!active) {
                    return;
                }

                setRows(newRows);
                setRefresh(false);
                isMounted.current = true;
            })
        })();
    }, [refresh, props.patientId]);


    useEffect(() => {

        if (!isMounted) {
            return;
        }


        if (surveyId === 0) {
            return;
        }

        (async () => {


            try {

                store.dispatch(hideAlertDispatch());

                var response = await getPatientSurvey(surveyId);

                if (response.status === "success") {
                    var survey = JSON.parse(response.data!).survey;
                    setSurveyModel(survey);
                    setSurveyData(survey.data)
                    setOpenSurvey(true);
                }
                else {
                    showAlert(response.status!, response.message!);
                }
            }
            catch (error: any) {
                showAlert("error", error.toString());
            }

        })();

    }, [surveyId]);


    useEffect(() => {

        if (!isMounted) {
            return;
        }

        if (!saveSurvey) {
            return;
        }

        (async () => {


            try {
                var response = await saveSurveyData(surveyId, JSON.stringify(surveyData));

                if (completeSurvey) {
                    response = await completeSurveyData(surveyId);
                    setOpenSurvey(false);
                    setRefresh(true);
                }
                store.dispatch(showAlertDispach(response.status!, response.message!));
            }
            catch (error: any) {
                store.dispatch(showAlertDispach("error", error.toString()));
            }

            setSaveSurvey(false);

        })();

    }, [surveyData, surveyId, saveSurvey, completeSurvey]);

    return (



        <React.Fragment>
            <Grid justify="space-between" container>
                <Grid item>
                    <Typography variant="h3" gutterBottom display="inline">
                        Surveys
                    </Typography>
                </Grid>
                <Grid item>

                    <Button variant="outlined" color="primary" onClick={() => { showSurvey(0) }}  >
                        New Survey
                    </Button>

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

                <Table className={classes!.table!} size="small" aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell padding="checkbox">

                            </StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Date Assigned</StyledTableCell>
                            <StyledTableCell align="left">Status</StyledTableCell>
                            <StyledTableCell align="left">Completed By</StyledTableCell>
                            <StyledTableCell align="left">Date Completed</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: PatientSurveyType) => (
                            <StyledTableRow key={row.id} >
                                <StyledTableCell align="left" padding="checkbox">
                                    <IconButton aria-label="edit" onClick={() => { showSurvey(row.id) }} >
                                        <EditIcon />
                                    </IconButton></StyledTableCell>
                                <StyledTableCell align="left" scope="row" padding="none">{row.name}</StyledTableCell>
                                <StyledTableCell align="left">{row.dateAssigned.toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="left">{row.status}</StyledTableCell>
                                <StyledTableCell align="left">{row.completedBy}</StyledTableCell>
                                <StyledTableCell align="left">{moment(row.dateCompleted).isValid() ? row.dateCompleted.toLocaleDateString() : ""}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {openSurvey ?
                <SurveyDialog show={openSurvey} onClose={onCloseSurvey} onSave={onSave} surveyModel={surveyModel as ReactSurveyModel} surveyData={surveyData} onComplete={onCompleteSurvey} />
                :
                null
            }
        </React.Fragment>
    );
}

export default withStyles(styles)(SurveysTable)