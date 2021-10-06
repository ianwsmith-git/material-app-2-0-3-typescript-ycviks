import { Button, Collapse, Grid, IconButton, makeStyles, Divider as MuiDivider, Theme, Typography } from '@material-ui/core';
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import React from 'react';
import styled from 'styled-components/macro';

import { AddressType, City, PersonAddress, PersonAddressListResponse, Region } from '../../api/DiaRegApi';
import BasicTable, { Column } from '../Tables/BasicTable';
import { DiaRegWebApiClient as Client, Location, PersonAddressResponse, Response } from './../../api/DiaRegApi';
import shadows from './../../theme/shadows';
import LocationEditor from './LocationEditor';

const Divider = styled(MuiDivider)(spacing);

function buildColumns(): Array<Column> {

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
const useStyles = makeStyles((theme: Theme) =>
(
    {
        root: {
            flexGrow: 1,
        },
    }
));

function createNewPersonAddress(personId: number): PersonAddress {
    let newPersonAddress = new PersonAddress();
    newPersonAddress.active = true;
    newPersonAddress.location = new Location();
    newPersonAddress.location.city = new City({ id: 0, name: "", active: true, regionId: 0 })
    newPersonAddress.location.region = new Region({ id: 0, name: "", active: true, countryId: 0 })
    newPersonAddress.personId = personId;
    newPersonAddress.id = 0;
    newPersonAddress.type = new AddressType();
    newPersonAddress.type.id = 0;
    return newPersonAddress
}

type LocationsEditorPropsType = {
    personId: number
}
export default function Locations(props: LocationsEditorPropsType) {
    const [showingEditor, setShowingEditor] = React.useState(false);
    const [showEditor, setShowEditor] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<PersonAddress>(new PersonAddress());
    const [addresses, setAddresses] = React.useState<Array<PersonAddress>>(new Array<PersonAddress>());
    const [selectedAddressId, setSelectedAddressId] = React.useState<number>(0);
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");
    const [alertSeverity, setAlertSeverity] = React.useState<any>("success");
    const [loading, setLoading] = React.useState<boolean>(true);
    const [deleting, setDeleting] = React.useState<boolean>(false);
    const [count, setCount] = React.useState<number>(0);

    const classes = useStyles();

    function onDataChange(dataChanged: boolean) {
        if (dataChanged) {

            setCount(count => count + 1);
        }

        setShowEditor(false);

    }

    React.useEffect(() => {
        let active = true;

        if (showingEditor) {

            if (selectedAddressId != 0) {
                (async () => {
                    await getAddress(selectedAddressId).then((value: PersonAddressResponse) => {
                        if (value.status == "success") {
                            let data = value.data!;
                            setSelectedAddress(data);
                            setShowEditor(true);
                        }
                        else {
                            showAlert(value.status, value.message!);
                        }
                    }
                    ).catch((error) => {
                        showAlert("error", "An expected error has occurred: " + error.message!);
                    });




                })();
            }


            setShowingEditor(false);
        }

        return () => {
            active = false;
        };
    }, [showEditor, selectedAddressId]);

    React.useEffect(() => {
        let active = true;

        if (loading) {
            (async () => {


                await getAddresses(props.personId).then((value: PersonAddressListResponse) => {
                    if (value.status == "success") {
                        let data = value.data!;
                        setAddresses(data);
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

    React.useEffect(() => {
        let active = true;

        if (deleting) {
            (async () => {

                await deleteAddress(selectedAddressId).then((value: Response) => {
                    if (value.status == "success") {
                        setLoading(true);
                    }
                    else {
                        showAlert(value.status, value.message!);
                    }
                }
                ).catch((error) => {
                    showAlert("error", "An expected error has occurred: " + error.message!);
                });

                setDeleting(false);

            })();
        }

        return () => {
            active = false;
        };
    }, [deleting]);

    async function getAddress(id: number) {
        return await new Client().getDoctorLocation(id);
    }

    async function getAddresses(id: number) {
        return await new Client().getDoctorLocations(id);
    }

    async function deleteAddress(id: number) {
        return await new Client().deleteDoctorLocation(id);
    }

    function onDeleteAddress(index: number) {
        setSelectedAddressId(addresses[index].id);
        setDeleting(true);
    }

    function showAlert(alertSeverity: any, alertMessage: string) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    };

    function showAddress(index: number) {
        setSelectedAddress(addresses[index]);
        setShowEditor(true);
    }

    function showNewAddress() {

        var personAddress = createNewPersonAddress(props.personId);

        setSelectedAddress(personAddress);
        setShowEditor(true);

    }


    return (
        <React.Fragment>

            <Grid justify="space-between" container spacing={10}>
                <Grid item>
                    <Typography variant="h6" gutterBottom display="inline">
                        Locations
                    </Typography>
                </Grid>
                <Grid item>
                    <div>
                        <Button variant="contained" color="primary" onClick={() => { showNewAddress(); }}>
                            <AddIcon />
                            New Location
                        </Button>


                    </div>
                </Grid>
            </Grid>

            <Divider my={3} />
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
            <BasicTable columns={buildColumns()} data={addresses} allowEdit={true} allowDelete={true} viewItemHandler={showAddress} deleteHandler={onDeleteAddress} />

            {
                showEditor ?
                    <LocationEditor open={showEditor} personId={props.personId} address={selectedAddress} onClose={onDataChange} />
                    :
                    null
            }
        </React.Fragment >
    );
}