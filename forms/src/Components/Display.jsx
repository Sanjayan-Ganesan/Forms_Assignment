import React, { useEffect } from 'react'
import './Display.css'
import Forms from './Forms';
import axios from "axios"
const Display = ({props}) => {



const get_data = async ()=>{

    await axios.get("http://localhost:8080/Forms").then((r)=>{

    {props.settask}(r.data);

    });

}

useEffect(()=>{
    get_data();
},[])
  return (
    <>
    
    <div id='main_box'>

<div id='table_box'>

    {props.task.map((todos)=>{

return(
    <>

    <h2>{todos.name}</h2>
    </>
)


    })}


</div>


    </div>
    
    
    
    
    </>
  )
}

export default Display