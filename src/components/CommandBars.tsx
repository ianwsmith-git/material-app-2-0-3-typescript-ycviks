import { Button, Divider, Grid, Hidden, makeStyles, AppBar as MuiAppBar, IconButton as MuiIconButton } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Menu as MenuIcon } from '@material-ui/icons';
import { fontWeight } from '@material-ui/system';
import * as React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import styled, { withTheme } from 'styled-components/macro';

import { AppStateType } from '../redux/reducers';
import { setupCommandBar } from '../redux/reducers/commandBarReducer';

const useStyles = makeStyles(theme => ({
    commandBar: {
        boxShadow: "none",
        backgroundColor: grey[300],
        minHeight: 40,
        color: "#121111",
        fontWeight: 'bold',
        padding: 8

    }
}));

type CommandBarProps = {
    title: string | "";
    onSaveClick? : Function;
    onCancelClick? : Function;
    // children: typeof Button[];
};

export const BasicCommandBar: React.FC<CommandBarProps> = (props: CommandBarProps) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container alignItems="center" className={classes.commandBar}>
                <Grid item md={11}>
                    {props.title}
                </Grid>
                {/*    {props.children.map((button: typeof Button) => (
                    <Grid item>
                        {button}
                    </Grid>
                ))} */}

            </Grid>
        </React.Fragment>
    );

}


export const EditItemCommandBar: React.FC<CommandBarProps> = (props: CommandBarProps) => {

    const classes = useStyles();

    const onSaveClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
       props.onSaveClick!();
      }
      const onCancelClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
       props.onCancelClick!();
      }
    return (
        <React.Fragment>
            <Grid container className={classes.commandBar}>
                <Grid item md={11} alignItems="center">
                    {props.title}
                </Grid>

                <Grid item md={1}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item >
                            <Button variant="outlined" onClick={onSaveClicked}>Save</Button>
                        </Grid>
                        <Grid item >
                            <Button variant="outlined" onClick={onCancelClicked}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
        </React.Fragment >
    );

}