import DateFnsUtils from '@date-io/date-fns';
import { Backdrop, Button as MuiButton, Card as MuiCard, CardContent, CircularProgress, Collapse, Divider as MuiDivider, Grid, IconButton, makeStyles, Paper, TextField as MuiTextField, Theme, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Close as CloseIcon } from '@material-ui/icons';
import { Alert as MuiAlert, Autocomplete } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { spacing, SpacingProps } from '@material-ui/system';
import { enUS } from 'date-fns/locale';
import { Formik, FormikContextType } from 'formik';
import React, { forwardRef, useCallback } from 'react';
import styled from 'styled-components/macro';
import {
    Appointment, AppointmentStatus, AppointmentStatusArrayResponse,
    AppointmentTypeArrayResponse, DiaRegWebApiClient as Client,
    Doctor, Patient, PersonAddress
} from '../../api/DiaRegApi';
import ListSelectDialog from '../../components/dialogs/ListSelectDialog';
import { Column } from '../../components/Tables/BasicTable';
import Response from '../../models/Response';
import { AppointmentResponse, AppointmentType, PersonAddressListResponse } from './../../api/DiaRegApi';
import { FormikEffect } from '../../utils/FormikEffect';


//#region Styled Components
const Divider = styled(MuiDivider)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

interface ButtonPropstype extends SpacingProps {
    // #region Properties (1)

    component?: string;

    // #endregion Properties (1)
}

const Button = styled(MuiButton)<ButtonPropstype>(spacing);

