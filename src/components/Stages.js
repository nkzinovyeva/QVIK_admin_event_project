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
import { getStages } from "../redux/actions/stages";
import EditStage from "./stages/editStage";
import AddStage from "./stages/addStage";
import DeleteStage from "./stages/deleteStage";

function Stages() {
  const classes = useStyles();
  const stages = useSelector((state) => state.stageReducer.stages);
  const dispatch = useDispatch();
  const fetchStages = () => dispatch(getStages());

  useEffect(() => {
    const fetchData = async () => {
      fetchStages();
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>STAGES</h3>
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6">STAGES</Typography>
          </Grid>
          <Grid item>
            <AddStage />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.list}>
            <List dense={true}>
              {stages.map((item, index) => (
                <div >
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1}. stage `}
                      secondary={item.name}
                    />
                    <ListItemSecondaryAction>
                      <EditStage stage={item} />
                      <DeleteStage stage={item} />
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

export default Stages;

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
