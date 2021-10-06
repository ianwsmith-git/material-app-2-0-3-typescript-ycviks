import { Backdrop, Checkbox, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, InputLabel, makeStyles, MenuItem, Button as MuiButton, FormControl as MuiFormControl, Select as MuiSelect, TextField as MuiTextField, Theme, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Spacing } from '@material-ui/core/styles/createSpacing';
import { Close as CloseIcon, ErrorSharp } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { spacing, SpacingProps } from '@material-ui/system';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components/macro';
import * as Yup from 'yup';

import { AddressType, AddressTypeListResponse, City, DiaRegWebApiClient as Client, Location, LocationResponse, PersonAddress } from '../../api/DiaRegApi';
import CloseDialogButton from '../dialogs/CloseDialogButton';
import Response from './../../models/Response';

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);


const Button = styled(MuiButton)(spacing);

interface SelectMuiType extends SpacingProps {
    mt?: number;
}

const Select = styled(MuiSelect)<SelectMuiType>(spacing);

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
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            width: '100%'
        },
    }),
);

const validationSchema = Yup.object().shape({
    name: Yup.string().required('The Name field is required.'),
    address1: Yup.string().required('The Address 1 field is required.'),
    "type": Yup.object().shape({ id: Yup.number().moreThan(0) }),
    "phoneNumber": Yup.string().required('This Phone Number field is required.'),
    "location": Yup.object().shape({
        city: Yup.object().shape({
            id: Yup.number().moreThan(0)
        })
    })

});

type LocationEditorPropType = {
    address: PersonAddress;
    personId: number;
    onClose: (refreshRequired: boolean) => any;
    open: boolean;
}

