import React from "react";
import FormControl from '@material-ui/core/FormControl';
import { useForm } from "react-hook-form";

import TextField from '@material-ui/core/TextField';

export function Events({preloadedValues}) {
    const { register, handleSubmit } = useForm({
      defaultValues: preloadedValues
    });

  const onSubmit = (data) => {
      alert(JSON.stringify(data));
  };
      return(
        <div style={{marginLeft: '150px'}}>
          <h1>Events page</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input 
                helperText="Event name" 
                id="standard-basic" 
                name="eventName" 
                ref={register}
              />
            </div>
            <div>
              <input 
                helperText="Location" 
                id="standard-basic" 
                name="location" 
                ref={register}
              />
            </div>
          </form>
        </div>
        
      );
    }

export default Events;