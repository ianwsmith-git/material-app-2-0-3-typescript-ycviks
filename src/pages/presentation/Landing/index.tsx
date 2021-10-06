import React, { Component } from 'react';

import { spacing } from '@material-ui/system';
import { Box, CardActionArea, CardActions, CardContent, Button as MuiButton, Card as MuiCard, CardMedia as MuiCardMedia, Typography, jssPreset } from '@material-ui/core';
import props from "../../../theme/props";
import { create } from 'jss';
import styled from 'styled-components';

const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")!,
});

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);


const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

function Presentation() {
  return (
    <React.Fragment>
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
                Welcome to the Rudolph kkkdkkfdkfkd Williams Foundation & Diabetes Education, Limb Salvage and Prosthetics Center's Diabetes Registry.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>

            <Button size="small" color="primary" onClick={() => { }}>
              Sign In
            </Button>
          </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
}

export default Presentation;