export default function LocationEditor(props: LocationEditorPropType) {
    const [personAddress, setPersonAddress] = React.useState<PersonAddress>(props.address);
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(true);
    const [options, setOptions] = React.useState<City[]>([]);
    const [selectedLocation, setSelectedLocation] = React.useState<Location>(props.address.location);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [dataChanged, setDataChanged] = React.useState<boolean>(false);
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");
    const [alertSeverity, setAlertSeverity] = React.useState<any>("success");
    const [addressTypes, setAddressTypes] = React.useState<AddressType[]>([]);


    const saveButtonRef: React.RefObject<HTMLButtonElement> = React.createRef();
    const cancelButtonRef: React.RefObject<HTMLButtonElement> = React.createRef();
    const classes = useStyles();


    const onChangeHandle = async (value: string) => {

        try {
            // use the changed value to make request and then use the result. Which
            console.log(value);
            const response = await new Client().searchLocationByCityName(value);
            if (response.status == "success") {
                const cities = await response.data!;
                setOptions(cities);
            }
            else {
                console.log(response.message!);
            }

        }
        catch (error: any) {
            console.log(error.message!);
        }
    };

    const onLocationSelectionChanged = async (city: City): Promise<LocationResponse> => {
        return await new Client().getLocationByCityId(city.id);
    }



    function showAlert(alertSeverity: any, alertMessage: string) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    };

    async function getAddressTypes() {
        return await new Client().getAddressTypes();
    }

    React.useEffect(() => {
        let active = true;

        if (loading) {
            (async () => {
                await getAddressTypes().then((value: AddressTypeListResponse) => {
                    if (value.status == "success") {
                        let data = value.data!;
                        setAddressTypes(data);
                    }
                    else {
                        showAlert(value.status, value.message!);
                    }
                }
                ).catch((error) => {
                    showAlert("error", "An expected error has occurred: " + error.message!);
                });

                setLoading(false);

            })();
        }

        return () => {
            active = false;
        };


    }, [loading]);

    function handleCancelClose() {
        setOpenAlert(false);
        props.onClose(dataChanged);
    };

    function handleSave() {
    };

    function handleShow() {
        setLoading(true);
    };
    async function addLocation(address: PersonAddress) {
        return await new Client().addDoctorLocation(address)
    }

    async function updateLocation(address: PersonAddress) {
        return await new Client().updateDoctorLocation(address)
    }

    async function onSumbit(
        values: PersonAddress,
        { resetForm, setErrors, setStatus, setSubmitting, touched }: any
    ) {
        try {


            //values.location = selectedLocation!;
            //.values.type = personAddress.type;

            setSubmitting(true);
            let responseInfo: Response<number>;

            if (values.id !== 0) {
                responseInfo = await updateLocation(values) as Response<number>;
            }
            else {
                responseInfo = await addLocation(values) as Response<number>;
            }

            if (responseInfo.status === "success") {



                if (values.id === 0) {
                    values.id = responseInfo.data!;
                }

                setDataChanged(true);

                resetForm({ values });

                showAlert("success", "Your changes have been saved.");
                setStatus({ sent: true });
                setSubmitting(false);
            }
            else {
                showAlert("error", responseInfo.message!);
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

        <div>

            {

                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    :
                    <Formik
                        enableReinitialize={true}
                        initialValues={props.address}
                        validationSchema={validationSchema}
                        onSubmit={onSumbit}
                        name="locationForm"

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
                                <Dialog open={props.open} onClose={handleCancelClose} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                                    disableEscapeKeyDown fullWidth={true} >
                                    <DialogTitle id="form-dialog-title">  <Typography variant="h3" gutterBottom display="inline" color="textPrimary">
                                        Location
                                    </Typography> </DialogTitle>
                                    <DialogContent dividers>
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
                                        <form onSubmit={handleSubmit}>

                                            <Grid container spacing={6}>
                                                <Grid item md={6}>
                                                    <TextField
                                                        id="name"
                                                        label="Name"
                                                        variant="outlined"
                                                        fullWidth
                                                        my={2}
                                                        required
                                                        value={values.name}
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        error={Boolean(touched.name && errors.name)}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>

                                                    <InputLabel id="address-type-label">Address Type</InputLabel>
                                                    <Select
                                                        labelId="address-type-label"
                                                        variant="outlined"
                                                        name="address-type"
                                                        fullWidth
                                                        required
                                                        onBlur={handleBlur}
                                                        onChange={(event: any) => {
                                                            var type = values.type;
                                                            type.id = +event.target.value;
                                                            type.active = true;
                                                            setFieldValue("type", type);
                                                        }}
                                                        id="address-type"
                                                        label="Address Type"
                                                        value={values.type.id! == 0 ? "" : values.type.id!}
                                                        defaultValue=""
                                                    >
                                                        {addressTypes.map((item, index) => {
                                                            return (<MenuItem key={item.id} value={item.id} >{item.name}</MenuItem>)
                                                        })}
                                                    </Select>

                                                </Grid>
                                            </Grid>
                                            <TextField
                                                id="phoneNumber"
                                                label="Phone Number"
                                                variant="outlined"
                                                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                                required
                                                fullWidth
                                                my={2}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phoneNumber}
                                            />
                                            <TextField
                                                id="address1"
                                                label="Address"
                                                variant="outlined"
                                                error={Boolean(touched.address1 && errors.address1)}
                                                required
                                                fullWidth
                                                my={2}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address1}
                                            />

                                            <TextField
                                                id="address2"
                                                label="Apartment, suite, studio, or floor"
                                                variant="outlined"
                                                fullWidth
                                                my={2}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address2}
                                            />

                                            <Grid container spacing={6}>
                                                <Grid item md={6}>
                                                    <Autocomplete
                                                        id="city"

                                                        onOpen={handleBlur}

                                                        onChange={(event: any, newValue: any) => {
                                                            onLocationSelectionChanged(newValue as City).then((value: LocationResponse) => {
                                                                setFieldValue("location", value.data);
                                                            }
                                                            ).
                                                                catch((error: any) => {
                                                                    showAlert("Error", error.message);
                                                                }
                                                                );
                                                        }}
                                                        getOptionSelected={(option, value) => {
                                                            return option.id === value.id
                                                        }
                                                        }
                                                        getOptionLabel={option => option.name!}
                                                        options={options}
                                                        loading={loading}
                                                        fullWidth
                                                        value={values.location.city}
                                                        renderInput={params => (
                                                            <TextField
                                                                {...params}
                                                                label="City (start type the name of the city)"
                                                                variant="outlined"
                                                                name="value.location.city"
                                                                onChange={ev => {
                                                                    if (ev.target.value !== "" || ev.target.value !== null) {
                                                                        onChangeHandle(ev.target.value);
                                                                    }
                                                                }}
                                                                required
                                                                value={values.location.city.name == null ? "" : values.location.city.name}
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
                                                <Grid item md={4}>
                                                    <TextField
                                                        id="state"
                                                        label="Region"
                                                        variant="outlined"
                                                        fullWidth
                                                        my={2}
                                                        value={values.location.region != null ? values.location.region.name : ""}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item md={2}>
                                                    <TextField
                                                        id="zip"
                                                        label="Zip"
                                                        variant="outlined"
                                                        fullWidth
                                                        my={2}
                                                        hidden={true}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={6}>
                                                <Grid item md={2}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={values.active}
                                                                value={values.active}
                                                            />
                                                        }
                                                        label="Active"
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Button type="submit" ref={saveButtonRef} hidden={true} />
                                            <Button ref={cancelButtonRef} hidden={true} />

                                        </form>

                                    </DialogContent>
                                    <DialogActions>
                                        <CloseDialogButton hidden={false} buttonText={dirty ? "Cancel" : "Close"} prompt={dirty} closeDialogHandler={handleCancelClose} />
                                        <Button onClick={() => {
                                            saveButtonRef.current?.click()
                                        }} disabled={isSubmitting || !isValid || !dirty} variant="outlined" color="primary">
                                            Save
                                        </Button>
                                    </DialogActions>
                                </Dialog >
                            </div>
                        )
                        }
                    </Formik >

            }
        </div >

    );
}