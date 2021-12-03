import React, { RefObject, useState } from 'react';
import DialogWrapper from "../../components/dialogs/DialogWrapper";
import { PatientAppointment } from './PatientAppointment';

//#region AppointmentDialogPropsType
type AppointmentDialogPropsType = {
    show: boolean | false;
    id: string;
    onClose: (stateChanged: boolean) => any;
    okButtonRef: RefObject<unknown>;
    cancelButtonRef: RefObject<unknown>;
    startDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
    newItem: boolean | false;
};
//#endregion
export const AppointmentDialog = (props: AppointmentDialogPropsType) => {

    //#region Formik properties and form event handlers
    const [dirty, setDirty] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onFormStateChanged = (isSubmitting: boolean, isValid: boolean, dirty: boolean) => {
        setDirty(dirty);
        setIsValid(isValid);
        setIsSubmitting(isSubmitting);
    };

    const onClose = (stateChanged: boolean) => {
        props.onClose(stateChanged);
    };
    const refs = {
        okButtonRef: props.okButtonRef,
        cancelButtonRef: props.cancelButtonRef
    };

    //#endregion
    return (
        <DialogWrapper
            show={props.show}
            title="Patient Appointment"
            dirty={dirty}
            isValid={isValid}
            isSubmitting={isSubmitting}
            okButtonRef={props.okButtonRef}
            cancelButtonRef={props.cancelButtonRef}
        >

            <PatientAppointment ref={refs as any}
                id={props.id}
                onFormStateChanged={onFormStateChanged}
                onClose={onClose}
                startDate={props.startDate}
                endDate={props.endDate}
                newItem={props.newItem} />
        </DialogWrapper>
    );
};
