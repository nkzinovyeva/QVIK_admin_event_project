import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, getMainEvent } from '../redux/actions/events';
import {Event} from './Event';
import AddEvent from "./events/addEvent";
import EditEvent from "./events/editEvent";
import DeleteEvent from "./events/deleteEvent";


function Events() {

  const gridRef = useRef();
  const mainEvent = useSelector(state => state.eventReducer.mainEvent)
  const events = useSelector(state => state.eventReducer.events)
  const dispatch = useDispatch();
  const fetchEvents = () => dispatch(getEvents());
  const fetchMainEvent = () => dispatch(getMainEvent());

  useEffect(() => {
    const fetchData = async () => {
      fetchMainEvent()
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
          cellRendererFramework: (params, index) => <EditEvent key={index} event={params.data} /> 
      },
      {headerName: "", 
          field: "", 
          cellRendererFramework: params => <DeleteEvent event={params.data} />
      }
  ];

    return  (
      mainEvent ? 
      <div style={{marginLeft: '150px'}}>
        <Event />
        <h3>Sub-events</h3>
        <AddEvent />
          <div style ={{height: "700px", width: "95%", margin: "auto"}}>
                <AgGridReact 
                    ref = {gridRef}
                    onGridReady = { params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                        params.api.refreshCells()
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
