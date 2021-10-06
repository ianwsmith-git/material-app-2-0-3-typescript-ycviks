import DateFnsUtils from '@date-io/date-fns';
import {
    Backdrop,
    Card,
    CardContent,
    CircularProgress,
    Collapse,
    Grid,
    IconButton,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField as MuiTextField,
    Theme,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close as CloseIcon } from '@material-ui/icons';
import { Alert as MuiAlert, Autocomplete } from '@material-ui/lab';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { spacing } from '@material-ui/system';
import { Formik } from 'formik';
import { values } from 'lodash';
import React from 'react';
import styled from 'styled-components/macro';
import * as Yup from 'yup';

import {
    DiaRegWebApiClient as Client,
    Visit,
    VisitResponse,
    VisitType,
    VisitTypeArrayResponse,
} from '../../../api/DiaRegApi';
import CloseDialogButton from '../../../components/dialogs/CloseDialogButton';
import Response from '../../../models/Response';

const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const useStyles = makeStyles((theme: Theme) =>
(
    {
        root: {
            flexGrow: 1,
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
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        }
    }),
);



type VisitPropsType = {
    visitId: number;
    patientId: number;
    parentAlertHandler: Function;
    onClose: (refreshRequired: boolean) => any;
    open: boolean;

};


const validationSchema = Yup.object().shape({
    visitDate: Yup.date().required('The date of visit is required.'),
    foodMedicationAllergies: Yup.string().required('This field is required. Enter None for no food/medication allergies.'),
    typeOfAllergies: Yup.string().required('This field is required. Enter None for no types of allergies.'),
    medications: Yup.string().required('This field is required. Enter None for no types medications.'),
    smokes: Yup.boolean().required("This field is required"),
    smokesPacksPerDay: Yup.number().when('smokes', { is: true, then: Yup.number().min(1, "The minimum is 1") })
});

