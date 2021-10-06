import { CardHeader, createStyles, Divider, List, ListItem, ListItemAvatar, ListItemText, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { StyledComponentProps, withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Users } from 'react-feather';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

// import withAuthProvider, { hideCommandBar } from '../auth/AuthProvider';
import { hideCommandBar } from '../redux/reducers/commandBarReducer';
import store from "../redux/store"

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});


interface WelcomeState {
    isOpen: boolean;
}



class Default extends Component<StyledComponentProps, WelcomeState> {

    /*     commandBar : JSX.Element;
    
        constructor(props : any){
            super(props)
    
           // this.commandBar = this.createCommandBar();
        } */

    /*     createCommandBar = (): JSX.Element => {
            return <BasicCommandBar title="Welcome"  />
        } */

    configureCommandBar = () => {

        store.dispatch(hideCommandBar());
    }

    componentDidMount = () => {
        this.configureCommandBar();
    }

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Helmet title="Welcome" />

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    className={classes!.root}

                >

                    <Grid item>

                        <Card className={classes!.root}>
                            <CardHeader component="h1"> Welcome {"Ian Smith"} </CardHeader>
                            <CardContent className={classes!.root}>
                                <Typography variant="h3" color="textSecondary" component="h2">
                                    You are viewing the Rudolph Williams Foundation & Diabetes Education, Limb Salvage and Prosthetics Center's Diabetes Registry.
                                </Typography>

                                <Typography variant="body2" color="textSecondary" component="h2">
                                    The following features were implemented in this release:
                                </Typography>
                                <List className={classes!.root}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Users />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Patient Details"
                                            secondary={
                                                <React.Fragment>
                                                    {" — Allows you to add and edit patient details."}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Users />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Patient Contacs"
                                            secondary={
                                                <React.Fragment>
                                                    {" — Allows you add different types of people who are related to the patient.  An example would the their Emergency Contact."}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Users />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Patient Visits"
                                            secondary={
                                                <React.Fragment>
                                                    {' — Allows you to record information collected from a patient during a visit to the clinic.'}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </List>
                                <Typography variant="h4" color="textSecondary" component="h2">
                                    To start click the <Users /> Patients option in the sidebar.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(connect()(Default));
