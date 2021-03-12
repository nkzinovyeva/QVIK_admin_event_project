import React from "react";
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';


function Events() {

      return(
        <div style={{marginLeft: '150px'}}>
          <h1>Events page</h1>
          <form noValidate autoComplete="off">
            <div>
              <TextField helperText="Event name" id="standard-basic" label="Nights of Arts" />
            </div>
            <div>
              <TextField helperText="Location" id="standard-basic" label="Helsinki" />
            </div>
          </form>
        </div>
        
      );
    }

export default Events;