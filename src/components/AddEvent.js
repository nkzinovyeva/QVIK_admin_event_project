import React, {useState} from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, Tooltip, 
  DialogContentText, DialogTitle, IconButton}  from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

/*
* add event modal
*/
function AddEvent(props) {

  //set constants  
  const [open, setOpen] = useState(false);
  const [subevent, setSubevent] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    title: "",
    shortDescription: "",
    fullDescription: ""
  });
  
  const handleClickOpen = () => {
    setOpen(true);
  };
     
  const handleClose = () => {
    setOpen(false);
	};

	const handleInputChange = e => {
    setSubevent({ ...subevent, [e.target.name]: e.target.value });
  };
    
  const handleSave = () => {
    props.createEvent(subevent);
    handleClose()
  };

  return (
    <div> 
      <Tooltip title="Add a new subevent" >
            <IconButton variant="contained"
                        color="primary" 
                        size="small" 
                        aria-label="Add a new subevent" 
                        onClick={handleClickOpen} > Add subevent
                <AddIcon />  
            </IconButton> 
        </Tooltip>
      <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">New Subevent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new subevent provide the info.
          </DialogContentText>
            <TextField
                autoFocus
                name="startDate"
                value={subevent.startDate}
                onChange = {handleInputChange}
                margin="dense"
                label="Start Date"
                type="date"
                fullWidth
            />
            <TextField
                name="startTime"
                value={subevent.startTime}
                onChange = {handleInputChange}
                margin="dense"
                label="Start Time"
                type="time"
                fullWidth
            />
            <TextField
                name="endDate"
                value={subevent.endDate}
                onChange = {handleInputChange}
                margin="dense"
                label="End Date"
                type="date"
                fullWidth
            />
            <TextField
                name="endTime"
                value={subevent.endTime}
                onChange = {handleInputChange}
                margin="dense"
                label="End Time"
                type="time"
                fullWidth
            />
            <TextField
                name="title"
                value={subevent.title}
                onChange = {handleInputChange}
                margin="dense"
                label="Title"
                fullWidth
            />
            <TextField
                name="shortDescription"
                value={subevent.shortDescription}
                onChange = {handleInputChange}
                margin="dense"
                label="Short Description"
                fullWidth
            />
            <TextField
                name="fullDescription"
                value={subevent.fullDescription}
                onChange = {handleInputChange}
                margin="dense"
                label="Full Description"
                fullWidth
            />
            <TextField
                name="stage"
                value={subevent.stage}
                onChange = {handleInputChange}
                margin="dense"
                label="Stage"
                fullWidth
            />
            <TextField
                name="presenters"
                value={subevent.presenters}
                onChange = {handleInputChange}
                margin="dense"
                label="Presenters"
                fullWidth
            />
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};

export default AddEvent;