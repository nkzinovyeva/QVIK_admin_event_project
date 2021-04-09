import React, {useEffect} from "react";
import { useForm } from "react-hook-form";

export function Event({preloadedValues}) {
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues[0]
  });

  useEffect(() => {
        console.log('values', preloadedValues)
    }, []);

  const onSubmit = (events) => {
    alert(JSON.stringify(events));
  };

  return (
    <div style={{marginLeft: '150px'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Event</h3>
            <input
            ref={register}
            placeholder="title"
            type="text"
            name="title"
            />
            <input
            ref={register}
            placeholder="shortDescription"
            type="text"
            name="shortDescription"
            />
            <br></br>
            <h3>Date</h3>
            <input
            ref={register}
            placeholder="startDate"
            type="date"
            name="startDate"
            />
            <input
            ref={register}
            placeholder="startTime"
            type="time"
            name="startTime"
            />
            <br></br>
            <h3>Stage</h3>
            <input
            ref={register}
            placeholder="stage"
            type="text"
            name="stage.name"
            />
        </form>
    </div>
  );
}