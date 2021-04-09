import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import {Event} from './Event'

function Events() {

  const [events, setEvents] = useState([]);
  const gridRef = useRef();  

    /*useEffect(() => {
        getEvents();
        console.log('events', events)
    }, []);
    */

    useEffect(() => {
      const fetchData = async () => {
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
        fetch("https://qvik.herokuapp.com/api/v1/events")
          .then((response) => response.json())
          .then((jsondata) => { 
            console.log('jsondata', jsondata.data[0].data )
            setEvents(jsondata.data[0].data);
          })
            .catch(err => console.error(err));
    };

    

    return  events ? <Event preloadedValues={events}/> : <div>Loading...</div>
    /*(
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
      
    );*/
    }

export default Events;
