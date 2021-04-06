import React, {useEffect, useState} from "react";
import {Events} from './Events'

function Home() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
      getEvents();
      console.log(events);
    }, []);

  const getEvents = () => {
    fetch('https://qvik.herokuapp.com/api/v1/events')
    .then(response => response.json())
    .then(data => setEvents(data.data))
    .catch(err => console.error(err))

}
  return (
        <div style={{marginLeft: '150px'}}>
           <h1>Home page</h1>
           <h2>{events.data}</h2>
        </div>
        
      );
      
    }

export default Home;