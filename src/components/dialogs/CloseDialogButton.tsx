import { createStyles, StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Warning as WarningIcon } from '@material-ui/icons'
import React from 'react';

const dialogStyle = (theme: Theme) => createStyles({
    root: {

        maxWidth: 'lg',
        backgroundColor: theme.palette.background.paper,
    }
});


type CloseDialogButtonPropsType = {
    buttonText: string;
    closeDialogHandler: Function;
    prompt: boolean;
    hidden?: boolean;
};

class CloseDialogButton extends React.Component<CloseDialogButtonPropsType & StyledComponentProps> {

    state = { open: false, buttonText: "Cancel" };


    handleOKClose = () => {
        this.setState({ open: false });
        this.props.closeDialogHandler();
    };

    handleCancelClose = () => {
        this.setState({ open: false });
    };


    handleClick = () => {

        if (this.props.prompt) {
            this.setState({ open: true });
        }
        else {
            this.props.closeDialogHandler();
        }

    }



    public render() {

        const { classes } = this.props;

        return (
            <div>
                {
                    this.props.hidden === false ?
                        <Button variant="outlined" color="primary" onClick={this.handleClick}>
                            {this.props.buttonText}
                        </Button>
                        :
                        null
                }
                {
                    this.state.open === true ?

                        <Dialog open={this.state.open} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                            disableEscapeKeyDown>
                            <DialogTitle id="form-dialog-title"><WarningIcon color="error" /> Unsaved changes</DialogTitle>

                            <DialogContent dividers className={classes!.root}>
                                <DialogContentText>
                                    You have unsaved changes.  If you close this window those changes will be lost.  Click Cancel to go back and save your changes otherwise click OK to continue without saving.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleCancelClose} color="primary">
                                    Cancel
                                </Button>

                                <Button type="submit" color="primary" onClick={this.handleOKClose}>
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

/* const VisitDialog = withStyles(moreStyles)(ContactBaseDialog);

VisitDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(moreStyles)(ContactBaseDialog)
 */

export default withStyles(dialogStyle)(CloseDialogButton)