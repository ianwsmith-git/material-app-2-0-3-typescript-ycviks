import {
    Card,
    CardContent,
    Divider as MuiDivider,
    Grid,
    makeStyles,
    Paper,
    TablePagination,
    Typography,
} from '@material-ui/core';
import { spacing } from '@material-ui/system';
import React from 'react';
import styled from 'styled-components/macro';

import { IListSearch, IPaging, ListSearch, Paging } from '../../api/DiaRegApi';
import BasicTable, { Column } from '../../components/Tables/BasicTable';
import FilterDialog from '../dialogs/FilterDialog';
import { DEFAULT_PAGESIZE } from './../../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

    },
    container: {
        maxHeight: 440,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Divider = styled(MuiDivider)(spacing);

type ListPagePropTypes = {
    title: string | "Page Name";
    data: Array<any>;
    columns: Column[];
    allowEdit: boolean | false;
    allowDelete: boolean | false;
    rowCount: number | 0;
    allowPaging: boolean | false;
    pagingHandler: (page: number, pageSize: number) => any;
    filterHander: (filter: any) => any;
    viewItemHandler: (id: any) => any;
};

const defaultSearch = new ListSearch({
    "criteria": null,
    "paging": new Paging({
        "pageSize": 10,
        "pageIndex": 1
    } as IPaging)
} as IListSearch);

export default function ListPage(props: ListPagePropTypes) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_PAGESIZE);
    const [searchParams, setSearchParams] = React.useState<ListSearch>(defaultSearch);

    function handleChangePage(
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) {

        setPage(newPage);
        props.pagingHandler(newPage, rowsPerPage);

    };

    function saveSearch(criteria: string | null, page: number, pageSize: number) {
        setSearchParams(new ListSearch({
            "criteria": criteria,
            "paging": new Paging({
                "pageSize": pageSize,
                "pageIndex": page
            } as IPaging)
        } as IListSearch));
    }

    function handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {

        var val = parseInt(event.target.value, 10);
        setRowsPerPage(val);
        setPage(0);
        props.pagingHandler(page, val);
    };

    return (
        <div>
            <Typography variant="h3" gutterBottom display="inline">
                {props.title}
            </Typography>
            <Divider my={2} />
            <Paper className={classes.root}>
                <Card>
                    <CardContent>
                        <Grid justify="space-between" container>
                            <Grid item>
                                <FilterDialog title="Filter Doctors" filterHander={props.filterHander} />
                            </Grid>
                            <Grid item>
                                {props.allowPaging ?
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={props.rowCount}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    /> :
                                    null
                                }
                            </Grid>
                        </Grid>

                        <BasicTable {...props} />
                        <Grid justify="space-between" container>
                            <Grid item>

                            </Grid>
                            <Grid item>
                                {props.allowPaging ?
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={props.rowCount}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    /> :
                                    null
                                }
                            </Grid>
                        </Grid>
                    </ CardContent>
                </Card>
            </Paper>
        </div >
    );
}