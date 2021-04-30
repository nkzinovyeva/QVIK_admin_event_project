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
            field: "", 
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


    return  (
      mainEvent ? 
      <div style={{marginLeft: '150px'}}>
        <Event preloadedValues={mainEvent} tagsList={tags}/>
        <h3>Sub-events</h3>
        <AddEvent />
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
