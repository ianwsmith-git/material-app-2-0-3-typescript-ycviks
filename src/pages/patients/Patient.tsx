import DateFnsUtils from '@date-io/date-fns';
import { CardContent, Collapse, createStyles, Grid, IconButton, Button as MuiButton, Card as MuiCard, Divider as MuiDivider, TextField as MuiTextField, StyledComponentProps, Theme, Typography, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Close as CloseIcon } from '@material-ui/icons';
import { Autocomplete, Alert as MuiAlert } from '@material-ui/lab';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { spacing, SpacingProps } from '@material-ui/system';
import { Formik, FormikProps } from 'formik';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps, withRouter } from 'react-router';
import styled from 'styled-components/macro';
import * as Yup from 'yup';

import { City, CityArrayResponse, DiaRegWebApiClient as Client, Country, Gender, GenderArrayResponse, ICity, ICountry, ILocation, IPatient, IRegion, Location, Patient, PatientResponse, Region, RegionArrayResponse } from '../../api/DiaRegApi';
//import withAuthProvider, { AuthComponentProps } from '../../auth/AuthProvider';
import Response from '../../models/Response';
import { setupCommandBar } from '../../redux/reducers/commandBarReducer';
import store from '../../redux/store';
import ContactsTable from './contacts/Contacts';
import SurveysTable from './surveys/PatientSurveys'
import VisitsTable from './visits/Visits';

const Divider = styled(MuiDivider)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);



//const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface ButtonPropstype extends SpacingProps {
    component?: string;
}


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}


const Button = styled(MuiButton)<ButtonPropstype>(spacing);

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required")
});

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
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
});

const initialValues = new Patient({
    id: 0,
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    emailAddress: "",
    location: new Location({ city: new City({ id: 0, name: "", regionId: 0 } as ICity), region: new Region({ id: 0, name: "", countryId: 0 } as IRegion), country: new Country({ id: 0, name: "" } as ICountry) } as ILocation),
    middleName: "",
    address1: "",
    address2: "",
    title: "",
    suffix: "",
    cellPhone: "",
    homePhone: "",
    gender: { id: 1 as number, name: "Male" } as Gender
} as IPatient);

type ParentChildFormPropsType = {
    parentAlertHandler: Function
};

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

class ParentChildForm extends React.Component<RouteComponentProps & StyledComponentProps & ParentChildFormPropsType> {

    saveButtonRef: React.RefObject<HTMLButtonElement>;
    cancelButtonRef: React.RefObject<HTMLButtonElement>;
    formRef: React.RefObject<FormikProps<Patient>>;

    state = { id: 0 as number, patient: initialValues, genders: [] as Array<Gender>, regions: [] as Array<Region>, cities: [] as Array<City>, panelValue: 0, confirmClose: false };

    constructor(props: RouteComponentProps & StyledComponentProps & ParentChildFormPropsType) {
        super(props);

        this.saveButtonRef = React.createRef();
        this.cancelButtonRef = React.createRef();
        this.formRef = React.createRef();
    }


    a11yProps = (index: any) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    getGenders = async () => {
        return new Client().getGenders();
    }

    getRegions = async () => {
        return new Client().getRegions();
    }

    getCities = async (regionId: number): Promise<CityArrayResponse> => {
        return new Client().getCities(regionId);
    }

    createNewPatient = async () => {

        await this.getGenders().then(async (response: GenderArrayResponse) => {
            this.setState({ genders: response.data });
        });

        await this.getRegions().then((response: RegionArrayResponse) => {
            this.setState({ regions: response.data });
        });

        await this.getCities(+this.state.regions[0].id!).then((response: CityArrayResponse) => {
            this.setState({ cities: response.data });
        });

        let location = new Location();
        location.region = this.state.regions[0];
        location.city = this.state.cities[0];
        location.country = new Country({ id: 0, name: "", active: true } as ICountry);



        let newPatient = new Patient({
            id: 0,
            firstName: "",
            lastName: "",
            birthDate: new Date(),
            emailAddress: "",
            location: location,
            middleName: "",
            address1: "",
            address2: "",
            title: "",
            suffix: "",
            cellPhone: "",
            homePhone: "",
            gender: this.state.genders[0],
            active: true

        }

        );


        this.setState({ patient: newPatient });

    }

    getPatient = async () => {
        await new Client().getPatient(this.state.id).then(async (value: PatientResponse) => {
            let patient = value.data as Patient;

            await this.getGenders().then(async (data: GenderArrayResponse) => {
                this.setState({ genders: data });
            });

            await this.getRegions().then((data: RegionArrayResponse) => {
                this.setState({ regions: data });
            });

            await this.getCities(patient.location!.region!.id!).then((data: CityArrayResponse) => {
                this.setState({ cities: data });
            });

            if (value.data?.address2 == null) {
                value.data!.address2 = "";
            }


            this.setState({ patient: value.data! });
        }).catch((error) => {
            this.props.parentAlertHandler("error", "Could not load patient data due to: " + error.message)
        });


    }

    hideAlert = () => {
        this.setState({ openAlert: false });
    }

