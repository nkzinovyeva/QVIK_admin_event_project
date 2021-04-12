import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import {Event} from './Event'

function Events() {

  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const gridRef = useRef();  

    /*useEffect(() => {
        getEvents();
        console.log('events', events)
    }, []);
    */

    useEffect(() => {
      const fetchData = async () => {
        setTags(await getTags())
        setEvents(await getEvents())
        
      } 
      fetchData()
    }, []) 

    //set columns for the table
    /*const columns = [
        {headerName: "Id", field: "eventId", sortable: true, filter: true, resizable: true },
        {headerName: "Title", field: "title", sortable: true, filter: true, resizable: true },
        {headerName: "Short description", field: "shortDescription", sortable: true, filter: true, resizable: true },
    ];*/
    
    //get customers from the database
    const getEvents = () => {
        fetch("https://qvik.herokuapp.com/api/v1/initial-setup")
          .then((response) => response.json())
          .then((jsondata) => { 
            setEvents(jsondata.data);
          })
            .catch(err => console.error(err));
    };

    const getTags = () => {
      fetch("https://qvik.herokuapp.com/api/v1/tags")
        .then((response) => response.json())
        .then((jsondata) => { 
          console.log('jsontags', jsondata.data )
          setTags(jsondata.data);
        })
          .catch(err => console.error(err));
  };

    

    return  events ? <Event preloadedValues={events} tagsList={tags}/> : <div>Loading...</div>
    }

export default Events;
