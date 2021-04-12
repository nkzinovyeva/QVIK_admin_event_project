import React from "react";
import {Button, TextField, Dialog, DialogActions, DialogContent, Tooltip, 
  DialogContentText, DialogTitle, IconButton}  from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

/*
* edit event modal
*/
function EditEvent (props) {

console.log('props', props)
  
  //set constants
  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = React.useState({
    startDate: '', 
    startTime:'', 
    endDate:'', 
    endTime:'', 
    title:'', 
    shortDescription:'',
    fullDescription: '',
    active: true, 
    mainEvent: false
  });

  const handleClickOpen = () => {
    setEvent({
        startDate: props.event.startDate,
        startTime: props.event.startTime,
        endDate: props.event.endDate,
        endTime: props.event.endTime,
        title: props.event.title, 
        shortDescription: props.event.shortDescription,
        fullDescription: props.event.fullDescription,
        active: props.event.active,
        mainEvent: props.event.mainEvent
    })
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  //update handler
  const updateEvent = () => {
    props.updateEvent(event, props.event.eventId);
    handleClose();
  };

  const handleInputChange = (event) => {
    setEvent({...event, [event.target.name]: event.target.value})
  };
  
  return (
    <div>
        <Tooltip title="Edit event">
            <IconButton variant="text" 
                        color="primary" 
                        size="small" 
                        aria-label="edit" 
                        onClick={handleClickOpen} >
                EDIT
            </IconButton> 
        </Tooltip>
        <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit event</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Provide new info for the event
            </DialogContentText>
            <TextField
                autoFocus
                name="startDate"
                value={event.startDate}
                onChange = {handleInputChange}
                margin="dense"
                label="start Date"
                fullWidth
            />
            <TextField
                name="startTime"
                value={event.startTime}
                onChange = {handleInputChange}
                margin="dense"
                label="start Time"
                fullWidth
            />
            <TextField
                name="endTime"
                value={event.endTime}
                onChange = {handleInputChange}
                margin="dense"
                label="end Time"
                fullWidth
            />
            <TextField
                name="endDate"
                value={event.endDate}
                onChange = {handleInputChange}
                margin="dense"
                label="end Date"
                fullWidth
            />
            <TextField
                name="title"
                value={event.title}
                onChange = {handleInputChange}
                margin="dense"
                label="title"
                fullWidth
            />
            <TextField
                name="shortDescription"
                value={event.shortDescription}
                onChange = {handleInputChange}
                margin="dense"
                label="short Description"
                fullWidth
            />
            <TextField
                name="fullDescription"
                value={event.fullDescription}
                onChange = {handleInputChange}
                margin="dense"
                label="full Description"
                fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={updateEvent} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default EditEvent;