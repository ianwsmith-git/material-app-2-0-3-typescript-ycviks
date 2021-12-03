import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

import BasicTable, { Column } from '../Tables/BasicTable';

type PopupListItemSelectPropsTypes = {
    columns: Array<Column>;
    title: string;
    instructions: string;
    show: boolean;
    onCancel: Function;
    onSelect: (selected: Array<number>) => any;
    data: Array<any>;
}

export default function ListSelectDialog(props: PopupListItemSelectPropsTypes) {
    const [selections, setSelections] = React.useState<Array<number>>(new Array<number>());

    function handleSelect() {
        props.onSelect(selections);
    }

    function onSelectionChange(selected: Array<number>) {
        setSelections(selected)
    }

    function handleClose() {
        props.onCancel();
    }

    return (
        <React.Fragment>
            <Dialog open={props.show} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                disableEscapeKeyDown fullWidth={true} >
                <DialogTitle id="form-dialog-title">
                    <div>
                        <Typography variant="h3" gutterBottom display="inline" color="textPrimary">
                            {props.title}
                        </Typography>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        <div>
                            <Typography variant="h4" gutterBottom display="inline" color="textPrimary">
                                {props.instructions}
                            </Typography>
                        </div>
                    </DialogContentText>
                    <BasicTable
                        columns={props.columns}
                        data={props.data}
                        allowEdit={false}
                        allowDelete={false}
                        allowSelect={true}
                        onView={handleSelect}
                        onSelectionChange={onSelectionChange} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>

                    <Button type="submit" color="primary" onClick={handleSelect} variant="outlined" disabled={selections.length == 0} >
                        Select
                    </Button>

                </DialogActions>
            </Dialog >
        </React.Fragment >
    );
}