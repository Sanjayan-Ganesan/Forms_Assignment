import React, { useEffect, useState } from 'react'
import './Forms.css'
//import Display from './Display'
import './Display.css'
const Forms = () => {

  const[form,setform] = useState({
    name:"",
    age:"",
    address:"",
    department:"",
    salary:"",
    single:"",
    married:"",
    photo:"",
  })

  const[task,settask] = useState([]);
  const[totalcount,settotalcount] = useState(0);


const handlechange = (e)=>{

let {type,name,value,checked} = e.target;
console.log(type,name,value,checked);


if(type === "radio"){
  setform({
    ...form,
    [name]:checked,
  });
}else{
  setform({
    ...form,
    [name]:value,
  });

}



};


const handlesave = (e)=>{

  e.preventDefault();
  fetch("http://localhost:8080/Forms",{
    method:"POST",
    headers:{
      "content-type" : "application/json",
    },
    body:JSON.stringify({
      name: form.name,
      age: form.age,
      address: form.address,
      department: form.department,
      salary: form.salary,
      single: form.single,
      married: form.married,
      photo:form.photo,
    }),
  })
  .then((r)=> r.json())
  .then((d)=>{
    settask([...task,d]);
    setform(" ");
  })

}


const get_data = async ()=>{

await axios.get("http://localhost:8080/Forms").then((r)=>{


settask(r.data);



})

}



useEffect(()=>{
  get_data();
})

  return (
      <>


<div id='form_box'>

<div id='forms_box'>

<h2>Employee Registration Form</h2>
<form>

<div id='data_box'>
<label><h4>Name:</h4></label>
<input type={`text`} placeholder='Enter Name' value={form.name} onChange={handlechange} name='name'/>
</div>

<div id='data_box'>
<label><h4>Age:</h4></label>
<input type={`text`} placeholder='Enter Age' value={form.age} onChange={handlechange} name='age'/>
</div>

<div id='data_box'>
<label><h4>Address:</h4></label>
<input type={`text`} placeholder='Enter Address' value={form.address} onChange={handlechange} name='address'/>
</div>

<div id='data_box'>
<label><h4>Department</h4></label>
<select id='department' name='department' value={form.department} onChange={handlechange} >
  <option id='Operations' name='Operations'>Operations</option>
  <option id='Hr' name='Hr'>Hr</option>
  <option id='Sales' name='Sales'>Sales</option>
  <option id='Business' name='Business'>Business</option>
</select>
</div>

<div id='data_box'>
<label><h4>Salary</h4></label>
<input type={`text`} placeholder='Enter Salary' value={form.salary} onChange={handlechange} name='salary'/>

</div>

<div id='data_box'>
<label><h4>Martial Status</h4></label>
<input type={`radio`} value='single' onChange={handlechange} name='single'/>
<label>Single</label>
<input type={`radio`} value='married' onChange={handlechange} name='married'/>
<label>Married</label>
</div>

<div id='data_box'>
<label><h4>Profile Photo</h4></label>
<input type={`text`} placeholder='Enter Image Url' value={form.photo} onChange={handlechange} name='photo'/>

</div>
<br></br>
<div id='data_box'>
  <input type={`submit`} onClick={handlesave} />

</div>


</form>

</div>
    
</div>
   

<div id='main_box'>

  <div id='table_box'>

  <table>
 
    {task.map((tasks)=>{

      return(

        <>

        <div>
        <tr>
             <th>S.No</th> 
              <th>Employee Name</th>
             <th>Employee Age</th>
             <th>Employee Address</th> 
              <th>Employee Department</th>
              <th>Employee Salary</th>
              <th>Employee Photo</th>
              </tr>
          
           
           

            <tr>
              <td>{tasks.id}</td>
              <td>{tasks.name}</td>
              <td>{tasks.age}</td>
              <td>{tasks.address}</td>
              <td>{tasks.department}</td>
              <td>{tasks.salary}</td>
              <td><img src={tasks.photo}></img></td>
            </tr>


          

          
        </div>
        
        
        
        </>
      )

     

    })}

 
 </table>

  </div>



</div>



      </>
    
  )
}

export default Forms