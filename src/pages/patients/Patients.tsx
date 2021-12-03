import { Backdrop, CircularProgress, Collapse, IconButton, makeStyles } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import React, { Component, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom'

import {
    DiaRegWebApiClient as Client,
    ListSearch,
    PatientPagedResponse,
    StringStringKeyValuePair,
    StringStringKeyValuePairListResponse,
} from '../../api/DiaRegApi';
import ListPage from '../../components/pages/ListPage';
import { Column } from '../../components/Tables/BasicTable';
import { DEFAULT_PAGESIZE } from '../../constants';
import { hideCommandBar } from '../../redux/reducers/commandBarReducer';
import store from '../../redux/store';


type PatientType = {
    [key: string]: string | number | Date
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    emailAddress: string;
    city: string,
    region: string,
    middleName: string;
    address1: string;
    address2: string;
    title: string;
    suffix: string;
    cellPhone: string;
    homePhone: string;
    gender: string;
}



function getPatients(search: ListSearch): Promise<PatientPagedResponse> {
    return new Client().getPatients(search);
}

function getPatientsConfig(): Promise<StringStringKeyValuePairListResponse> {
    return new Client().getPatientGridConfiguration();
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));



function Patients() {
    const [rows, setRows] = useState<PatientType[]>([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = React.useState(true);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("success" as any);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(DEFAULT_PAGESIZE);
    const [filter, setFilter] = React.useState()
    const [columnsLoaded, setColumnsLoaded] = React.useState(false)
    const [columns, setColumns] = React.useState([] as Column[])

    const classes = useStyles();
    const history = useHistory();

    store.dispatch(hideCommandBar());


    function showAlert(alertSeverity: any, alertMessage: string) {
        setOpenAlert(true);
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
    }

    function hideAlert() {
        setOpenAlert(false);
    }

    function handlePageChange(pageIndex: number, pageSize: number) {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
        setRefresh(true);
    }

    function handleFilter(tree: any) {
        setFilter(tree);
        setRefresh(true);
    }

    function handleView(index: any) {
        var row = rows[index];
        history.push('/patient/' + row.id);
    }

    const isMounted = useRef(false);

    useEffect(() => {
        let active = true;

        if (refresh) {
            (async () => {

                var search = {
                    "criteria": JSON.stringify(filter),
                    "paging": {
                        "pageSize": pageSize,
                        "pageIndex": pageIndex
                    }
                } as ListSearch;


                if (!columnsLoaded) {
                    await getPatientsConfig().then((response: StringStringKeyValuePairListResponse) => {
                        const data = response.data!;

                        var columns = new Array<Column>();

                        data.forEach((column: StringStringKeyValuePair) => {
                            columns.push({ header: column.value!, field: column.key! });
                        });

                        setColumns(columns);
                        setColumnsLoaded(true);
                    });
                }



                await getPatients(search).then((response: PatientPagedResponse) => {

                    if (response.status === "success") {
                        const newRows: React.SetStateAction<PatientType[]> = [];
                        /*     = response.data?.map((patient) => {
                               return {
                                   id: patient.id,
                                   firstName: patient.firstName,
                                   lastName: patient.lastName,
                                   birthDate: patient.birthDate,
                                   emailAddress: patient.emailAddress,
                                   city: patient.location?.city?.name,
                                   region: patient.location?.region?.name,
                                   middleName: patient.middleName,
                                   address1: patient.address1,
                                   address2: patient.address2,
                                   title: patient.title,
                                   suffix: patient.suffix,
                                   cellPhone: patient.cellPhone,
                                   homePhone: patient.homePhone,
                                   gender: patient.gender?.name
   
                               };
                           }) as Array<PatientType>; */

                        if (!active) {
                            return;
                        }

                        setRows(newRows);
                        setRowCount(response.rowCount!);
                        hideAlert();
                    }
                    else {
                        showAlert("error", response.message!);
                    }

                    isMounted.current = true;
                }).catch((error: any) => {
                    showAlert("error", error.message);
                });

                setLoading(false);
                setRefresh(false);
            })();
        }
    }, [refresh, pageIndex, pageSize, filter, columnsLoaded]);

    return (

        <React.Fragment>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Collapse in={openAlert}>
                <Alert variant="filled" severity={alertSeverity}
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
            </Collapse>
            <ListPage title="Patients" data={rows} columns={columns} allowDelete={false} allowEdit={true} rowCount={rowCount} allowPaging={true} pagingHandler={handlePageChange} filterHander={handleFilter}
                onView={handleView} />

        </React.Fragment>
    );
}

export default Patients;

