import { DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createStyles, StyledComponentProps, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const dialogStyle = (theme: Theme) => createStyles({
    root: {

        maxWidth: 'lg',
        backgroundColor: theme.palette.background.paper,
    }
});

export interface NotificationDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

function NotificationDialog(props: NotificationDialogProps & StyledComponentProps) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const { classes } = props;

    return (
        <Dialog onClose={handleClose} aria-labelledby="Notification-dialog-title" open={open} maxWidth="lg" disableBackdropClick
            disableEscapeKeyDown>
            <DialogTitle id="Notification-dialog-title">{props.title}</DialogTitle>
            <DialogContent dividers className={classes!.root}>
                <DialogContentText>
                    <Typography variant="subtitle1">{props.message}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withStyles(dialogStyle)(NotificationDialog)