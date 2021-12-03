import { Button, Dialog, DialogActions, DialogContent, DialogTitle, StyledComponentProps } from '@material-ui/core';
import React from 'react';
import CloseDialogButton from "./CloseDialogButton";

//#region "Props Type"
type DialogWrapperPropsType = {
    show: boolean,
    children: JSX.Element,
    title: string,
    dirty: boolean | false,
    isValid: boolean | false,
    isSubmitting: boolean | false,
    okButtonRef: any,
    cancelButtonRef: any
}
//#endregion Props Type


function DialogWrapper(props: DialogWrapperPropsType & StyledComponentProps) {

    //#region Event Handler
    const onOkClick = () => {
        props.okButtonRef.current?.click();
    }

    const onCancelClick = () => {
        props.cancelButtonRef.current?.click();
    }
    //#endregion Event Handler

    return (

        props.show ?
            <React.Fragment>
                <Dialog open={props.show} fullWidth={true} maxWidth="md" >
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogContent dividers>
                        {props.children}
                    </DialogContent>
                    <DialogActions>
                        <CloseDialogButton hidden={false} buttonText={props.dirty ? "Cancel" : "Close"} prompt={props.dirty} closeDialogHandler={onCancelClick} />
                        <Button onClick={onOkClick} variant="outlined" color="primary"
                            disabled={props.isSubmitting || !props.isValid || !props.dirty}
                        >
                            Save</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
            : null

    );
}

export default DialogWrapper;