import DateFnsUtils from "@date-io/date-fns";
import FullCalendar, { DateSelectArg, DatesSetArg, DayCellMountArg, EventApi, EventClickArg, EventContentArg, SlotLaneMountArg } from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';
import { Backdrop, Button, Card as MuiCard, CardContent as MuiCardContent, CircularProgress, Collapse, Divider as MuiDivider, Grid, Icon, IconButton, makeStyles, MenuItem, Select, TextField, Theme, Typography } from '@material-ui/core';
import { Warning, Close as CloseIcon } from '@material-ui/icons';
import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { color, spacing } from '@material-ui/system';
import moment from "moment";
import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { Appointment, AppointmentListResponse, AppointmentStatus, DiaRegWebApiClient as Client } from "../../api/DiaRegApi";
import calendarStyle from './Calendar.style';
import { Alert } from "@material-ui/lab";
import { blue, green, grey, purple, yellow } from "@material-ui/core/colors";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";;

//#region Styled Components
const localCalendarStyle = css`
.fc .fc-timegrid-slot {
    height: 5em;
    border-bottom: 0 /* each cell owns its top border */;
}

.fc .fc-selected-date-slot {
    background: ${blue[50]};
}
`;
const FullCalendarWrapper = styled.div`
  ${calendarStyle.concat(localCalendarStyle)}
`;


const useStyles = makeStyles((theme: Theme) => (
    {
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            "& .MuiTextField-root": {
                margin: theme.spacing(1)
            }
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        calendarContainer: {
            width: "200px",
            height: "250px",
            padding: "5px",
        },
        scheduledEvent: {
            "& .fc-v-event": {
                backgroundColor: blue[600],
                color: "white"
            }
        },
        confirmedEvent: {
            backgroundColor: purple[600],
            color: "white"
        },
        canceledEvent: {
            "& .fc-v-event": {
                backgroundColor: grey[600],
                color: "white"
            }
        },
        missedEvent: {
            backgroundColor: yellow[600],
            color: "black"
        },
        checkedInEvent: {
            backgroundColor: green[600],
            color: "black"
        },
        completedEvent: {
            backgroundColor: grey[600],
            color: "white"
        }
    })
);
const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
export const Divider = styled(MuiDivider)(spacing);
//#endregion Styled Components


