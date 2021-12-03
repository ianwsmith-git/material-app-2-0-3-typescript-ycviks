
import { EventApi } from "@fullcalendar/react";
import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import "../../components/dialogs/Modal.css";
import { AppointmentsCalendar, Divider } from "./AppointmentCalendar";
import { AppointmentDialog } from "./AppointmentDialog";



function AppointmentScheduler() {
    const [showAppointment, setShowAppointment] = useState<boolean>(false);
    const [appointmentId, setAppointmentId] = useState<string>("");
    const [eventStartDate, setEventStartDate] = useState<Date>();
    const [eventEndDate, setEventEndDate] = useState<Date>();
    const [toggle, setToggle] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<boolean>(false);

    //#region Event Handlers
    const onDateClick = (startDate: Date, endDate: Date) => {
        //setAppointmentId(new string({ key: "0" }));
        setNewItem(true);
        setEventStartDate(startDate);
        setEventEndDate(endDate);
        setShowAppointment(true);
    }

    const onEventClick = (event: EventApi) => {
        setAppointmentId(event.id);
        setNewItem(false);
        setShowAppointment(true);
    }

    const onClose = (stateChanged: boolean) => {

        if (stateChanged) {
            setToggle(!toggle);
        }

        setNewItem(false);
        setShowAppointment(false);
    }

    const okButtonRef = React.createRef();
    const cancelButtonRef = React.createRef();
    //#endregion Event Handlers

    return (
        <React.Fragment>
            <Helmet title="Schedule Appointments" />
            <Typography variant="h3" gutterBottom display="inline">
                Schedule Appointments
            </Typography>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <AppointmentsCalendar onDateClick={onDateClick} onEventClick={onEventClick} refresh={toggle} />
                    <AppointmentDialog okButtonRef={okButtonRef}
                        cancelButtonRef={cancelButtonRef}
                        show={showAppointment}
                        id={appointmentId}
                        onClose={onClose}
                        startDate={eventStartDate}
                        endDate={eventEndDate}
                        newItem={newItem}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AppointmentScheduler;



