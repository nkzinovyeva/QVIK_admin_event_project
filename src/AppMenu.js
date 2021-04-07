import React, {useEffect, useState} from "react";import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'

import AppMenuItem from './AppMenuItem'

const appMenuItems = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Restaurants',
    link: '/restaurants',
    items: [
        {
          name: 'Restaurant 1',
        },
        {
          name: 'Restaurant 2',
        },
        {
          name: 'Restaurant 3',
        },
    ]
  },
  {
    name: 'Events',
    link: '/events',
    items: [ //HERE WE NEED TO WRITE A FUNCTION WHERE EACH NAME = EVENTS.TITLE
        {
          name: 'Event 1',
        },
        {
          name: 'Event 2',
        },
        {
          name: 'Event 3',
        },
    ]
  },
]

const AppMenu = () => {
  const classes = useStyles()
  const [events, setEvents] = useState([]);
  
    useEffect(() => {
        getEvents(); 
    }, []);
    
    const getEvents = () => {
        fetch("https://qvik.herokuapp.com/api/v1/events")
          .then((response) => response.json())
          .then((jsondata) => { 
            console.log('jsondata', jsondata.data[0].data )
            setEvents(jsondata.data[0].data);
          })
            .catch(err => console.error(err));
    };

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