import { Card, CardContent, CircularProgress, Collapse, createStyles, Grid, IconButton, TextField as MuiTextField, StyledComponentProps, Theme, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons';
import { Autocomplete, Alert as MuiAlert } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import * as Yup from 'yup';

import { City, DiaRegWebApiClient as Client, Contact, ContactType, Country, ICountry, Location, Region } from '../../../api/DiaRegApi';
import CloseDialogButton from '../../../components/dialogs/CloseDialogButton';
import Response from '../../../models/Response';

const Alert = styled(MuiAlert)(spacing);
const TextField = styled(MuiTextField)<{ my?: number }>(spacing);



const moreStyles = (theme: Theme) => createStyles(
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
    });

type ContactPropsType = {
    contactId: number;
    patientId: number;
    parentAlertHandler: Function;
    onClose: (refreshRequired: boolean) => any;
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('The first name field is required.'),
    lastName: Yup.string().required('The last name field is required.'),
    cellPhone: Yup.string().required('This field is required.'),
    homePhone: Yup.string().required('This field is required.'),
    otherContact: Yup.string().when('this.state.contact.contactTypeId', { is: 0, then: Yup.string().required('This field is required.') })
});

class ContactBaseDialog extends React.Component<ContactPropsType & StyledComponentProps>{
    // #region Properties (15)

    saveButtonRef: React.RefObject<HTMLButtonElement>;
    cancelButtonRef: React.RefObject<HTMLButtonElement>;

    constructor(props: ContactPropsType & StyledComponentProps) {
        super(props);

        this.saveButtonRef = React.createRef();
        this.cancelButtonRef = React.createRef();
    }


    public addContact = async (contact: Contact) => {
        contact.patientId = this.props.patientId;
        return await new Client().addContact(contact)
    }

    public componentDidMount = async () => {
        this.createNewContact();
    }

    public createNewContact = async () => {
        let newContact = new Contact();
        newContact.id = 0;
        newContact.patientId = this.props.patientId;
        newContact.contactTypeId = 0;

        await this.getRegions();
        await this.getCities(this.state.regions[0].id!);
        await this.getContactTypes();

        newContact.location = this.getLocation(this.state.regions[0], this.state.cities[0])
        newContact.contactType = this.state.ContactTypes[0];
        newContact.contactTypeId = newContact.contactType.id;
        this.setState({ contact: newContact });
    }

    public getCities = async (regionId: number) => {
        return await new Client().getCities(regionId).then((value) => {
            this.setState({ cities: value.data });
        });
    }

    public getContact = async () => {
        try {
            if (this.state.contactId !== 0) {
                await new Client().getContact(this.props.contactId).then(async (value) => {
                    if (value.status === "success") {
                        let data = value.data! as Contact;
                        data.address2 = data.address2 ?? "";
                        data.otherContact = data.otherContact ?? "";

                        await this.getRegions();
                        await this.getCities(this.state.regions[0].id!);
                        await this.getContactTypes();
                        data.location = this.getLocation(this.state.regions[0], this.state.cities[0])
                        data.contactType = this.state.ContactTypes[0];

                        this.setState({ open: true, contact: data });
                    }
                    else {
                        this.showParentAlert("error", value.message!);
                    }

                });
            }
            else {
                this.createNewContact();
                this.setState({ open: true });
            }
        }
        catch (error) {
            this.showParentAlert("error", "An expected error has occurred: " + error.message!);
        }
    }

    public getContactTypes = async () => {
        await new Client().getPatientContactTypes().then((value) => {
            let data = value.data!;
            this.setState({ ContactTypes: data });
        });
    }

    public getRegions = async () => {
        return await new Client().getRegions().then((value) => {
            this.setState({ regions: value.data });
        });
    }

    public handleClickOpen = () => {
        this.getContactTypes().then(() => {
            this.getContact();
        })

    };

    public handleClose = () => {
        if (this.props.onClose !== undefined) {
            this.props.onClose(this.state.dataChanged);
        }

        this.hideAlert();
        this.setState({ open: false });
    };

