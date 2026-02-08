import { useState } from 'react';
import './RegistrationForm.css';
const RegistrationForm=()=>{
    const[details,setDetails]=useState({name:"",password:"",email:""});
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
               const result=await fetch('http://localhost:3000/api/register',
            {
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(details)
            }
        )
        const result1=await result.json();
        alert(result1.message);
        location.reload();
     

        }
        catch(error)
        {
            console.error("Error : ",error)
        }     
        
    }

    return(
        <>
        <fieldset className='fieldset'>
        <legend>Registration Form</legend>
        <form onSubmit={handlesubmit}>
            <label>Full Name : </label>
         
            <input type="text" value={details.name} onChange={e=>setDetails((prev)=>({...prev,name:e.target.value}))}/>
               <br/>
            <label>Email : </label>
           
            <input type="email" value={details.email} onChange={e=>setDetails((prev)=>({...prev,email:e.target.value}))}/>
            <br/> 
            <label>Password : </label>
            
            <input type="password" value={details.password} onChange={e=>setDetails((prev)=>({...prev,password:e.target.value}))}/>
            <br/>
            <br/>
            <button type="submit">Submit</button>
        </form>
        </fieldset>
      
        </>
    )
}
export default RegistrationForm;