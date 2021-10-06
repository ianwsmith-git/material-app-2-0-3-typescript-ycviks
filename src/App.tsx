import DateFnsUtils from '@date-io/date-fns';
import { Box, CardActionArea, CardActions, CardContent, jssPreset, Button as MuiButtom, Card as MuiCard, CardMedia as MuiCardMedia, ThemeProvider as MuiThemeProvider, StylesProvider, Typography } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { spacing } from '@material-ui/system';
import { create } from 'jss';
import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import styled, { ThemeProvider } from 'styled-components/macro';

import Routes from './routes/Routes';
import createTheme from './theme';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")!,
});


const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButtom)(spacing);


const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;



function App() {
  //const theme = useSelector((state: AppStateType) => state.themeReducer);
  const [flag, setFlag] = useState(true);
  return (
    <React.Fragment>
      <HelmetProvider>
        <Helmet
          titleTemplate="%s | Material App"
          defaultTitle="Material App - React Admin & Dashboard Template"
        />
        <StylesProvider jss={jss}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={createTheme("DEFAULT")}>
              <ThemeProvider theme={createTheme("DEFAULT")}>
                {
                  flag ?
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight="100vh"
                    >
                      <Card mb={6}>
                        <CardActionArea>
                          <CardMedia
                            image={process.env.PUBLIC_URL + "/static/img/unsplash/unsplash-1.jpg"}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              Diabetes Registry
                            </Typography>
                            <Typography component="p">
                              Welcome to the Rudolph Williams Foundation & Diabetes Education, Limb Salvage and Prosthetics Center's Diabetes Registry.
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>

                          <Button size="small" color="primary" onClick={() => { setFlag(false); }}>
                            Sign In
                          </Button>
                        </CardActions>
                      </Card>
                    </Box>
                    :
                    <Routes />
                }

              </ThemeProvider>
            </MuiThemeProvider>
          </MuiPickersUtilsProvider>
        </StylesProvider>
      </HelmetProvider>
    </React.Fragment>
  );
}

export default App;
