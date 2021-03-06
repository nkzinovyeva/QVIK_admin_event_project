import React, { useEffect, useState } from "react"; 
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from '../redux/actions/events';
import { getStages } from '../redux/actions/stages';
import { getPresenters } from '../redux/actions/presenters';
import { getRestaurants } from '../redux/actions/restaurants';
import List from '@material-ui/core/List';
import AppMenuItem from './AppMenuItem';

const AppMenu = (props) => {
  const classes = useStyles()
  //const [restaurants, setRestaurants] = useState([]);

  const events = useSelector(state => state.eventReducer.events)

  const stages = useSelector(state => state.stageReducer.stages);

  const presenters = useSelector(state => state.presenterReducer.presenters)

  const restaurants = useSelector(state => state.restaurantReducer.restaurants);

  const dispatch = useDispatch();
  const fetchEvents = () => dispatch(getEvents());
  const fetchStages = () => dispatch(getStages());
  const fetchPresenters = () => dispatch(getPresenters());
  const fetchRestaurants = () => dispatch(getRestaurants());

  const appMenuItems = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Restaurants',
      link: '/restaurants',
      items: restaurants.map(restaurant => {
        return { name: restaurant.name, type: 'rest', data: restaurant }
      })
    },
    {
      name: 'Events',
      link: '/events',
      items: events.map(event => {
        return { name: event.title, type: 'event', data: event }
      })
    },{
      name: 'Stages',
      link: '/stages',
      items: stages.map(stage => {
        return { name: stage.name, type: 'stage', data: stage }
      })
    },
    ,{
      name: 'Hosts',
      link: '/presenters',
      items: presenters.map(presenter => {
        return { name: presenter.name, type: 'presenter', data: presenter }
      })
    },
  ]

  useEffect(() => {
    fetchEvents();
    fetchRestaurants();
    fetchStages();
    fetchPresenters();
  }, []);

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#97c05c',
    },
  }),
)

export default AppMenu;