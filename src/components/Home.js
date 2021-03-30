import React, {useEffect, useState} from "react";
import {Events} from './Events'

function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      getEventsData();
      
    } 
    fetchData()
  }, []) 

  const getEventsData = () => {
      fetch('https://qvik.herokuapp.com/api/v1/events')
      .then(response => response.json())
      .then(data => {
          return setData(
              data.map((data,index) => ({
                  id:index,
                  eventName: data.title,
                  location: data.stage.name
              }))
          )
          })
      .catch(err => console.error(err))
    }  

  return data ? <Events preloadedValues={data}/> : <div>Loading...</div>
      /*
      return(
        <div style={{marginLeft: '150px'}}>
           <h1>Home page</h1>
        </div>
        
      );
      */
    }

export default Home;