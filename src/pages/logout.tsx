import React, { Component } from "react";
import {
    Redirect
} from "react-router-dom";

export default class LogOut extends Component {

    render() {
        return <Redirect to="/" />
    }
}

/* import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { Component} from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default class LogOut extends Component {

    render() {

        return (
            <React.Fragment>
                <Helmet title="Logged Out" />

                <Grid
                    container
                    spacing={0}
                    direction="column"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item xs={3}>

                        <Card>
                            <CardHeader title="Logging you out." component="h2">  </CardHeader>

                            <CardActionArea>
                                <CardContent>

                                    <Typography variant="body2" color="textSecondary" component="h2">
                                       We are logging  you out of the system.  If you are not redirected to the login page within a minute or after you close the pop up page then click here to go back to the <Link to="/">Login Page</Link> .
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>


                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
            </React.Fragment>
        )
    }
} */