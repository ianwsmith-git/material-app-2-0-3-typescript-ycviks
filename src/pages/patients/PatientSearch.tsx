import { Button as MuiButton, Grid, TextField as MuiTextField, Tooltip } from '@material-ui/core';
import { spacing, SpacingProps } from '@material-ui/system';
import React, { Component } from 'react';
import { Search as SearchIcon } from 'react-feather';
import styled from 'styled-components/macro';


const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

interface ButtonPropstype extends SpacingProps {
    component?: string;
}
const Button = styled(MuiButton)<ButtonPropstype>(spacing);

interface PatientSearchProps {
    onSearch: (lastName: string, firstName: string) => void
}

export default class PatientSearch extends Component<PatientSearchProps> {

    state = { lastName: "", firstName: "" };

    private handleSearch = (): void => {

        if (!this.props.onSearch) {
            return;
        }
        else {


            this.props.onSearch(this.state.lastName, this.state.firstName);
        }
    };

    render() {
        return (

            <Grid justify="space-between" container spacing={6}>


                <Grid item>
                    <TextField
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        size="small"
                        // eslint-disable-next-line react/no-direct-mutation-state
                        onChange={(e) => this.state.lastName = e.target.value}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name="firstName"
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        size="small"
                        // eslint-disable-next-line react/no-direct-mutation-state
                        onChange={(e) => this.state.firstName = e.target.value}
                    />
                </Grid>
                <Grid item>
                    <Tooltip title="Search for Patient">

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            onClick={this.handleSearch}
                        >
                            Search
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>


        );
    }
}

