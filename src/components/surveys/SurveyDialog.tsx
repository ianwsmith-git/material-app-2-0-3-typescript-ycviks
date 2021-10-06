import 'survey-react/survey.css';

import {
    Collapse,
    createStyles,
    Grid,
    IconButton,
    styled,
    StyledComponentProps,
    Theme,
    withStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Close as CloseIcon, ViewList } from '@material-ui/icons';
import { Alert as MuiAlert } from '@material-ui/lab';
import { spacing } from '@material-ui/system';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as SurveyComponent from 'survey-react';

import { AppStateType } from '../../redux/reducers';
import { hideAlert as hideAlertDispatch, showAlert as showAlertDispach } from '../../redux/reducers/alertReducer';
import store from '../../redux/store';

const Alert = styled(MuiAlert)(spacing);

const dialogStyle = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: '80%',
    }, wrapper: {
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
    dialogActions: {
        flexGrow: 1
    }
});

const mapStateToProps = (state: AppStateType, ownProps: SurveyDialogPropsType & StyledComponentProps) => ({
    message: state.alertReducer.message,
    showAlert: state.alertReducer.showAlert,
    severity: state.alertReducer.severity
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & SurveyDialogPropsType & StyledComponentProps;

type SurveyDialogPropsType = {
    show: boolean | false;
    onClose: Function;
    onSave: (data: {}) => void;
    onComplete: (data: {}) => void;
    surveyModel: any;
    surveyData: {};
};


class SurveyDialog extends React.Component<Props> {

    state = {
        show: this.props.show, buttonText: "Cancel", model: ""
    };

    handleCancelClose = () => {
        this.props.onClose();
    };

    handleSave = (e: any, model: SurveyComponent.Model) => {
        this.props.onSave(model.data);
        e.preventDefault();
    };

    handleNextPage = (e: any, model: SurveyComponent.Model) => {

        if (model.nextPage()) {
            this.setState({ model: model });
        }
        e.preventDefault();
    };

    handleComplete = (e: any, model: SurveyComponent.Model) => {

        if (model.completeLastPage()) {
            
            this.setState({ model: model });
            this.props.onComplete(model.data);
        }

        e.preventDefault();
    }

    handlePreviousPage = (e: any, model: SurveyComponent.Model) => {
        if (model.prevPage()) {
            this.setState({ model: model });
        }
        else {

            if (model.isFirstPage) {
                this.setState({ model: model });
            }
        }
        e.preventDefault();
    };

    public hideAlert() {
        store.dispatch(hideAlertDispatch());
    }

    public showAlert(alertSeverity: any, alertMessage: string) {
        store.dispatch(showAlertDispach(alertSeverity, alertMessage));
    }

    public getSurveyModel(): SurveyComponent.Model {

        if (this.state.model === "") {
            var survey = new SurveyComponent.Model(this.props.surveyModel);
            survey.data = this.props.surveyData;
            survey.showPageNumbers = true;
            survey.showProgressBar = "bottom";
            survey.showNavigationButtons = false;
            return survey;
        }
        else {
            return (this.state.model as unknown) as SurveyComponent.Model;
        }
    }

    public render() {

        const { classes } = this.props;

        const survey = this.getSurveyModel();

        return (
            <div>


                <Dialog open={this.props.show} aria-labelledby="form-dialog-title" maxWidth="lg" disableBackdropClick
                    disableEscapeKeyDown >
                    <DialogTitle id="form-dialog-title"><ViewList color="primary" /> {this.props.surveyModel.title!}</DialogTitle>

                    <DialogContent dividers className={classes!.root!}>
                        <DialogContentText>
                            <Collapse in={this.props.showAlert} className={classes!.root!}>
                                {this.props.showAlert ?
                                    <Alert variant="filled" severity={this.props.severity === "error" ? "error" : "success"}
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={(e) => {
                                                    this.hideAlert();
                                                    e.preventDefault();
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        }
                                    >
                                        {this.props.message}
                                    </Alert>
                                    : null
                                }
                            </Collapse>

                        </DialogContentText>
                        <SurveyComponent.Survey model={survey} />
                    </DialogContent>
                    <DialogActions>


                        <Grid container spacing={3}>

                            <Grid item xs={6}>

                                <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                        <Button name="surveyPrev" id="surveyPrev" variant="outlined" disabled={survey.currentPageNo === 0} color="primary" onClick={(e) => { this.handlePreviousPage(e, survey) }}>
                                            Previous Page
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button name="surveyNext" id="surveyNext" variant="outlined" disabled={survey.currentPageNo >= survey.PageCount - 1} color="primary" onClick={(e) => { this.handleNextPage(e, survey) }}>
                                            Next Page
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>


                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item className={classes!.dialogActions!}>

                                    </Grid>
                                    {!survey.isDisplayMode ?
                                        <Grid item xs={3}>

                                            <Button name="surveyComplete" id="surveyComplete" variant="outlined" color="primary" disabled={!survey.isLastPage} onClick={(e) => { this.handleComplete(e, survey) }} >
                                                Complete
                                            </Button>

                                        </Grid>
                                        :
                                        null
                                    }
                                    <Grid item xs={3}>
                                        <Button variant="outlined" color="primary" onClick={this.handleCancelClose}>
                                            &nbsp;    Close&nbsp;
                                        </Button>
                                    </Grid>
                                    {!survey.isDisplayMode ?
                                        <Grid item xs={3} alignContent='center'>

                                            <Button variant="outlined" color="primary" onClick={(e) => { this.handleSave(e, survey) }}>
                                                &nbsp; &nbsp;Save&nbsp; &nbsp;
                                            </Button>

                                        </Grid>
                                        :
                                        null

                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </Dialog >
            </div >


        )

    }
}

/* const VisitDialog = withStyles(moreStyles)(ContactBaseDialog);

VisitDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(moreStyles)(ContactBaseDialog)
 */

export default withStyles(dialogStyle)(connector(SurveyDialog))