import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getEvents, editEvent } from '../../redux/actions/events';
import { AgGridReact } from "ag-grid-react";
import EditEvent from "./editEvent"
import DeleteEvent from "./deleteEvent"

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const SubEventList = (props) => {

  const events = useSelector(state => state.eventReducer.events)
  const dispatch = useDispatch();
  const fetchEvents = () => dispatch(getEvents());
  const deleteEvent = (id) => dispatch(deleteEvent(id));

  useEffect(() => {
    fetchEvents()
  }, []);

  const columns = [
    {
      headerName: "Title",
      field: "title",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "",
      field: "",
      cellRendererFramework: (params) => <EditEvent event={params.data} />,
    },
    /*{
      headerName: "",
      field: "",
      cellRendererFramework: (params) => <DeleteEvent event={params.data} />,
    },*/
  ];

  const gridRef = useRef();

  return (
    <div
      className="ag-theme-material"
      style={{ height: "400px", width: "80%", margin: "auto" }}
    >
      <AgGridReact
        ref={gridRef}
        onGridReady={(params) => {
          gridRef.current = params.api;
          params.api.sizeColumnsToFit();
        }}
        columnDefs={columns}
        rowData={events}
        pagination={true}
        paginationAutoPageSize={10}
      >
      </AgGridReact>
    </div>
  );
};

export default SubEventList;