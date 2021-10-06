import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { QuestionAnswer as QuestionIcon } from '@material-ui/icons';
import react, { Component } from 'react';
import * as Survey from 'survey-react';
import {json} from "./data"

import 'survey-react/survey.css';

Survey.StylesManager.applyTheme("default");

class SurveyComponent extends Component {

    survey = new Survey.Model(json);

    nextPage = () => {

        if (!this.survey.hasErrors)
        {
        this.survey.nextPage();
        }
        else
        {
            
        }
    }

    render() {



        return (

            <Dialog open={true} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                disableEscapeKeyDown >

                <DialogTitle id="form-dialog-title"><QuestionIcon color="primary" /> Initial Patitent Questionaire</DialogTitle>

                <DialogContent dividers >
                    <DialogContentText>
                        <Survey.Survey model={this.survey}  />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled={this.survey.isFirstPage}>
                        Previous
                    </Button>

                    <Button type="submit" color="primary" disabled={this.survey.pageCount !> 1 || this.survey.isCurrentPageHasErrors || !this.survey.isLastPage}>
                        Next
                    </Button>
                    <Button type="submit" color="primary" disabled={!this.survey.isLastPage || this.survey.isCurrentPageHasErrors}>
                        Complete
                    </Button>
                    <Button type="submit" color="primary" >
                        Save and Close
                    </Button>

                </DialogActions>
            </Dialog >

        );
    }
}

export default SurveyComponent;

