import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getMainEvent } from "../redux/actions/events";
import { Event } from "./Event";
import AddEvent from "./events/addEvent";
import EditEvent from "./events/editEvent";
import DeleteEvent from "./events/deleteEvent";
import EditMainEvent from "../components/events/editMainEvent"

function Events() {
  
  const classes = useStyles();
  const mainEvent = useSelector((state) => state.eventReducer.mainEvent);
  const events = useSelector((state) => state.eventReducer.events);
  const dispatch = useDispatch();
  const fetchEvents = () => dispatch(getEvents());
  const fetchMainEvent = () => dispatch(getMainEvent());

  useEffect(() => {
    fetchMainEvent();
    fetchEvents();
  }, []);


  return (
    <div>
      <h3>Events</h3>
      <EditMainEvent event={mainEvent} />
      <Event />
      <h4>CREATE SUB-EVENTS</h4>
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6">Sub-events</Typography>
          </Grid>
          <Grid item>
            <AddEvent />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.list}>
            <List dense={true}>
              {events.map((item, index) => (
                <div >
                  <ListItem key={index} >
                    <ListItemText
                      primary={`${index + 1}. sub-event `}
                      secondary={item.title}
                    />
                    <ListItemSecondaryAction>
                      <EditEvent event={item} />
                      <DeleteEvent event={item} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li"/>
                </div>
              ))}
            </List>
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default Events;

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    maxWidth: 500,
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));
