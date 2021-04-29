import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";

export function Event({preloadedValues, tagsList}) {
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  });
  const [tags, setTags] = useState([]);

  useEffect(() => {
        console.log('values', preloadedValues)
        console.log('tagslist', tagsList)
        setTags(tagsList);
    }, []);

  const onSubmit = (events) => {
    alert(JSON.stringify(events));
  };

  return (
    <div> 
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
            <h3>Tags</h3>
            {
            tags.map((tag) => (
                <li key={tag.tagId}>
                  {tag.name}
                </li>
                
              ))}
              
            
        </form>
    </div>
  );
}