//#region Prop Types Definitions
type AppointmentsCalendarPropsType = {
    onDateClick: (startDate: Date, endDate: Date) => any;
    onEventClick: (event: EventApi) => any;
    refresh: boolean | false;
};
//#endregion Props Types Definitions
export function AppointmentsCalendar(props: AppointmentsCalendarPropsType) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    let gotoDateValue = new Date();

    //#region events
    const [events, setEvents] = useState<Array<any>>([]);
    const calendarRef: React.RefObject<FullCalendar> = React.createRef();

    const createEvents = (appointments: Appointment[]) => {
        var events = new Array<any>();

        appointments.forEach((appointment: Appointment) => {
            var event = createEvent(appointment);
            events.push(event);
        });

        setEvents(events);
    };

    const createEvent = (appointment: Appointment): any => {
        var event = {
            id: appointment.id,
            start: appointment.appointmentStartDate,
            end: appointment.appointmentEndDate,
            title: appointment.patient.displayName,
            backgroundColor: getEventBackgroundColor(appointment),
            textColor: getEventColor(appointment),
            overlap: false,
            editable: false,
            extendedProps: {
                doctor: appointment.doctor.lastName + ", " + appointment.doctor.firstName,
                status: appointment.appointmentStatus.name
            }
        };

        return event;
    };

    const getEventColor = (appointment: Appointment): string => {
        //TODO bring over the enum for appointment statuses

        switch (appointment.appointmentStatus.id) {
            case 5:
                return "black";
            default:
                return "white";
        }
    };

    const getEventBackgroundColor = (appointment: Appointment): string => {
        //TODO bring over the enum for appointment statuses

        switch (appointment.appointmentStatus.id) {
            case 2:
                return blue[600]!;
            case 3:
                return purple[600]!;
            case 4:
                return grey[600]!;
            case 5:
                return yellow[600];
            case 6:
                return green[600];
            case 7:
                return grey[600]!;
            case 8:
                return blue[600]!;
            default:
                return grey[600];
        }
    };

    const gotoDate = (newDate: Date) => {
        setSelectedDate(newDate);
        getCalendarApi().gotoDate(newDate);
        gotoDateValue = newDate;
    }

    //#endregion events
    //#region Alerting
    const [openAlert, setOpenAlert] = React.useState<boolean>(false);
    const [alertMessage, setAlertMessage] = React.useState<string>("");
    const [alertSeverity, setAlertSeverity] = React.useState<any>("success");

    function showAlert(alertSeverity: any, alertMessage: string) {
        setAlertMessage(alertMessage);
        setAlertSeverity(alertSeverity);
        setOpenAlert(true);
    };
    //#endregion Alerting
    //#region Calendar functions
    const getCalendarApi = () => {
        return calendarRef.current!.getApi();
    };

    //#endregion
    //#region initial data load
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            (async () => {

                var startDate = loading ? new Date() : selectedDate; //getCalendarApi().getDate();

                var mmnt = moment(startDate);
                mmnt = mmnt.startOf("isoWeek");
                var startDate = mmnt.toDate();

                mmnt = mmnt.endOf("isoWeek");
                var endDate = mmnt.toDate();

                await getAppointments(startDate, endDate).then((value: AppointmentListResponse) => {
                    if (value.status == "success") {
                        let data = value.data!;
                        createEvents(data);
                    }
                    else {
                        showAlert(value.status, value.message!);
                    }
                }
                ).catch((error) => {
                    showAlert("error", "An expected error has occurred: " + error.message!);
                });



            }
            )();

        }
        else {
            setLoading(false);
        }


        return () => {
            active = false;
        };


    }, [selectedDate, props.refresh]);
    //#endregion Initial Data Load

    //#region Evemt Hanlders
    const onSelect = (arg: DateSelectArg) => {
        props.onDateClick(arg.start, arg.end);
    };

    const onAddEvent = () => {
        var mmnt = moment(new Date());
        mmnt.add(30, "minutes");
        props.onDateClick(new Date(), mmnt.toDate());
    }

    const onEventClick = (arg: EventClickArg) => {
        props.onEventClick(arg.event);
    };

    function eventContentHandler(arg: EventContentArg) {
        return (

            <Grid container spacing={0}>
                <Grid item xs={10}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            Time: {arg.timeText}
                        </Grid>

                        <Grid item xs={12}>
                            Patient: {arg.event.title}
                        </Grid>
                        <Grid item md={12}>
                            {arg.event.extendedProps.status}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    //#endregion Event Handlers
    //#region api calls
    async function getAppointments(startDate: Date, endDate: Date) {
        return await new Client().getAppointments(startDate, endDate);
    }

    //#endregion api calls
    const classes = useStyles();

    return (
        <div>
            {loading ?
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                :
                <Card mb={6} >
                    <CardContent p={6} >
                        <Grid container spacing={6} className={classes!.root}>
                            <Grid item md={12} className={classes!.root}>
                                <Collapse in={openAlert}>


                                    <Alert variant="filled" severity={alertSeverity}
                                        action={<IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={(e) => {
                                                setOpenAlert(false);
                                                e.preventDefault();
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>}
                                    >
                                        {alertMessage}
                                    </Alert>

                                </Collapse>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12} >
                                    <Grid container direction="row" spacing={2}
                                    >
                                        <Grid item xs={6}>
                                            <GotoDate startDate={selectedDate} gotoDate={(dateValue) => { gotoDate(dateValue) }} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid container direction="row" spacing={0} alignItems="flex-end"
                                                justify="flex-end">
                                                <Grid item xs={3}>
                                                    <Button color="primary" fullWidth variant="contained" onClick={onAddEvent}>Add Appointment</Button>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FullCalendarWrapper>
                                        <FullCalendar
                                            ref={calendarRef}
                                            nowIndicator={true}
                                            initialView="timeGridWeek"
                                            plugins={[timeGridPlugin, interactionPlugin]}
                                            events={events}
                                            editable={true}
                                            selectable={true}
                                            eventOrderStrict={true}
                                            eventOrder="title"
                                            eventMaxStack={1}
                                            weekends={false}
                                            allDaySlot={false}
                                            select={onSelect}
                                            headerToolbar={{
                                                left: "today",
                                                center: "title",
                                                right: "prev,next"
                                            }}
                                            buttonText={{ today: 'Today' }}
                                            eventDisplay="auto"
                                            eventContent={eventContentHandler}
                                            eventClick={onEventClick}
                                            slotDuration="00:15:00"
                                            datesSet={(arg: DatesSetArg) => {
                                                setSelectedDate(arg.start);
                                            }}

                                            dayCellDidMount={(arg: DayCellMountArg) => {

                                                if (!arg.isToday) {
                                                    if (moment(gotoDateValue).startOf('day').isSame(arg.date)) {
                                                        arg.el.classList.add("fc-selected-date-slot");
                                                    }
                                                }

                                            }}
                                        />
                                    </FullCalendarWrapper>
                                </Grid>

                            </MuiPickersUtilsProvider>
                        </Grid>
                    </CardContent>
                </Card>}

        </div >
    );
}
function GotoDate(props: { startDate: Date, gotoDate: (newDate: Date) => any }) {
    const [value, setValue] = useState<number>(1);
    const [amount, setAmount] = useState<number>(365);
    const [unit, setUnit] = useState<string>("1");
    const [max, setMax] = useState<number>(365);
    const min = 1;

    const gotoDate = () => {

        var mmnt = moment(props.startDate);



        switch (unit) {
            case "1":
                mmnt.add(value, "days")
                break;
            case "2":
                mmnt.add(value, "weeks")
                break;
            case "3":
                mmnt.add(value, "months")
                break;

            case "4":
                mmnt.add(value, "years")
                break;
        }
        props.gotoDate(mmnt.toDate());
    }



    const calculateMax = (unit: string): number => {
        switch (unit) {
            case "1":
                return 365;

            case "2":
                return 52;

            case "3":
                return 12;

            case "4":
                return 5;
            default:
                return 0;
        }
    }

    return <Grid container direction="row" spacing={2}
        alignItems="flex-start"
        justify="flex-start">
        <Grid item xs={2}>
            <TextField
                size="small"
                label="Units"
                select
                fullWidth
                variant="outlined"
                value={unit}
                onChange={(e) => {
                    var value = parseInt(e.target.value, 10);
                    setMax(calculateMax(value.toString()));
                    setUnit(value.toString());
                    setValue(1);
                    setAmount(1);
                }}
            >
                <MenuItem value={1}>Days</MenuItem>
                <MenuItem value={2}>Weeks</MenuItem>
                <MenuItem value={3}>Months</MenuItem>
                <MenuItem value={4}>Years</MenuItem>
            </TextField>
        </Grid>
        <Grid item xs={2}>
            <TextField variant="outlined"
                type="number"
                inputProps={{ min, max }}
                fullWidth
                size="small"
                label="Number"
                value={value}
                onChange={(e) => {
                    var value = parseInt(e.target.value, 10);

                    if (value > max) value = max;
                    if (value < min) value = min;
                    setValue(value);
                }} />
        </Grid>
        <Grid item xs={3}>
            <Button color="primary" variant="contained" onClick={gotoDate}>Go</Button>
        </Grid>
    </Grid>;
}

