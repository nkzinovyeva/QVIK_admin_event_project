import React, { useEffect, useRef } from "react";
import { useDispatch, connect } from "react-redux";
import { fetchAllEvents } from "../../redux/actions";
import { AgGridReact } from "ag-grid-react";
import EditEvent from "./editEvent"
import DeleteEvent from "./deleteEvent"

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

const SubEventList = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

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
        rowData={props.events}
        pagination={true}
        paginationAutoPageSize={10}
      >
      </AgGridReact>
    </div>
  );
};

export default connect((state) => {
  return { events: state.events.eventsData };
}, {}
)(SubEventList);