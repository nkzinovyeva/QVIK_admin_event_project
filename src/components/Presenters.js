import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useDispatch, useSelector } from "react-redux";
import { getPresenters, } from '../redux/actions/presenters';
import EditPresenter from "./presenters/editPresenter";
import AddPresenter from "./presenters/addPresenter";
import DeletePresenter from "./presenters/deletePresenter";

function Presenters() {

  const gridRef = useRef();
  const presenters = useSelector(state => state.presenterReducer.presenters)
  const dispatch = useDispatch();
  const fetchPresenters = () => dispatch(getPresenters());

  useEffect(() => {
    const fetchData = async () => {
        fetchPresenters()
    } 
    fetchData()
  }, []) 


  //set columns for the table
  const columns = [
      {headerName: "Name", field: "name", sortable: true, filter: true, resizable: true },
      //{headerName: "contact", field: "contact", sortable: true, filter: true, resizable: true },
      //{headerName: "ShortDescription", field: "shortDescription", sortable: true, filter: true, resizable: true },
      {headerName: "", 
          field: "", 
          cellRendererFramework: (params, index) => <EditPresenter key={index} presenter={params.data} /> 
      },
      {headerName: "", 
          field: "", 
          cellRendererFramework: params => <DeletePresenter presenter={params.data} />
      }
  ];

    return  (
      <div >
        <h3>Hosts</h3>
        <AddPresenter />
          <div style ={{height: "700px", width: "95%" , margin: "auto"}}>
                <AgGridReact 
                    ref = {gridRef}
                    onGridReady = { params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                        params.api.refreshCells()
                    }}
                    columnDefs = {columns}
                    suppressCellSelection = {true}
                    rowData = {presenters}
                    pagination = {true}
                    paginationPageSize = {10}
                >
                </AgGridReact>
            </div>
      </div>
      )
    }

export default Presenters;
