import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from '../redux/actions/restaurants';
import EditRestaurant from "./restaurants/editRestaurant";
import AddRestaurant from "./restaurants/addRestaurant";
import DeleteRestaurant from "./restaurants/deleteRestaurant";

function Restaurants() {

  //const [resturants, setRestaurants] = useState([]);
  const gridRef = useRef();  
  const restaurants = useSelector(state => state.restaurantReducer.restaurants);
  const dispatch = useDispatch();
  const fetchRestaurants = () => dispatch(getRestaurants());

  useEffect(() => {
    const fetchData = async () => {
      fetchRestaurants()
    }
    fetchData()
  }, []);

  //set columns for the table
  const columns = [
    //{headerName: "Id", field: "restaurantId", sortable: true, filter: true, resizable: true },
    {headerName: "Name", field: "name", sortable: true, filter: true, resizable: true },
    {headerName: "Short description", field: "shortDescription", sortable: true, filter: true, resizable: true },
    {
      headerName: "",
      field: "",
      cellRendererFramework: (params, index) => <EditRestaurant key={index} rest={params.data} />
    },
    {
      headerName: "",
      field: "",
      cellRendererFramework: params => <DeleteRestaurant rest={params.data} />
    }
  ];

  return(
    <div style={{marginLeft: '150px'}}>
    <h1>Restaurants page</h1>
    <AddRestaurant />
    <div style ={{height: "700px", width: "95%", margin: "auto"}}>
          <AgGridReact 
              ref = {gridRef}
              onGridReady = { params => {
                  gridRef.current = params.api;
                  params.api.sizeColumnsToFit();
              }}
              columnDefs = {columns}
              suppressCellSelection = {true}
              rowData = {restaurants}
              pagination = {true}
              paginationPageSize = {10}
          >
          </AgGridReact>
      </div>
  </div>
  );
}

export default Restaurants;