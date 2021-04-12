import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import EditEvent from "./EditEvent";

function Events() {

  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const gridRef = useRef();
  let link = "https://qvik.herokuapp.com/api/v1/events" 

    useEffect(() => {
        getEvents();
        console.log('events', events)
    }, []);

    const handleClose = () => {
        setOpen(false);
    };
    
/*
    useEffect(() => {
      const fetchData = async () => {
        setEvents(await getEvents())
      } 
      fetchData()
    }, []) 
*/
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
    const updateEvent = (event, link) => {
        fetch(link + "/"+ event.eventId, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event)
        })
        .then(_ => getEvents())
        .then(_ => {
            setMsg("Event updated");
            setOpen(true);
        })
          .catch((err) => console.log(err));
    };

    

    //return  events ? <Event preloadedValues={events}/> : <div>Loading...</div>
    return (
      <div style={{marginLeft: '150px'}}>
        <h1>Events page</h1>
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
          <div>
          
          </div>
      </div>
      
    );
    }

export default Events;