const useStyles = makeStyles((theme: Theme) =>
(
    {
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            "& .MuiTextField-root": {
                margin: theme.spacing(1)
            },
            width: "900px"
        },
        indicator: {
            backgroundColor: 'red',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
        textarea: {
            resize: "both",
            padding: theme.spacing(2),
            textAlign: "left",
            color: theme.palette.text.secondary,
            display: "flex",
            flex: 1
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        zIndex: {
            zIndex: 99999999,
        },
        hiddenActions:
        {
            visibility: "hidden"
        }
    }),
);

//#endregion Formik Helpers

//#region Prop Types Definitions
type PatientAppointmentPropsType = {
    onFormStateChanged: (isSubmitting: boolean, isValid: boolean, dirty: boolean) => any;
    id: string;
    onClose: (stateChanged: boolean) => any;
    startDate?: Date | null | undefined;
    endDate?: Date | null | undefined;
    newItem: boolean | false;
}
//#endregion Props Types Definitions

export const PatientAppointment = forwardRef((props: PatientAppointmentPropsType, ref: any) => {

    //#region Alert State
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");
    const [alertSeverity, setAlertSeverity] = React.useState<any>("success");
    const [newItem, setNewItem] = React.useState<boolean>(props.newItem);

    const showAlert = (alertSeverity: string, alertMessage: string) => {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    }
    //#endregion Alert State


    //#region Patient Appointment
    const [appointment, setAppointment] = React.useState<Appointment>(new Appointment());
    const [address, setAddress] = React.useState<PersonAddress>(new PersonAddress());
    const [dateLang, setDateLang] = React.useState(enUS);

    const getAppointment = async (id: string) => {
        return await new Client().getAppointment(id);
    }

    const createNewAppointment = async () => {
        return await new Client().createNewAppointment();
    }

    const addAppointment = async (appointment: Appointment) => {
        return await new Client().addAppointment(appointment);
    }

    const updateAppointment = async (appointment: Appointment) => {
        return await new Client().updateAppointment(appointment);
    }
    //#endregion Patient Appointment


    //#region Button References
    const { okButtonRef, cancelButtonRef } = ref;
    //#endregion

    //#region Styles
    const classes = useStyles();
    //#endregion Styles


    //#region Get List Data
    const [patients, setPatients] = React.useState<Patient[]>([]);
    const [visitTypes, setVisitTypes] = React.useState<AppointmentType[]>([]);
    const [appointmentStatuses, setAppointmentStatuses] = React.useState<AppointmentStatus[]>([]);
    const [doctors, setDoctors] = React.useState<Doctor[]>([]);
    const [addresses, setAddresses] = React.useState<PersonAddress[]>([]);
    const [showAddressSelect, setShowAddressSelect] = React.useState<boolean>(false);


    const buildColumns = (): Array<Column> => {
        var columns = new Array<Column>();
        columns.push({ header: "Name", field: "name" });
        columns.push({ header: "Type", field: "type.name" });
        columns.push({ header: "Phone Number", field: "phoneNumber" });
        columns.push({ header: "Address 1", field: "address1" });
        columns.push({ header: "Address 2", field: "address2" });
        columns.push({ header: "City", field: "location.city.name" });
        columns.push({ header: "Region", field: "location.region.name" });
        return columns;
    }

    const onPatientChangeHandle = async (value: string) => {
        try {
            // use the changed value to make request and then use the result. Which
            const response = await new Client().searchPatientByName(value);
            if (response.status == "success") {
                const patients = response.data!;
                setPatients(patients);
            }
            else {
                showAlert(response.status!, response.message!);
            }
        }
        catch (error: any) {
            showAlert("error", "An expected error has occurred while loading patients: " + error.message!);
        }
    };
    const onDoctorChangeHandle = async (value: string) => {
        try {
            // use the changed value to make request and then use the result. Which
            const response = await new Client().searchDoctorByName(value);
            if (response.status == "success") {
                const doctors = response.data!;
                setDoctors(doctors);
            }
            else {
                showAlert(response.status!, response.message!);

            }
        }
        catch (error: any) {
            showAlert("error", "An expected error has occurred while loading doctors: " + error.message!);
        }
    };

    const getVisitTypes = async () => {
        return await new Client().getAppointmentTypes();
    }

    const getAppointmentStatuses = async () => {
        return await new Client().getAppointmentStatues();
    }

    const getDoctorAddresses = async (doctorId: string) => {
        return await new Client().getDoctorLocations(doctorId);
    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            if (showAddressSelect) {
                (async () => {
                    await getDoctorAddresses(appointment.doctor.id!).then((value: PersonAddressListResponse) => {
                        if (value.status == "success") {
                            let data = value.data!;
                            setAddresses(data);
                        }
                        else {
                            showAlert(value.status!, value.message!);
                        }
                    }).catch((error) => {
                        showAlert("error", "An expected error has occurred while loading the addresses for this doctor: " + error.message!);
                    });

                })();
            }
        }

        return () => {
            active = false;
        };

    }, [showAddressSelect]);
    //#endregion Get List Data

    //#region initial data load
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        let active = true;

        if (loading) {
            (async () => {
                await getVisitTypes().then((value: AppointmentTypeArrayResponse) => {
                    if (value.status == "success") {
                        let data = value.data!;
                        setVisitTypes(data);
                    }
                    else {
                        showAlert(value.status!, value.message!);
                    }
                }).catch((error) => {
                    showAlert("error", "An expected error has occurred while loading Appointment Types: " + error.message!);
                });

                await getAppointmentStatuses().then((value: AppointmentStatusArrayResponse) => {
                    if (value.status == "success") {
                        let data = value.data!;
                        setAppointmentStatuses(data);
                    }
                    else {
                        showAlert(value.status!, value.message!);
                    }
                }).catch((error) => {
                    showAlert("error", "An expected error has occurred while loading Appointment Statuses: " + error.message!);
                });

                if (!newItem) {
                    await getAppointment(props.id).then((value: AppointmentResponse) => {
                        if (value.status == "success") {
                            let data = value.data!;

                            /*         if (props.id == 0) {
            
                                        if (props.startDate !== null) {
                                            data.appointmentStartDate = props.startDate!;
                                        }
            
                                        if (props.endDate !== null) {
                                            data.appointmentEndDate = props.endDate!;
                                        }
                                    } */
                            setAppointment(data);
                            setNewItem(false);
                        }
                        else {
                            showAlert(value.status!, value.message!);
                        }
                    }).catch((error) => {
                        showAlert("error", "An expected error has occurred while loading Appointment Statuses: " + error.message!);
                    });

                }
                else {
                    await createNewAppointment().then((value: AppointmentResponse) => {
                        if (value.status == "success") {
                            let data = value.data!;
                            data.appointmentStartDate = props.startDate!;
                            data.appointmentEndDate = props.endDate!;
                            setAppointment(data);
                        }
                        else {
                            showAlert(value.status!, value.message!);
                        }
                    }).catch((error) => {
                        showAlert("error", "An expected error has occurred while loading Appointment Statuses: " + error.message!);
                    });

                }

                setLoading(false);

            })();
        }

        return () => {
            active = false;
        };

    }, [loading]);

    //#endregion Initial Data Load

    //#region Form Event Handlers
    const [stateChanged, setStateChanged] = React.useState<boolean>(false);

    const onCancelClick = () => {
        props.onClose(stateChanged);
    }

    const onFormikChange = useCallback(
        (event: FormikContextType<Appointment>) => {
            props.onFormStateChanged(event.isSubmitting, event.isValid, event.dirty);
        },
        []
    )

    async function onSubmit(
        values: Appointment,
        { resetForm, setErrors, setStatus, setSubmitting, touched }: any) {

        try {
            setSubmitting(true);
            let responseInfo: Response<string>;

            values.id = appointment.id;

            if (appointment.appointmentAddress != null) {
                values.appointmentAddress = appointment.appointmentAddress;
            }
            if (!newItem) {
                responseInfo = await updateAppointment(values) as Response<string>;
            }
            else {
                responseInfo = await addAppointment(values) as Response<string>;
            }


            if (responseInfo.status === "success") {

                if (newItem) {
                    values.id = responseInfo.data!
                }

                setAppointment(values);
                setNewItem(false);

                resetForm(values);
                showAlert("success", "Your changes have been saved.");
                setStatus({ sent: true });
                setSubmitting(false);

                setStateChanged(true);
            }
            else {
                showAlert("error", responseInfo.message);
                setStatus({ sent: true });
                setSubmitting(false);
            }


        } catch (error: any) {
            showAlert("error", error.message);
            setStatus({ sent: false });
            setSubmitting(false);
        }
    }

    //#endregion Form Event Handlers

    return (
        <div className={classes.root}>

            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    :
                    <Formik<Appointment>

                        //enableReinitialize={true}
                        initialValues={appointment}
                        // validationSchema={validationSchema}
                        onSubmit={onSubmit}

                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values,
                            status,
                            isValid,
                            dirty,
                            setFieldValue,
                        }) => (
                            <div>
                                <FormikEffect<Appointment> onChange={onFormikChange} />
                                <Backdrop className={classes.backdrop} open={isSubmitting}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                                <Collapse in={openAlert}>
                                    <Grid container spacing={0} className={classes!.root} >
                                        <Grid item md={12} className={classes!.root} >

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
                                        </Grid>
                                    </Grid>
                                </ Collapse>
                                <Card mb={6}>
                                    <CardContent>
                                        <Grid container spacing={4}>
                                            <Grid item md={4}>
                                                <Typography variant="h5" gutterBottom display="inline">
                                                    Patient Information
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item md={6}>
                                                    <Autocomplete
                                                        id="patient"
                                                        onOpen={handleBlur}
                                                        onBlur={handleBlur}
                                                        onChange={(event: any, newValue: any) => {
                                                            if (newValue != null) {
                                                                setFieldValue("patient", newValue);
                                                                appointment.patient = newValue;
                                                                setAppointment(appointment);

                                                            }
                                                        }}
                                                        getOptionSelected={(option, value) => {
                                                            return option.id === value.id
                                                        }
                                                        }
                                                        getOptionLabel={option => option.displayName! == null ? "" : option.displayName!}
                                                        options={patients}
                                                        loading={loading}
                                                        fullWidth
                                                        disablePortal
                                                        PaperComponent={({ children }) => (
                                                            <Paper elevation={8}>{children}</Paper>
                                                        )}
                                                        value={values.patient}
                                                        className={classes.zIndex}
                                                        renderInput={params => (
                                                            <TextField
                                                                {...params}
                                                                label="Patient (type the last or first name of a patient)"
                                                                variant="outlined"
                                                                name="value.patient.displayName"
                                                                onChange={async ev => {
                                                                    if (ev.target.value !== "" && ev.target.value !== null) {
                                                                        await onPatientChangeHandle(ev.target.value);
                                                                    }
                                                                }}
                                                                required
                                                                value={values.patient == null ? "" : values.patient.displayName}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                        <React.Fragment>
                                                                            {loading ? (
                                                                                <CircularProgress color="inherit" size={20} />
                                                                            ) : null}
                                                                            {params.InputProps.endAdornment}
                                                                        </React.Fragment>
                                                                    )
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Autocomplete
                                                        fullWidth={true}
                                                        id="visitType"
                                                        options={appointmentStatuses}
                                                        onBlur={handleBlur}
                                                        getOptionLabel={(appointmentStatus) => appointmentStatus?.name!}
                                                        getOptionSelected={(option, value) => { return option.id == value.id }}
                                                        disableClearable={true}
                                                        autoComplete={false}
                                                        onChange={(event: any, newValue: AppointmentStatus) => {

                                                            setFieldValue("appointmentStatus", newValue)
                                                        }}
                                                        value={values.appointmentStatus}
                                                        renderInput={(params) => <TextField {...params} label="Appointment Status" variant="outlined" />}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Divider m={4} />
                                            <Grid container spacing={4}>
                                                <Grid item md={4}>
                                                    <Typography variant="h5" gutterBottom display="inline">
                                                        Visit Information
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item md={4}>
                                                    <Autocomplete
                                                        fullWidth={true}
                                                        id="visitType"
                                                        options={visitTypes}
                                                        onBlur={handleBlur}
                                                        getOptionLabel={(visitType) => visitType.name! == null ? "" : visitType.name!}
                                                        getOptionSelected={(option, value) => { return option.id == value.id }}
                                                        disableClearable={true}
                                                        autoComplete={false}
                                                        onChange={(event: any, newValue: AppointmentType) => {
                                                            setFieldValue("appointmentType", newValue)
                                                        }}
                                                        value={values.appointmentType}
                                                        renderInput={(params) => <TextField {...params} label="Purpose/Appointment Type" variant="outlined" />}
                                                    />
                                                </Grid>

                                                <Grid item md={4}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLang}>
                                                        <DateTimePicker
                                                            name="startDate"
                                                            fullWidth={true}
                                                            variant="dialog"
                                                            inputVariant="outlined"
                                                            onBlur={handleBlur}
                                                            label="Start Date/Time"
                                                            value={values.appointmentStartDate}
                                                            cancelLabel="Cancel"
                                                            okLabel="Select"
                                                            format="MM/dd/yyyy hh:mm a"
                                                            onChange={date => {
                                                                setFieldValue("appointmentStartDate", date);
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                                <Grid item md={4}>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={dateLang}>
                                                        <DateTimePicker
                                                            name="endDate"
                                                            fullWidth={true}
                                                            variant="dialog"
                                                            inputVariant="outlined"
                                                            onBlur={handleBlur}
                                                            label="Start Date/Time"
                                                            value={values.appointmentEndDate}
                                                            format="MM/dd/yyyy hh:mm a"
                                                            cancelLabel="Cancel"
                                                            okLabel="Select"
                                                            onChange={date => {
                                                                setFieldValue("appointmentEndDate", date);
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </Grid>
                                            </Grid>
                                            <Divider m={4} />
                                            <Grid container spacing={4}>
                                                <Grid item md={4}>
                                                    <Typography variant="h5" gutterBottom display="inline">
                                                        Doctor Information
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item md={6}>
                                                    <Autocomplete
                                                        id="doctor"

                                                        onBlur={handleBlur}
                                                        onChange={(event: any, newValue: any) => {
                                                            if (newValue != null) {
                                                                setFieldValue("doctor", newValue);
                                                                appointment.doctor = newValue;
                                                                setAppointment(appointment);
                                                                setShowAddressSelect(true);

                                                            }
                                                        }}
                                                        getOptionSelected={(option, value) => {
                                                            return option.id === value.id
                                                        }
                                                        }
                                                        getOptionLabel={option => option.displayName! == null ? "" : option.displayName!}
                                                        options={doctors}
                                                        loading={loading}
                                                        fullWidth
                                                        disablePortal
                                                        value={values.doctor}
                                                        className={classes.zIndex}
                                                        renderInput={params => (
                                                            <TextField
                                                                {...params}
                                                                label="Doctor (type the last or first name of a doctor)"
                                                                variant="outlined"
                                                                name="value.doctor.displayName"
                                                                onChange={async ev => {
                                                                    if (ev.target.value !== "" && ev.target.value !== null) {
                                                                        await onDoctorChangeHandle(ev.target.value);
                                                                    }
                                                                }}
                                                                required
                                                                value={values.doctor == null ? "" : values.doctor.displayName}
                                                                InputProps={{
                                                                    ...params.InputProps,
                                                                    endAdornment: (
                                                                        <React.Fragment>
                                                                            {loading ? (
                                                                                <CircularProgress color="inherit" size={20} />
                                                                            ) : null}
                                                                            {params.InputProps.endAdornment}
                                                                        </React.Fragment>
                                                                    )
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item md={6}>
                                                    {/* 
                                                    <Button onClick={() => {
                                                        setShowAddressSelect(true);
                                                    }} variant="outlined" color="primary">
                                                        Change Address
                                                    </Button> */}
                                                    <Autocomplete
                                                        fullWidth={true}
                                                        id="appointmentAddress"
                                                        options={addresses}
                                                        onBlur={handleBlur}
                                                        getOptionLabel={(address) => address.displayName! == null ? "" : address.displayName!}
                                                        getOptionSelected={(option, value) => { return option.id == value.id }}
                                                        disableClearable={true}
                                                        autoComplete={false}
                                                        onChange={(event: any, newValue: PersonAddress) => {
                                                            setFieldValue("appointmentAddress", newValue)
                                                        }}
                                                        value={values.appointmentAddress}
                                                        renderInput={(params) => <TextField {...params} label="Select a location" variant="outlined" />}
                                                    />

                                                    {/* {

                                                    appointment.appointmentAddress != null ?
                                                        <Card >
                                                            <CardContent>
                                                                <Typography gutterBottom display="inline">
                                                                    {appointment.appointmentAddress.name}
                                                                </Typography>
                                                                <Typography component="div">
                                                                    {appointment.appointmentAddress.address1}
                                                                </Typography>
                                                                <Typography component="div">
                                                                    {appointment.appointmentAddress.address2 === "" ? "" : appointment.appointmentAddress.address2}
                                                                </Typography>
                                                                <Typography component="div">
                                                                    {appointment.appointmentAddress.location.city.name}
                                                                </Typography>
                                                                <Typography component="div">
                                                                    {appointment.appointmentAddress.location.region.name}
                                                                    <TextField id="appointmentLocation" onBlur={handleBlur} value={address.id} />

                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                        :
                                                        null
                                                } */}
                                                    {/* {
                                                    showAddressSelect ?
                                                        <ListSelectDialog columns={buildColumns()}
                                                            title="Appointment Location"
                                                            instructions="Select the address of the appointment."
                                                            show={showAddressSelect}
                                                            onCancel={() => { setShowAddressSelect(false); }}
                                                            data={addresses}
                                                            onSelect={(selected: Array<number>) => {
                                                                setShowAddressSelect(false)
                                                                setAddress(addresses[selected[0]]);

                                                            }}
                                                        />
                                                        :
                                                        null
                                                } */}

                                                </Grid>

                                            </Grid>

                                            <Grid container spacing={2}>
                                                <Grid item md={12}>
                                                    <TextField
                                                        id="filled-multiline-static"
                                                        onBlur={handleBlur}
                                                        label="Notes"
                                                        multiline
                                                        rows={6}
                                                        fullWidth
                                                        variant='outlined'
                                                        value={values.notes}
                                                        onChange={(e) => {
                                                            setFieldValue("notes", e.target.value);
                                                            appointment.notes = e.target.value;
                                                            setAppointment(appointment);
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <div >
                                                <Button type="submit" ref={okButtonRef} hidden={true} />
                                                <Button ref={cancelButtonRef} hidden={true} onClick={onCancelClick} />
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                    </Formik>
            }
        </div >

    );
});
