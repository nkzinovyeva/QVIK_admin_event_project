import React, { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { useDispatch, useSelector } from "react-redux";
import { getStages } from '../redux/actions/stages';
import EditStage from "./stages/editStage";
import AddStage from "./stages/addStage";
import DeleteStage from "./stages/deleteStage";

function Stages() {

  const gridRef = useRef();
  const stages = useSelector(state => state.stageReducer.stages)
  const dispatch = useDispatch();
  const fetchStages = () => dispatch(getStages());

  useEffect(() => {
    const fetchData = async () => {
      fetchStages()
    } 
    fetchData()
  }, []) 


  //set columns for the table
  const columns = [
      {headerName: "Name", field: "name", sortable: true, filter: true, resizable: true },
      {headerName: "Location", field: "location", sortable: true, filter: true, resizable: true },
      {headerName: "Capacity", field: "capacity", sortable: true, filter: true, resizable: true },
      {headerName: "", 
          field: "", 
          cellRendererFramework: (params, index) => <EditStage key={index} stage={params.data} /> 
      },
      {headerName: "", 
          field: "", 
          cellRendererFramework: params => <DeleteStage stage={params.data} />
      }
  ];

    return  (
      <div style={{marginLeft: '150px'}}>
        <h3>Stages</h3>
        <AddStage />
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
                    rowData = {stages}
                    pagination = {true}
                    paginationPageSize = {10}
                >
                </AgGridReact>
            </div>
      </div>
      )
    }

export default Stages;
