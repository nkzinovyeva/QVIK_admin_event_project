import React, {useEffect, useState} from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export function Events() {
  /////
  const [data, setData] = useState([])
  const url = "https://qvik.herokuapp.com/api/v1/events";

  useEffect(() => {
    //const fetchData = async () => {
      //getEventsData();
      getAllEvents();
    //} 
    //fetchData()
  }, []) 

  const getAllEvents = () => {
      axios.get(`${url}`)
      .then((response) => {
        const allEvents = response.data.data;
        setData(allEvents);
        console.log(allEvents);
        console.log("fin allEvents --------");
        console.log(response);
      })
      .catch(error => console.error(`Error: ${error}`));
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '30ch',
    },
  }));
  /*const getEventsData = () => {
      fetch('https://qvik.herokuapp.com/api/v1/events')
      .then(response => response.json())
      .then(data => {
          return setData(
              data.map((data,index) => ({
                  id:index,
                  eventName: data.title,
                  location: data.stage.name
              }))
          )
          })
      .catch(err => console.error(err))
    }  
    */

    //////////////
    const classes = useStyles();
      return(
        <div style={{marginLeft: '150px'}}>
          <h1>Events page</h1>
          <form noValidate autoComplete="off">
            <div className={classes.textField} >
              <TextField id="filled-basic" label="Event Name" defaultValue="Wall of paint" variant="filled" margin="normal"/>
              <TextField id="filled-basic" label="Street Address" defaultValue="Main road 2" variant="filled" margin="normal"/>
            </div>
            <div className={classes.root}>
              <TextField id="filled-basic" label="City" defaultValue="Helsinki" variant="filled" />
              <TextField id="filled-basic" label="Zip Code" defaultValue="00420" variant="filled" />
            </div>
          </form>  
        </div>
        
      );
    }

export default Events;