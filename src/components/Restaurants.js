import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Restaurants() {

  const [resturants, setRestaurants] = useState([]);
  const gridRef = useRef();  

  useEffect(() => {
    getRestaurants();
      //console.log('events', events)
  }, []);

  //set columns for the table
  const columns = [
    {headerName: "Id", field: "restaurantId", sortable: true, filter: true, resizable: true },
    {headerName: "Name", field: "name", sortable: true, filter: true, resizable: true },
    {headerName: "Short description", field: "shortDescription", sortable: true, filter: true, resizable: true },
  ];

  //get customers from the database
  const getRestaurants = () => {
    fetch("https://qvik.herokuapp.com/api/v1/restaurants")
      .then((response) => response.json())
      .then((jsondata) => { 
        console.log('restaurants', jsondata.data.restaurants )
        setRestaurants(jsondata.data.restaurants);
      })
    .catch(err => console.error(err));
  };

  return(
    <div style={{marginLeft: '150px'}}>
    <h1>Restaurants page</h1>
    <div style ={{height: "700px", width: "95%", margin: "auto"}}>
          <AgGridReact 
              ref = {gridRef}
              onGridReady = { params => {
                  gridRef.current = params.api;
                  params.api.sizeColumnsToFit();
              }}
              columnDefs = {columns}
              suppressCellSelection = {true}
              rowData = {resturants}
              pagination = {true}
              paginationPageSize = {10}
          >
          </AgGridReact>
      </div>
  </div>
  );
}

export default Restaurants;