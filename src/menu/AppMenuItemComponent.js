import React, { forwardRef, useState} from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import { NavLink  } from 'react-router-dom'
import EditEvent from "../components/events/editEvent";

const AppMenuItemComponent = props => {
  const { className, onClick, link, children, type, data } = props;

  // If link is not set return the orinary ListItem
  if (!link & !type ) {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    )
  }

  if (type === "event" ) {
    return (
      <ListItem
        button
        className={className} 
        onClick={onClick}
        >
          <ListItemText children={children} />
          <ListItemIcon>
            <EditEvent  event={data} />
          </ListItemIcon>
      </ListItem>
    )
  }


  if (type === "rest" ) {
    return (
      <ListItem
        button
        className={className} 
        onClick={onClick}
        >
        <ListItemText children={children} />
      </ListItem>
    )
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      className={className}
      children={children}
      component={forwardRef((props, innerRef) => <NavLink exact {...props} innerRef={innerRef} />)}
      to={link}
      onClick={onClick}
    />
  )
}

export default AppMenuItemComponent;