    public handleDateChange = (date: Date | null) => {
        return date;

    };

    public handleSaveClicked = () => {
        this.saveButtonRef.current?.click();
    }

    public handleSubmit = async (
        values: Contact,
        { resetForm, setErrors, setStatus, setSubmitting }: any
    ) => {
        try {
            setSubmitting(true);

            let responseInfo: Response<number>;

            if (values.id !== 0) {
                var response = await this.updateContact(values);
                responseInfo = response as Response<number>;
            }
            else {
                var addResponse = await this.addContact(values);
                responseInfo = addResponse as Response<number>;
            }

            if (responseInfo.status === "success") {
                if (values.id === 0) {
                    values.id = responseInfo.data!;
                }

                this.setState({ contact: values });
                this.setState({ dataChanged: true });

                resetForm();
                this.showAlert("success", "Your changes have been saved.");
                setStatus({ sent: true });
                setSubmitting(false);
            }
            else {
                this.showAlert("error", responseInfo.message!);
                setStatus({ sent: true });
                setSubmitting(false);
            }

        } catch (error) {
            this.showAlert("error", error.message);
            setStatus({ sent: false });
            setErrors({ submit: error.message });
            setSubmitting(false);
        }
    };

    public showParentAlert = (alertSeverity: any, alertMessage: string) => {
        this.props.parentAlertHandler(alertSeverity, alertMessage);
    }

    public state = {
        open: false, contactId: this.props.contactId, contact: new Contact(), ContactTypes: [] as Array<ContactType>, openAlert: false, alertMessage: "", alertSeverity: "success" as any,
        regions: [] as Array<Region>, cities: [] as Array<City>, dataChanged: false
    }

    public updateContact = async (contact: Contact) => {
        return await new Client().updateContact(contact);
    }

    public getLocation(region: Region, city: City): Location {
        let contact = this.state.contact;
        let location = contact.location ?? new Location();
        location.city = city;
        location.region = region;
        location.country = new Country({ id: this.state.regions[0].countryId, name: "", active: false } as ICountry);

        return location;
    }

    public hideAlert() {
        this.setState({ openAlert: false });
    }

