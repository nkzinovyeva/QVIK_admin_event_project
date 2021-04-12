import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import {Event} from './Event';
import EditEvent from "./EditEvent";


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

  const handleClose = () => {
    setOpen(false);
  };

  //set columns for the table
  const columns = [
      {headerName: "Title", field: "title", sortable: true, filter: true, resizable: true },
      {headerName: "Short description", field: "shortDescription", sortable: true, filter: true, resizable: true },
      {headerName: "", 
          field: "", 
          cellRendererFramework: params => <EditEvent updateEvent={updateEvent} event={params.data}/>
      }  
  ];

  //get events from the database
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
      fetch("https://qvik.herokuapp.com/api/v1/events/"+ id, {
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

    //get mainEvent from the database
    const getMainEvent = () => {
        fetch("https://qvik.herokuapp.com/api/v1/initial-setup")
          .then((response) => response.json())
          .then((jsondata) => { 
            setMainEvent(jsondata.data);
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

    

    return  (
      mainEvent ? 
      <div style={{marginLeft: '150px'}}>
        <Event preloadedValues={mainEvent} tagsList={tags}/>
        <h3>Sub-events</h3>
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
