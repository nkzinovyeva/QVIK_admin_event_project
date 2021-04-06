import React, { useState, useEffect, useRef } from "react";
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";


function Events() {

  const [events, setEvents] = useState([]);
  const gridRef = useRef();

    useEffect(() => {
        getEvents();
        //console.log('event', events[0].data)
    }, []);
    
    useEffect(() => {
      console.log(events);
    }, [events])
    //set columns for the table
    const columns = [
        {headerName: "Id", field: "eventId", sortable: true, filter: true, resizable: true },
        {headerName: "Title", field: "title", sortable: true, filter: true, resizable: true },
        {headerName: "Short description", field: "shortDescription", sortable: true, filter: true, resizable: true },
    ];
    
    //get customers from the database
    const getEvents = () => {
        fetch("https://qvik.herokuapp.com/api/v1/events")
            .then(response => response.json())
            .then(data => setEvents(data.data))
            .catch(err => console.error(err));
    };

      return(
        <div style={{marginLeft: '150px'}}>
          <h1>Events page</h1>
          <h2>{events[0].data.title}</h2>
        </div>
        
      );
    }

export default Events;

/*
<form noValidate autoComplete="off">
            <div>
              <TextField helperText="Event name" id="standard-basic" label="Nights of Arts" />
            </div>
            <div>
              <TextField helperText="Location" id="standard-basic" label="Helsinki" />
            </div>
            <div style ={{height: "700px", width: "95%", margin: "auto"}}>
                <AgGridReact 
                    ref = {gridRef}
                    onGridReady = { params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs = {columns}
                    suppressCellSelection = {true}
                    rowData = {events[0].data}
                    pagination = {true}
                    paginationPageSize = {10}
                >
                </AgGridReact>
            </div>
          </form>
          */