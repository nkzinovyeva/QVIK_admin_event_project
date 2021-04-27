import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Tooltip, IconButton} from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import {Event} from './Event';
import EditEvent from "./EditEvent";
import AddEvent from "./AddEvent";
import SubEventList from "./events/subEventsList";


function Events() {

  const [mainEvent, setMainEvent] = useState([]);
  const [tags, setTags] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const gridRef = useRef();
  let link = "https://qvik.herokuapp.com/api/v1/events";

  useEffect(() => {
    const fetchData = async () => {
      setTags(await getTags())
      setMainEvent(await getMainEvent())
      setEvents(await getEvents())
    } 
    fetchData()
  }, []) 


  //set columns for the table
  const columns = [
      {headerName: "Title", field: "title", sortable: true, filter: true, resizable: true },
      {headerName: "Short description", field: "shortDescription", sortable: true, filter: true, resizable: true },
      {headerName: "", 
          field: "", 
          cellRendererFramework: params => <EditEvent updateEvent={updateEvent} event={params.data} /> 
      },
      {headerName: "", 
            field: "eventId", 
            cellRendererFramework: params => <Tooltip title="Delete sub-event">
                                                <IconButton variant="text" 
                                                        color="secondary" 
                                                        size="small" 
                                                        aria-label="delete"
                                                        onClick = {() => deleteEvent(params.data.eventId)} >
                                                        DELETE
                                                </IconButton>
                                            </Tooltip>
        },
  ];

  //get mainEvent from the database
  const getMainEvent = () => {
    fetch("https://qvik.herokuapp.com/api/v1/initial-setup")
      .then((response) => response.json())
      .then((jsondata) => { 
        setMainEvent(jsondata.data);
      })
        .catch(err => console.error(err));
  };

  //get list of tags
  const getTags = () => {
    fetch("https://qvik.herokuapp.com/api/v1/tags")
      .then((response) => response.json())
      .then((jsondata) => { 
        console.log('jsontags', jsondata.data )
        setTags(jsondata.data);
      })
        .catch(err => console.error(err));
  };

  //get Sub-events from the database
  const getEvents = () => {
      fetch(link)
        .then((response) => response.json())
        .then((jsondata) => { 
          console.log('jsondata', jsondata.data[0].data )
          setEvents(jsondata.data[0].data);
        })
          .catch(err => console.error(err));
  };


  //update event
  const updateEvent = (event, id) => {
      console.log('stingify', JSON.safeStringify(event))
      fetch("https://qvik.herokuapp.com/api/v1/events/" + id, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.safeStringify(event)
      })
      .then(_ => getEvents())
      .then(_ => {
          setMsg("Event updated");
          setOpen(true);
      })
        .catch((err) => console.log(err));
  };

  //create event
  const createEvent = (event) => {
    fetch("https://qvik.herokuapp.com/api/v1/events/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.safeStringify(event)
    })
    .then(_ => getEvents())
    .then(_ => {
        setMsg("New Sub-event added");
        setOpen(true);
    })
      .catch((err) => console.log(err));
};


  //delete event
  const deleteEvent = (id) => {
    console.log('id', id)
    if (window.confirm("Are you sure?")) {
        fetch("https://qvik.herokuapp.com/api/v1/events/" + id, {
          method: "DELETE"
        })
        .then(_ => getEvents())
        .then(_ => {
            setMsg("Sub-event deleted")
            setOpen(true)
        })
        .catch(err => console.error(err));
      }
  };

  //method for safe Stringify JSON
  JSON.safeStringify = (obj, indent = 2) => {
      let cache = [];
      const retVal = JSON.stringify(
        obj,
        (key, value) =>
          typeof value === "object" && value !== null
            ? cache.includes(value)
              ? undefined // Duplicate reference found, discard key
              : cache.push(value) && value // Store value in our collection
            : value,
        indent
      );
      cache = null;
      return retVal;
    };


    return  (
      mainEvent ? 
      <div style={{marginLeft: '150px'}}>
        <Event preloadedValues={mainEvent} tagsList={tags}/>
        <h3>Sub-events</h3>
        <SubEventList />
        <AddEvent createEvent = {createEvent}/>
          <div style ={{height: "700px", width: "95%", margin: "auto"}}>
                <AgGridReact 
                    ref = {gridRef}
                    onGridReady = { params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs = {columns}
                    suppressCellSelection = {true}
                    rowData = {events}
                    pagination = {true}
                    paginationPageSize = {10}
                >
                </AgGridReact>
            </div>
            
      </div>
      : <div>Loading...</div>
      )
    }

export default Events;
