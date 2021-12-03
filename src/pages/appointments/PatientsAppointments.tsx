import { Backdrop, CircularProgress, Collapse, IconButton, makeStyles, Theme } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { ImmutableTree } from 'react-awesome-query-builder';
import { Utils as QbUtils } from "react-awesome-query-builder/lib";
import { useHistory } from 'react-router-dom';

import { DiaRegWebApiClient as Client, ListSearch, Paging, PersonPagedResponse, StringStringKeyValuePair, StringStringKeyValuePairListResponse } from '../../api/DiaRegApi';
import ListPage from '../../components/pages/ListPage';
import { Column } from '../../components/Tables/BasicTable';
import { DEFAULT_PAGESIZE } from '../../constants';
import { hideCommandBar } from '../../redux/reducers/commandBarReducer';
import store from '../../redux/store';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

function getDoctors(search: ListSearch): Promise<PersonPagedResponse> {
    return new Client().getDoctors(search);
}

function getDoctorsConfig(): Promise<StringStringKeyValuePairListResponse> {
    return new Client().getDoctorsGridConfiguration();
}


type PersonType = {
    [key: string]: string | number | Date
    id: number;
    firstName: string;
    lastName: string,
    phoneNumber1: string,
    phoneNumber2: Date,
}

export default function Doctors() {
    const [rows, setRows] = useState<PersonType[]>([]);
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
        history.push('/doctor/' + row.id);
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
                    await getDoctorsConfig().then((response: StringStringKeyValuePairListResponse) => {
                        const data = response.data!;

                        var columns = new Array<Column>();

                        data.forEach((column: StringStringKeyValuePair) => {
                            columns.push({ header: column.value!, field: column.key! });
                        });

                        setColumns(columns);
                        setColumnsLoaded(true);
                    });
                }



                await getDoctors(search).then((response: PersonPagedResponse) => {

                    if (response.status === "success") {
                        const newRows = response.data?.map((person) => {
                            return person as unknown as PersonType;
                        }) as Array<PersonType>;

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
                }).catch((error) => {
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
            <ListPage title="Patient Appointments" data={rows} columns={columns} allowDelete={false} allowEdit={true} rowCount={rowCount} allowPaging={true} pagingHandler={handlePageChange} filterHander={handleFilter} onView={handleView} />

        </React.Fragment>
    );
}