export function VisitEditor(props: VisitPropsType) {
    const [visit, setVisit] = React.useState<Visit>(createNewVisit());
    const [visitTypes, setVisitTypes] = React.useState<VisitType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [dataChanged, setDataChanged] = React.useState<boolean>(false);
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");
    const [alertSeverity, setAlertSeverity] = React.useState<any>("success");
    const [visitTypeName, setVisitTypeName] = React.useState<any>("");
    const [manualDirty, setManualDirty] = React.useState<boolean>(false);


    const saveButtonRef: React.RefObject<HTMLButtonElement> = React.createRef();
    const cancelButtonRef: React.RefObject<HTMLButtonElement> = React.createRef();
    const classes = useStyles();


    React.useEffect(() => {
        let active = true;

        if (loading) {
            (async () => {
                await getVisitTypes().then((value: VisitTypeArrayResponse) => {
                    if (value.status == "success") {
                        let data = value.data!;
                        setVisitTypes(data);
                    }
                    else {
                        showAlert(value.status, value.message!);
                    }
                }
                ).catch((error) => {
                    showAlert("error", "An expected error has occurred: " + error.message!);
                });

                if (props.visitId != 0) {
                    await getVisit().then((value: VisitResponse) => {
                        if (value.status == "success") {
                            let data = value.data!;
                            setVisit(data);
                        }
                        else {

                            showAlert(value.status, value.message!);
                            //---Handle Error

                        }
                    }).catch((error) => {
                        showAlert("error", "An expected error has occurred: " + error.message!);
                    });
                }

                setLoading(false);

            })();
        }

        return () => {
            active = false;
        };
    }, [loading]);


    function showAlert(alertSeverity: any, alertMessage: string) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    };

    async function getVisit() {
        return await new Client().getVisit(props.visitId);
    }

    async function getVisitTypes() {
        return await new Client().getVisitTypes();
    }

    function createNewVisit(): Visit {
        let newVisit = new Visit();
        newVisit.id = 0;
        newVisit.visitDate = new Date();
        newVisit.patientId = props.patientId;
        newVisit.lastFluShotDate = null as any;
        newVisit.lastPneumoShotDate = null as any;
        newVisit.visitType = new VisitType();
        newVisit.visitTypeId = 0;
        newVisit.smokes = false;
        newVisit.smokesPacksPerDay = 0;
        newVisit.drinksAlcohol = false;
        newVisit.alcoholPerDay = 0;


        return newVisit;


    }

    function onClose() {
        props.onClose(dataChanged);
    }

    async function updateVisit(visit: Visit) {
        return await new Client().updateVisit(visit);
    }

    async function addVisit(visit: Visit) {
        visit.patientId = props.patientId;
        return await new Client().addVisit(visit)
    }


    async function onSumbit(
        values: Visit,
        { resetForm, setErrors, setStatus, setSubmitting }: any
    ) {
        try {

            setSubmitting(true);
            let responseInfo: Response<number>;

            values.smokes = visit.smokes;
            values.smokesPacksPerDay = visit.smokesPacksPerDay;
            values.drinksAlcohol = visit.drinksAlcohol;
            values.alcoholPerDay = visit.alcoholPerDay;

            if (values.id !== 0) {
                responseInfo = await updateVisit(values) as Response<number>;
            }
            else {
                responseInfo = await addVisit(values) as Response<number>;
            }

            if (responseInfo.status === "success") {

                if (values.id === 0) {
                    values.id = responseInfo.data!;

                }

                setVisit(values);
                setDataChanged(true);

                resetForm();
                showAlert("success", "Your changes have been saved.");
                setStatus({ sent: true });
                setSubmitting(false);
                setManualDirty(false);
            }
            else {
                showAlert("error", responseInfo.message);
                setStatus({ sent: true });
                setSubmitting(false);
            }


        } catch (error: any) {
            showAlert("error", error.message);
            setStatus({ sent: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
        }
    };
    return (


        loading ?
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            :
            <Formik
                enableReinitialize={true}
                initialValues={visit}
                validationSchema={validationSchema}
                onSubmit={onSumbit}
                name="visitForm"

            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                    dirty,
                    isValid,
                    setFieldValue,
                    setFieldTouched
                }) => (
                    <div>
                        <Backdrop className={classes.backdrop} open={isSubmitting}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <Dialog open={props.open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                            disableEscapeKeyDown>
                            <DialogTitle id="form-dialog-title">Patient Visit</DialogTitle>
                            <DialogContent className={classes!.root} dividers>

                                <Collapse in={openAlert}>
                                    <Grid container spacing={8} className={classes!.root} >
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

                                <DialogContentText>
                                    For new patients select Initial Visit as the type of visit.
                                </DialogContentText>

                                <Card>
                                    <CardContent>
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={4}>
                                                <Grid item md={4}>
                                                    <Autocomplete
                                                        autoHighlight
                                                        id="visitType"

                                                        options={visitTypes}
                                                        getOptionLabel={(visitType) => visitType?.name!}
                                                        getOptionSelected={
                                                            (option, value) => option.id === value.id
                                                        }
                                                        includeInputInList
                                                        disableClearable={true}
                                                        onOpen={handleBlur("visitTypeField")}
                                                        autoComplete={false}

                                                        onChange={(event: any, newValue: any) => {
                                                            values.visitType = newValue;
                                                            values.visitTypeId = newValue.id;
                                                            setVisit(values);
                                                            handleChange("visitType");
                                                            setManualDirty(true);
                                                        }}
                                                        onInputChange={(event: any, newInputValue: any) => {
                                                            setVisitTypeName(newInputValue);
                                                        }}
                                                        inputValue={visitTypeName}
                                                        value={visit.visitType}
                                                        renderInput={(params) => <TextField required {...params} label="Purpose of Visit" error={Boolean(touched.visitType && errors.visitType)}
                                                            fullWidth
                                                            helperText={touched.visitType && errors.visitType}
                                                            name="visitTypeField"
                                                            variant="outlined"

                                                        />}
                                                    />
                                                </Grid>

                                            </Grid>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container spacing={4}>

                                                    <Grid item md={4}>

                                                        <KeyboardDatePicker
                                                            disableFuture
                                                            id="visitDate"
                                                            required={true}
                                                            variant="inline"
                                                            inputVariant="outlined"
                                                            label="Date of Visit"
                                                            format="MM/dd/yyyy"
                                                            value={values.visitDate}
                                                            InputAdornmentProps={{ position: "start" }}
                                                            onChange={date => {

                                                                values.visitDate = date!;
                                                                setVisit(values);

                                                            }}
                                                            maxDate={new Date()}
                                                            error={Boolean(touched.visitDate && errors.visitDate)}
                                                            onBlur={handleBlur}
                                                            helperText={errors.visitDate && touched.visitDate}

                                                        />

                                                    </Grid>

                                                    <Grid item md={4}>

                                                        <KeyboardDatePicker
                                                            autoOk
                                                            variant="inline"
                                                            inputVariant="outlined"
                                                            label="Last Flu Shot Date"
                                                            format="MM/dd/yyyy"
                                                            value={values.lastFluShotDate || null}
                                                            InputAdornmentProps={{ position: "start" }}
                                                            onChange={date => { if (date != null) values.lastFluShotDate = date! }}
                                                            maxDate={new Date()}
                                                        />

                                                    </Grid>
                                                    <Grid item md={4}>
                                                        <KeyboardDatePicker
                                                            autoOk
                                                            variant="inline"
                                                            inputVariant="outlined"
                                                            label="Last Pneumo Shot Date"
                                                            format="MM/dd/yyyy"
                                                            value={values.lastPneumoShotDate || null}
                                                            InputAdornmentProps={{ position: "start" }}
                                                            onChange={date => { if (date != null) values.lastPneumoShotDate = date! }}
                                                            maxDate={new Date()}
                                                        />

                                                    </Grid>

                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                            <Grid container spacing={8} className={classes!.root} >
                                                <Grid item md={12} className={classes!.root} >
                                                    <TextField
                                                        name="foodMedicationAllergies"
                                                        multiline
                                                        rows={3}
                                                        label="Food/Medication Allergies (command separated)"
                                                        value={values.foodMedicationAllergies || ""}
                                                        error={Boolean(touched.foodMedicationAllergies && errors.foodMedicationAllergies)}
                                                        fullWidth
                                                        helperText={touched.foodMedicationAllergies && errors.foodMedicationAllergies}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        variant="outlined"

                                                        my={2}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={8} className={classes!.root} >
                                                <Grid item md={12} className={classes!.root} >
                                                    <TextField
                                                        name="typeOfAllergies"
                                                        multiline
                                                        rows={3}
                                                        label="Type of Allergies"
                                                        value={values.typeOfAllergies || ""}
                                                        error={Boolean(touched.typeOfAllergies && errors.typeOfAllergies)}
                                                        fullWidth
                                                        helperText={touched.typeOfAllergies && errors.typeOfAllergies}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        variant="outlined"

                                                        my={2}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={8} className={classes!.root}>

                                                <Grid item md={1}>
                                                    <InputLabel id="smokes-select-label">Smokes</InputLabel>
                                                    <Select
                                                        labelId="smoke-select-label"
                                                        name="smokeSelect"
                                                        value={visit.smokes ? 2 : 1}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                            var newval = e.target.value as number
                                                            setFieldValue(e.target.name!, newval);
                                                            values.smokes = newval === 1 ? false : true;

                                                            if (!values.smokes) {
                                                                values.smokesPacksPerDay = 0;

                                                                setFieldValue("packsPerDay", 0);
                                                            }


                                                            setVisit(values);

                                                            handleChange(e.target.name);
                                                        }
                                                        }
                                                    >
                                                        <MenuItem value={1}>No</MenuItem>
                                                        <MenuItem value={2}>Yes</MenuItem>
                                                    </Select>


                                                </Grid>

                                                <Grid item md={4}>
                                                    <TextField
                                                        id="outlined-number"
                                                        label="Number of Packs Per Day"
                                                        type="number"
                                                        name="packsPerDay"
                                                        error={Boolean(errors.smokesPacksPerDay)}
                                                        helperText={errors.smokesPacksPerDay}
                                                        fullWidth
                                                        InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        variant="outlined"
                                                        onBlur={handleBlur}
                                                        /*     onChange={(e) => {
                                                                setFieldValue(e.target.name!, e.target.value);
                                                                this.setState({ smokesPerDay: e.target.value });
                                                                values.smokesPacksPerDay = +this.state.smokesPerDay;
                                                                handleChange(e.target.name);
                                                            }
                                                            } */
                                                        value={visit.smokesPacksPerDay}
                                                        disabled={!visit.smokes}

                                                    />
                                                    {errors.smokesPacksPerDay && <p>{errors.smokesPacksPerDay} </p>}
                                                </Grid>


                                                <Grid item md={1}>
                                                    <InputLabel id="alcohol-select-label">Alcohol</InputLabel>
                                                    <Select
                                                        labelId="alcohol-select-label"
                                                        name="alcohol-select"
                                                        value={values.drinksAlcohol ? 2 : 1}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {

                                                            var newval = e.target.value as number
                                                            setFieldValue(e.target.name!, e.target.value);
                                                            //this.setState({ drinks: newval });
                                                            values.drinksAlcohol = newval === 1 ? false : true;

                                                            if (!values.drinksAlcohol) {
                                                                values.alcoholPerDay = 0;
                                                            }

                                                            setVisit(values);

                                                            handleChange(e.target.name);

                                                        }
                                                        }
                                                    >
                                                        <MenuItem value={1}>No</MenuItem>
                                                        <MenuItem value={2}>Yes</MenuItem>
                                                    </Select>
                                                </Grid>


                                                <Grid item md={4}>
                                                    <TextField
                                                        name="drinks-per-day"
                                                        label="Drinks Per Day"
                                                        type="number"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        fullWidth
                                                        InputProps={{ inputProps: { min: "0", max: "20", step: "1" } }}
                                                        variant="outlined"
                                                        onBlur={handleBlur}
                                                        /* onChange={(e) => {
                                                            setFieldValue(e.target.name!, e.target.value);
                                                            this.setState({ drinksPerDay: e.target.value });
                                                            handleChange(e.target.name);
    
                                                        }
                                                        } */
                                                        value={values.alcoholPerDay}
                                                        disabled={!values.drinksAlcohol}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Grid container spacing={8} className={classes!.root}>
                                                <Grid item md={12} className={classes!.root}>
                                                    <TextField
                                                        name="medications"
                                                        multiline
                                                        rows={4}
                                                        label="Medication (command separated)"
                                                        value={values.medications || ""}
                                                        error={Boolean(touched.medications && errors.medications)}
                                                        fullWidth
                                                        helperText={touched.medications && errors.medications}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        variant="outlined"

                                                        my={2}
                                                    />
                                                </Grid>

                                            </Grid>
                                            <Grid container spacing={8} className={classes!.root}>
                                                <Grid item md={12} className={classes!.root}>
                                                    <TextField
                                                        name="additionalInfo"
                                                        multiline
                                                        rows={4}
                                                        label="Additional Information"
                                                        value={values.additionalInfo || ""}
                                                        error={Boolean(touched.additionalInfo && errors.additionalInfo)}
                                                        fullWidth
                                                        helperText={touched.additionalInfo && errors.additionalInfo}
                                                        onBlur={handleBlur}

                                                        onChange={handleChange}
                                                        variant="outlined"

                                                        my={2}
                                                    />
                                                </Grid>

                                            </Grid>

                                            <Button type="submit" ref={saveButtonRef} hidden={true} />
                                            <Button ref={cancelButtonRef} hidden={true} />

                                        </form>
                                    </CardContent>
                                </Card>


                            </DialogContent>
                            <DialogActions>
                                <CloseDialogButton hidden={false} buttonText={dirty ? "Cancel" : "Close"} prompt={dirty} closeDialogHandler={onClose} />
                                <Button onClick={() => { saveButtonRef.current?.click() }} variant="outlined" color="primary" disabled={isSubmitting || !isValid || !dirty}>
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog >
                    </div>
                )
                }
            </Formik >
    );

}


/* const VisitDialog = withStyles(moreStyles)(VisitBaseDialog);



VisitDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(moreStyles)(VisitDialog)
 */