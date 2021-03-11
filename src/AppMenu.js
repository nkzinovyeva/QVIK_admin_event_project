import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

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
    items: [
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