    submitForm = (event: any) => {
        var that = this;

        if (that.formRef.current?.isValid) {

            this.saveButtonRef.current?.click();
        }
        else {

            this.props.parentAlertHandler("error", "Correct errors and try again.");
        }
    }

    cancelEdit = () => {

        var that = this;

        if (that.formRef.current!.dirty) {
            that.setState({ confirmClose: true });
        }
        else {
            that.close();
        }

    }

    close = () => {
        this.props.history.goBack();
    }
    configureCommandBar = () => {

        store.dispatch(setupCommandBar("Patient", this.submitForm, this.cancelEdit));
    }

    updatePatient = async (patient: Patient) => {
        return await new Client().updatePatient(patient);
    }

    addPatient = async (patient: Patient) => {
        return await new Client().addPatient(patient);
    }

    componentDidMount() {

        this.configureCommandBar();

        var params = this.props.match.params as { id: number };
        params.id = params.id === undefined ? 0 : params.id;

        this.setState({ id: params.id as number }, () => {

            if (+this.state.id !== 0) {
                this.getPatient();
            }
            else {
                this.createNewPatient();
            }


        });



    }

    handlePanelChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({ panelValue: newValue });
    };


    handleSubmit = async (
        values: Patient,
        { resetForm, setErrors, setStatus, setSubmitting }: any
    ) => {
        try {

            setSubmitting(true);

            let responseInfo: Response<number>;

            if (values.id !== 0) {
                var response = await this.updatePatient(values);
                responseInfo = response as Response<number>;
            }
            else {
                let addResponse = await this.addPatient(values);;
                responseInfo = addResponse as Response<number>;
            }

            if (responseInfo.status === "success") {
                if (values.id === 0) {
                    values.id = responseInfo.data!;
                }

                this.setState({ patient: values });
                this.setState({ dataChanged: true });

                resetForm();
                this.props.parentAlertHandler("success", "Patient data saved.")
                setStatus({ sent: true });
                setSubmitting(false);
            }
            else {
                this.props.parentAlertHandler("error", responseInfo.message!)
                setStatus({ sent: true });
                setSubmitting(false);
            }

        } catch (error: any) {
            setStatus({ sent: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
            this.props.parentAlertHandler("error", error.message);
        }
    };

    render() {


        const { classes } = this.props;


        return (
            <React.Fragment>
                <Formik
                    enableReinitialize={true}
                    initialValues={this.state.patient}
                    validationSchema={validationSchema}
                    onSubmit={this.handleSubmit}
                    innerRef={this.formRef}
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
                        dirty
                    }) => (
                        <Card mb={6}>
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Grid item md={4}>
                                        <Typography variant="h5" gutterBottom display="inline">
                                            Details
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <form onSubmit={handleSubmit}>
                                    <Grid container spacing={4}>
                                        <Grid item md={4}>
                                            <TextField
                                                name="lastName"
                                                label="Last Name"
                                                value={values.lastName}
                                                error={Boolean(touched.lastName && errors.lastName)}
                                                fullWidth
                                                helperText={touched.lastName && errors.lastName}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"

                                                my={2}
                                            />
                                        </Grid>
                                        <Grid item md={4}>
                                            <TextField
                                                name="firstName"
                                                label="First Name"
                                                value={values.firstName}
                                                error={Boolean(touched.firstName && errors.firstName)}
                                                fullWidth
                                                helperText={touched.firstName && errors.firstName}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                my={2}
                                            />
                                        </Grid>
                                        <Grid item md={4}>
                                            <TextField
                                                name="middleName"
                                                label="Middle Name"
                                                value={values.middleName}
                                                error={Boolean(touched.middleName && errors.middleName)}
                                                fullWidth
                                                helperText={touched.middleName && errors.middleName}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                my={2}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={4}>
                                        <Grid item md={4}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    autoOk
                                                    variant="inline"
                                                    inputVariant="outlined"
                                                    label="Date of Birth"
                                                    format="MM/dd/yyyy"
                                                    value={values.birthDate}
                                                    InputAdornmentProps={{ position: "start" }}
                                                    onChange={date => {
                                                        var patient = this.state.patient;
                                                        patient.birthDate = date!;
                                                        this.setState({ patient: patient });
                                                    }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item md={4}>
                                            <Autocomplete
                                                id="gender"
                                                options={this.state.genders}
                                                getOptionLabel={(gender) => gender?.name!}
                                                disableClearable={true}
                                                style={{ width: 300 }}
                                                autoComplete={false}
                                                onChange={(event: any, newValue: Gender) => {
                                                    var patient = this.state.patient;
                                                    patient.gender = newValue;
                                                    this.setState({ patient: patient });
                                                }}
                                                value={values.gender}
                                                renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={6}>
                                        <Grid item md={6}>
                                            <TextField
                                                name="address1"
                                                label="Address1"
                                                value={values.address1}
                                                error={Boolean(touched.address1 && errors.address1)}
                                                fullWidth
                                                helperText={touched.address1 && errors.address1}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                my={2}
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                name="address2"
                                                label="Address2"
                                                value={values.address2}
                                                error={Boolean(touched.address2 && errors.address2)}
                                                fullWidth
                                                helperText={touched.address2 && errors.address2}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                my={2}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={6}>
                                        <Grid item md={4}>
                                            <Autocomplete
                                                id="region"
                                                options={this.state.regions}
                                                getOptionLabel={(region) => region?.name!}
                                                disableClearable={true}
                                                style={{ width: 300 }}
                                                autoComplete={false}
                                                onChange={(event: any, newValue: Region) => {
                                                    this.getCities(newValue.id!).then((data: CityArrayResponse) => {
                                                        this.setState({ cities: data });
                                                        var patient = this.state.patient;
                                                        patient.location!.region = newValue;
                                                        patient.location!.city = this.state.cities[0];
                                                        this.setState({ patient: patient });
                                                    });
                                                }}
                                                value={values.location?.region as Region}
                                                renderInput={(params) => <TextField {...params} label="Region" variant="outlined" />}
                                            />
                                        </Grid>
                                        <Grid item md={4}>
                                            <Autocomplete
                                                id="city"
                                                options={this.state.cities}
                                                getOptionLabel={(city) => city?.name!}
                                                disableClearable={true}
                                                style={{ width: 300 }}
                                                autoComplete={false}
                                                onChange={(event: any, newValue: City) => {
                                                    var patient = this.state.patient;
                                                    patient.location!.city = newValue;
                                                    this.setState({ patient: patient });
                                                }}
                                                value={values.location?.city as City}
                                                renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={6}>
                                        <Grid item md={6}>
                                            <TextField
                                                name="homePhone"
                                                label="Home Phone"
                                                value={values.homePhone}
                                                error={Boolean(touched.homePhone && errors.homePhone)}
                                                fullWidth
                                                helperText={touched.homePhone && errors.homePhone}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                my={2}
                                                type=""
                                            />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField
                                                name="cellPhone"
                                                label="Cell Phone"
                                                value={values.cellPhone}
                                                error={Boolean(touched.cellPhone && errors.cellPhone)}
                                                fullWidth
                                                helperText={touched.cellPhone && errors.cellPhone}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                variant="outlined"
                                                my={2}

                                            />
                                        </Grid>

                                    </Grid>


                                </form>
                                <Button variant="contained" color="primary" mt={3}>
                                    Save changes
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                </Formik>

                <Card hidden={+this.state.patient.id === 0}>
                    <CardContent>
                        <AppBar position="static" elevation={10}>
                            <Tabs value={this.state.panelValue} onChange={this.handlePanelChange} classes={{ indicator: classes!.indicator! }}>
                                <Tab label="CONTACTS" {...this.a11yProps(0)} disabled={+this.state.patient.id === 0} />
                                <Tab label="VISITS" {...this.a11yProps(1)} disabled={+this.state.patient.id === 0} />
                                <Tab label="SURVEYS" {...this.a11yProps(2)} disabled={+this.state.patient.id === 0} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.panelValue} index={0}>
                            <Grid className={classes!.root!} container spacing={3}>
                                <Grid item className={classes!.root!}>
                                    <ContactsTable patientId={this.state.id} parentAlertHandler={this.props.parentAlertHandler} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.panelValue} index={1}>
                            <Grid className={classes!.root!} container spacing={3}>
                                <Grid item className={classes!.root!}>
                                    <VisitsTable patientId={this.state.id} parentAlertHandler={this.props.parentAlertHandler} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                        <TabPanel value={this.state.panelValue} index={2}>
                            <Grid className={classes!.root!} container spacing={3}>
                                <Grid item className={classes!.root!}>
                                    <SurveysTable patientId={this.state.id} parentAlertHandler={this.props.parentAlertHandler} />
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </CardContent>
                </Card>
            </React.Fragment>



        );
    }
}



