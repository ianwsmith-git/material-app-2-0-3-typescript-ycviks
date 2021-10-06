import { Backdrop, CardActions, CardContent, Checkbox, CircularProgress, Collapse, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, makeStyles, Button as MuiButton, Card as MuiCard, Divider as MuiDivider, Paper as MuiPaper, TextField as MuiTextField, Theme, Typography } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { Alert, Autocomplete } from '@material-ui/lab';
import { spacing, SpacingProps } from '@material-ui/system';
import { Field, Formik } from 'formik';
import { CheckboxWithLabel } from "formik-material-ui";
import React from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components/macro';
import * as Yup from 'yup';

import { DiaRegWebApiClient as Client, Gender, GenderArrayResponse, Person, PersonResponse, PersonRole } from '../../api/DiaRegApi';
import DeleteButtonDialog from '../../components/dialogs/DeleteButtonDialog';
import NotificationDialog from '../../components/dialogs/NotificationDialog';
import Locations from '../../components/location/Locations';
import Response from './../../models/Response';

const Divider = styled(MuiDivider)(spacing);

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

interface ButtonPropstype extends SpacingProps {
  component?: string;
}
const Button = styled(MuiButton)<ButtonPropstype>(spacing);

const Paper = styled(MuiPaper)(spacing);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(3, 2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('The First Name field is required.'),
  lastName: Yup.string().required('The Last Name field is required.'),
  //gender: Yup.string().required('The Gender field is required.'),
  emailAddress: Yup.string().email("Invalid Email Address format.").required('The Email Address field is required.'),
});

type DoctorEditorPropsType = {
  doctorId: number;
}

