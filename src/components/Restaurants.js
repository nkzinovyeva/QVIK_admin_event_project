import React, { useState, useEffect, useRef } from "react";
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
import { getRestaurants } from '../redux/actions/restaurants';
import EditRestaurant from "./restaurants/editRestaurant";
import AddRestaurant from "./restaurants/addRestaurant";
import DeleteRestaurant from "./restaurants/deleteRestaurant";

function Restaurants() {

  const classes = useStyles();
  const restaurants = useSelector(state => state.restaurantReducer.restaurants);
  const dispatch = useDispatch();
  const fetchRestaurants = () => dispatch(getRestaurants());

  useEffect(() => {
    const fetchData = async () => {
      fetchRestaurants()
    }
    fetchData()
  }, []);

  return (
    <div>
      <h3>RESTAURANTS</h3>
      <div className={classes.container}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6">RESTAURANTS</Typography>
          </Grid>
          <Grid item>
            <AddRestaurant />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.list}>
            <List dense={true}>
              {restaurants.map((item, index) => (
                <div>
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${index + 1}. restaurant `}
                      secondary={item.name}
                    />
                    <ListItemSecondaryAction>
                      <EditRestaurant rest={item} />
                      <DeleteRestaurant rest={item} />
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

export default Restaurants;

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