const PatientSubForm = withRouter(withStyles(styles)(ParentChildForm));

PatientSubForm.propTypes = {
    classes: PropTypes.object.isRequired,
};



class PatientForm extends Component<RouteComponentProps & StyledComponentProps> {

    state = { openAlert: false, alertMessage: "", alertSeverity: "success" as any };


    showAlert = (alertSeverity: any, alertMessage: string) => {
        this.setState({ openAlert: true, alertMessage: alertMessage, alertSeverity: alertSeverity as any });
    };


    render() {

        const { classes } = this.props;
        return (
            <React.Fragment>
                <Helmet title="Patient" />

                <Collapse in={this.state.openAlert}>
                    <Grid container spacing={8} className={classes!.root!} >
                        <Grid item md={12} className={classes!.root!} >

                            <Alert variant="filled" severity={this.state.alertSeverity}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={(e) => {
                                            this.setState({ openAlert: false });
                                            e.preventDefault();
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {this.state.alertMessage}
                            </Alert>
                        </Grid>
                    </Grid>
                </Collapse>

                <Typography variant="h3" gutterBottom display="inline">
                    Patient
                </Typography>

                <Divider my={3} />

                <ParentChildForm {...this.props} parentAlertHandler={this.showAlert} />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(withRouter(PatientForm));

