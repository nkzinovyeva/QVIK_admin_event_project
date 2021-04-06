import React, {useEffect, useState} from "react";
import {Events} from './Events'

function Home() {
  const [data, setData] = useState([])

  

  return data ? <Events /> : <div>Loading...</div>
      /*
      return(
        <div style={{marginLeft: '150px'}}>
           <h1>Home page</h1>
        </div>
        
      );
      */
    }

export default Home;