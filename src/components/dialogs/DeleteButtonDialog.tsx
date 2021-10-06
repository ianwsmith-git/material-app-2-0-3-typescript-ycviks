import { createStyles, StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Warning as WarningIcon } from '@material-ui/icons';
import React from 'react';

const dialogStyle = (theme: Theme) => createStyles({
    root: {

        maxWidth: 'lg',
        backgroundColor: theme.palette.background.paper,
    }
});


type DeleteDialogButtonPropsType = {
    buttonText: string;
    deleteDialogHandler: () => any;
    prompt: boolean;
    hidden?: boolean;
    message: string
    title: string
};

class DeleteDialogButton extends React.Component<DeleteDialogButtonPropsType & StyledComponentProps> {

    state = { open: false, buttonText: "Cancel" };


    handleOKDelete = () => {
        this.props.deleteDialogHandler();
        this.setState({ open: false });
    };

    handleCancelDelete = () => {
        this.setState({ open: false });
    };


    handleClick = () => {

        if (this.props.prompt) {
            this.setState({ open: true });
        }
        else {
            this.props.deleteDialogHandler();
        }

    }



    public render() {

        const { classes } = this.props;

        return (
            <div>
                {
                    this.props.hidden === false ?
                        <Button variant="contained" color="secondary" onClick={this.handleClick}>
                            {this.props.buttonText}
                        </Button>
                        :
                        null
                }
                {
                    this.state.open === true ?

                        <Dialog open={this.state.open} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                            disableEscapeKeyDown>
                            <DialogTitle id="form-dialog-title"><WarningIcon color="error" />{this.props.title}</DialogTitle>

                            <DialogContent dividers className={classes!.root}>
                                <DialogContentText>
                                    {this.props.message}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCancelDelete} color="primary">
                                    Cancel
                                </Button>

                                <Button type="submit" color="primary" onClick={this.handleOKDelete}>
                                    OK
                                </Button>

                            </DialogActions>
                        </Dialog >
                        :
                        null
                }

            </div >

        );
    }
}

export default withStyles(dialogStyle)(DeleteDialogButton)