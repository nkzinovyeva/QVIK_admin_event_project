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
import { getPresenters } from "../redux/actions/presenters";
import EditPresenter from "./presenters/editPresenter";
import AddPresenter from "./presenters/addPresenter";
import DeletePresenter from "./presenters/deletePresenter";

function Presenters() {
  const classes = useStyles();
  const presenters = useSelector((state) => state.presenterReducer.presenters);
  const dispatch = useDispatch();
  const fetchPresenters = () => dispatch(getPresenters());

  useEffect(() => {
    const fetchData = async () => {
      fetchPresenters();
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>PRESENTERS</h3>
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6">PRESENTERS</Typography>
          </Grid>
          <Grid item>
            <AddPresenter />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.list}>
            <List dense={true}>
              {presenters.map((item, index) => (
                <div >
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1}. presenter `}
                      secondary={item.name}
                    />
                    <ListItemSecondaryAction>
                      <EditPresenter presenter={item} />
                      <DeletePresenter presenter={item} />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </div>
              ))}
            </List>
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default Presenters;

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