    public showAlert(alertSeverity: any, alertMessage: string) {
        this.setState({ openAlert: true, alertMessage: alertMessage, alertSeverity: alertSeverity as any });
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                {this.state.contactId === 0 ?
                    <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                        New Contact
                    </Button>
                    :
                    <IconButton aria-label="edit" onClick={this.handleClickOpen}>
                        <EditIcon />
                    </IconButton>
                }

                {
                    this.state.open === true ?
                        <Formik
                            enableReinitialize={true}
                            initialValues={this.state.contact}
                            validationSchema={validationSchema}
                            onSubmit={this.handleSubmit}
                            name="contactForm"

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
                                dirty,
                                isValid
                            }) => (
                                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                                    disableEscapeKeyDown >
                                    <DialogTitle id="form-dialog-title">Patient Contact</DialogTitle>
                                    <DialogContent dividers className={classes!.root} >

                                        <Collapse in={this.state.openAlert}>
                                            <Grid container spacing={8} className={classes!.root} >
                                                <Grid item md={12} className={classes!.root} >

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
                                        </ Collapse>

                                        <DialogContentText>
                                        </DialogContentText>

                                        <Card>
                                            <CardContent>
                                                <form onSubmit={handleSubmit}>
                                                    <Grid container spacing={4} className={classes!.root}>
                                                        <Grid item md={4}>
                                                            <Autocomplete
                                                                id="contactType"
                                                                options={this.state.ContactTypes}
                                                                getOptionLabel={(contactType) => contactType?.name!}
                                                                getOptionSelected={(option, value) => option.id === value.id}
                                                                disableClearable={true}
                                                                autoComplete={false}
                                                                onChange={(event: any, newValue: ContactType) => {
                                                                    var contact = this.state.contact;
                                                                    contact.contactType = newValue;
                                                                    contact.contactTypeId = newValue.id!
                                                                    this.setState({ contact: contact });

                                                                }}
                                                                value={values.contactType}
                                                                renderInput={(params) => <TextField {...params} label="Contact Type" variant="outlined" />}
                                                            />
                                                        </Grid>
                                                        <Grid item md={4}>
                                                            <TextField
                                                                name="otherContact"
                                                                label="Other Contact"
                                                                value={values.otherContact || ""}
                                                                error={Boolean(touched.otherContact && errors.otherContact)}
                                                                fullWidth
                                                                helperText={touched.otherContact && errors.otherContact}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                disabled={this.state.contact.contactType?.id !== 0}
                                                                required={this.state.contact.contactType?.id === 0}
                                                                my={2}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={4} className={classes!.root}>
                                                        <Grid item md={4}>
                                                            <TextField
                                                                name="lastName"
                                                                label="Last Name"
                                                                value={values.lastName || ""}
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
                                                                value={values.firstName || ""}
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
                                                                value={values.middleName || ""}
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
                                                    <Grid container spacing={6} className={classes!.root}>
                                                        <Grid item md={6}>
                                                            <TextField
                                                                name="address1"
                                                                label="Address1"
                                                                value={values.address1 || ""}
                                                                error={Boolean(touched.address1 && errors.address1)}
                                                                fullWidth
                                                                helperText={touched.address1 && errors.address1}
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                variant="outlined"
                                                                my={2}
                                                            />
                                                        </Grid>
                                                        <Grid item md={6} className={classes!.root}>
                                                            <TextField
                                                                name="address2"
                                                                label="Address2"
                                                                value={values.address2 || ""}
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

                                                    <Grid container spacing={6} className={classes!.root}>
                                                        <Grid item md={4}>
                                                            <Autocomplete
                                                                id="region"
                                                                options={this.state.regions}
                                                                getOptionLabel={(region) => region?.name!}
                                                                disableClearable={true}
                                                                autoComplete={false}
                                                                fullWidth
                                                                onChange={async (event: any, newValue: Region) => {
                                                                    await this.getCities(newValue.id!).then(async () => {
                                                                        this.state.contact.location = await this.getLocation(newValue, this.state.cities[0]);
                                                                        this.setState({ contact: this.state.contact })
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
                                                                autoComplete={false}
                                                                fullWidth
                                                                onChange={(event: any, newValue: City) => {
                                                                    var contact = this.state.contact;
                                                                    contact.location!.city = newValue;
                                                                    this.setState({ contact: contact });
                                                                }}
                                                                value={values.location?.city as City}
                                                                renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={6} className={classes!.root}>
                                                        <Grid item md={6}>
                                                            <TextField
                                                                name="homePhone"
                                                                label="Home Phone"
                                                                value={values.homePhone || ""}
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
                                                        <Grid item md={6} className={classes!.root}>
                                                            <TextField
                                                                name="cellPhone"
                                                                label="Cell Phone"
                                                                value={values.cellPhone || ""}
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
                                                    <Button type="submit" ref={this.saveButtonRef} hidden={true} />
                                                    <Button ref={this.cancelButtonRef} hidden={true} />

                                                </form>

                                            </CardContent>
                                        </Card>


                                    </DialogContent>
                                    <DialogActions>
                                        <CloseDialogButton buttonText={dirty ? "Cancel" : "Close"} prompt={dirty} closeDialogHandler={this.handleClose} />
                                        <div className={classes!.wrapper}>
                                            <Button onClick={this.handleSaveClicked} variant="outlined" color="primary" disabled={isSubmitting || !isValid || !dirty}>
                                                Save
                                            </Button>
                                            {isSubmitting && <CircularProgress size={24} className={classes!.buttonProgress} />}
                                        </div>
                                    </DialogActions>
                                </Dialog >
                            )
                            }
                        </Formik>
                        :
                        null
                }
            </div >

        );
    }
}

const VisitDialog = withStyles(moreStyles)(ContactBaseDialog);

VisitDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(moreStyles)(ContactBaseDialog)
