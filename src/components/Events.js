import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from '../redux/actions/events';
import {Event} from './notInUse/Event';
import AddEvent from "./events/addEvent";
import EditEvent from "./events/editEvent";
import DeleteEvent from "./events/deleteEvent";


function Events() {

  const [mainEvent, setMainEvent] = useState([]);
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const gridRef = useRef();
  const events = useSelector(state => state.eventReducer.events)
  const dispatch = useDispatch();
  const fetchEvents = () => dispatch(getEvents());

  useEffect(() => {
    const fetchData = async () => {
      setTags(await getTags())
      setMainEvent(await getMainEvent())
      fetchEvents()
    } 
    fetchData()
  }, []) 


  //set columns for the table
  const columns = [
      {headerName: "Title", field: "title", sortable: true, filter: true, resizable: true },
      {headerName: "Short description", field: "shortDescription", sortable: true, filter: true, resizable: true },
      {headerName: "", 
          field: "", 
          cellRendererFramework: params => <EditEvent event={params.data} /> 
      },
      {headerName: "", 
            field: "eventId", 
            cellRendererFramework: params => <DeleteEvent event={params.data} />
      }
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
        setTags(jsondata.data);
      })
        .catch(err => console.error(err));
  };


  //create event
  const createEvent = (event, stage, presenter) => {
    fetch("https://qvik.herokuapp.com/api/v1/events/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.safeStringify(event)
    })
    //.then(_ => getEvents())
    .then(_ => linkEventStage(stage))
    .then(_ => linkEventPresenter(presenter))
    .then(_ => {
        setMsg("New Sub-event added");
        setOpen(true);
    })
      .catch((err) => console.log(err));
  };

  //link stage to the event 
  const linkEventStage = (stage) => {
   // getEvents();
    fetch("https://qvik.herokuapp.com/api/v1/link-event-stage/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {"sourceId":stage, "destinationId":events.slice(-1).pop().eventId}
    })
    //.then(_ => getEvents())
    .then(_ => {
        setMsg("New Link between event and stages created");
        setOpen(true);
        console.log(stage);
        console.log(events.slice(-1).pop().eventId);
    })
      .catch((err) => console.log(err));
  };
  
  //link presenter to the event
  const linkEventPresenter = (presenter) => {
   // getEvents();
    fetch("https://qvik.herokuapp.com/api/v1/link-event-presenter/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {"sourceId":presenter, "destinationId":events.slice(-1).pop().eventId}
    })
    //.then(_ => getEvents())
    .then(_ => {
        setMsg("New Link between event and presenters created");
        setOpen(true);
        console.log(presenter);
        console.log(events.slice(-1).pop().eventId);
    })
      .catch((err) => console.log(err));
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