export default function DoctorEditor(props: RouteComponentProps & DoctorEditorPropsType) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [dataChanged, setDataChanged] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [alertMessage, setAlertMessage] = React.useState<string>("");
  const [alertSeverity, setAlertSeverity] = React.useState<any>("success");
  const [doctor, setDoctor] = React.useState<Person>();
  const [genders, setGenders] = React.useState<Array<Gender>>([] as Array<Gender>);
  const [deleted, setDeleted] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteReponse, setDeletedResponse] = React.useState(new Response<number>());
  const classes = useStyles();

  React.useEffect(() => {
    let active = true;
    var doctor: Person;

    if (loading) {
      (async () => {

        var params = props.match.params as { id: number };
        params.id = params.id === undefined ? 0 : params.id;

        await getGenders().then(async (data: GenderArrayResponse) => {
          setGenders(data.data!);
        });


        if (params.id != 0) {
          await getDoctor(params.id).then((value: PersonResponse) => {
            if (value.status == "success") {
              let data = value.data!;
              setDoctor(data);
              doctor = data;
            }
            else {

              showAlert(value.status, value.message!);
              //---Handle Error

            }
          }).catch((error) => {
            showAlert("error", "An expected error has occurred: " + error.message!);
          });
        }
        else {
          await newDoctor().then((value: PersonResponse) => {
            if (value.status == "success") {
              let data = value.data!;
              data.firstName = "";
              data.lastName = "";
              data.emailAddress = "";
              data.middleName = "";

              setDoctor(data);
              doctor = data;
            }
            else {

              showAlert(value.status, value.message!);
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
  }, [loading, props.match.params]);


  React.useEffect(() => {
    let active = true;

    if (deleting) {
      (async () => {


        try {
          var response = await deleteDoctor() as Response<number>;

          if (response.status == "success") {
            setDeleted(true);
            setDeletedResponse(response);
          }
          else {
            showAlert(response.status, response.message!);
          }
        }
        catch (error: any) {
          showAlert("error", "An expected error has occurred: " + error.message!);
        }

        setDeleting(false);

      })();
    }

    return () => {
      active = false;
    };
  }, [deleting]);

  async function getDoctor(id: number) {
    return await new Client().getDoctor(id);
  }

  async function updateDoctor(doctor: Person) {
    return await new Client().updateDoctor(doctor);
  }

  async function addDoctor(doctor: Person) {
    return await new Client().addDoctor(doctor);
  }

  async function deleteDoctor() {
    return await new Client().deleteDoctor(doctor?.id);

  }

  async function newDoctor() {
    return await new Client().newDoctor();

  }

  async function getGenders() {
    return new Client().getGenders();
  }


  function showAlert(alertSeverity: any, alertMessage: string) {
    setAlertMessage(alertMessage);
    setAlertSeverity(alertSeverity);
    setOpenAlert(true);
  };

  async function onSumbit(
    values: Person,
    { resetForm, setErrors, setStatus, setSubmitting }: any
  ) {

    try {

      setSubmitting(true);
      let responseInfo: Response<number>;

      if (values.id !== 0) {
        responseInfo = await updateDoctor(values) as Response<number>;
      }
      else {
        responseInfo = await addDoctor(values) as Response<number>;
      }

      if (responseInfo.status === "success") {

        if (values.id === 0) {
          values.id = responseInfo.data!;


        }

        setDoctor(values);
        setDataChanged(true);

        resetForm();
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


  function DoctorLocations() {
    return (
      <Card mb={6}>
        <CardContent>
          <Locations personId={doctor?.id!} />
        </CardContent>
      </Card>
    );
  }

  function DoctorInfo() {
    return (
      <div>

        <Formik
          enableReinitialize={true}
          initialValues={doctor!}
          validationSchema={validationSchema}
          onSubmit={onSumbit}
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
            setFieldTouched
          }) => (


            <div>
              <Backdrop className={classes.backdrop} open={isSubmitting}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <form onSubmit={handleSubmit}>

                <Card mb={6}>
                  <CardContent>
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Personal Info
                      </Typography>
                      <Grid container spacing={6}>
                        <Grid item md={4}>
                          <TextField id="firstName"
                            label="First name"
                            variant="outlined"
                            value={values.firstName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(touched.firstName && errors.firstName)}
                            my={2}
                            required
                          />
                        </Grid>
                        <Grid item md={4}>
                          <TextField
                            id="lastName"
                            label="Last name"
                            variant="outlined"
                            value={values.lastName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            my={2}
                            required
                            error={Boolean(touched.lastName && errors.lastName)}
                          />
                        </Grid>
                        <Grid item md={4}>
                          <TextField
                            id="middleName"
                            label="Middle name"
                            variant="outlined"
                            value={values.middleName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            my={2}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={6}>
                        <Grid item md={4}>
                          <Autocomplete
                            id="gender"
                            options={genders}
                            getOptionLabel={(gender) => gender?.name!}
                            disableClearable={true}
                            style={{ width: 300 }}
                            autoComplete={false}
                            onChange={(event: any, newValue: Gender) => {

                              doctor!.gender = newValue;
                              setDoctor(doctor);
                            }}
                            value={values.gender}
                            renderInput={(params) => <TextField {...params} required name="gender-field" label="Gender" variant="outlined" />}
                            getOptionSelected={(option, value) => option.id === value.id}
                          />
                        </Grid>
                        <Grid item md={8}>
                          <TextField
                            id="emailAddress"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={values.emailAddress}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            fullWidth
                            my={2}
                            required
                            error={Boolean(touched.emailAddress && errors.emailAddress)}
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={6}>
                        <Grid item md={4}>
                          <FormControlLabel
                            control={<Checkbox checked={values.active} onChange={handleChange} value={values.active}
                              name="active" />}
                            color="primary"
                            label="Active"
                          />
                        </Grid>
                        <Grid item md={8}>

                        </Grid>
                      </Grid>
                    </div>
                    <Divider my={3} />
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Medical Specialities
                      </Typography>
                      <Paper mt={3}>
                        <FormControl required error={values.roles?.filter(x => x.active).length === 0} component="fieldset">
                          <FormLabel component="legend">Assign responsibility</FormLabel>
                          <FormGroup row>
                            {doctor?.roles!.map((role: PersonRole) => {
                              return <Field
                                type="checkbox" component={CheckboxWithLabel} checked={values.roles?.find(x => x.id == role.id)?.active} onBlur={handleBlur} onChange={(event: any, value: any) => {
                                  var roles = values.roles!
                                  var role = roles.find(x => x.id == +event.target.value) as PersonRole;
                                  role.active = !role.active;
                                  setFieldValue("roles", roles);
                                  setFieldTouched("roles", true, true);
                                  setFieldValue(role.id.toString(), role.active);
                                }} value={role.id}
                                label={role.name}
                                name="numbers"
                                key={role.id}
                                id={role.id}
                                Label={{ label: role.name }}
                              />

                            })}
                          </FormGroup>
                        </FormControl>
                      </Paper>
                    </div>
                    <Divider my={3} />
                    <Button type="submit" disabled={isSubmitting || !isValid || !dirty} variant="contained" color="primary" mt={3}>
                      Save changes
                    </Button>
                  </CardContent>
                </Card>
              </form>


            </div>
          )}

        </Formik>

      </div>
    );
  }

  return (
    <React.Fragment>
      <Helmet title="Doctor" />

      <Typography variant="h3" gutterBottom display="inline">
        Doctor
      </Typography>

      <Collapse in={openAlert}>
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
      </Collapse>

      {loading ?
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        :

        <div>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <DoctorInfo />

              {doctor?.id != 0 ?
                <DoctorLocations />
                :
                null
              }
            </Grid>
            <Grid item xs={4}>

              {doctor?.id != 0 ?
                <Card mb={8} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Delete Doctor
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography gutterBottom>
                          Deleting a doctor will not remove them from the system if they have already treated patients or conducted any type of medical assessments with patients.
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <DeleteButtonDialog buttonText="Delete Doctor"
                      prompt={true}
                      hidden={false}
                      message={"You are choosing to remove a doctor from the system.  This action cannot be undone.  Click Cancel to abort or OK to continue with the Delete."}
                      title={"Delete Doctor?"}
                      deleteDialogHandler={() => { setDeleting(true) }} />


                  </CardActions>
                </Card>
                :
                null
              }
            </Grid>
          </Grid>


        </div>
      }

      {deleted ?
        <NotificationDialog open={deleted} title={"Delete Doctor"} message={deleteReponse.message!} onClose={() => { props.history.goBack() }} />
        :
        null
      }

    </React.Fragment>

  );
}