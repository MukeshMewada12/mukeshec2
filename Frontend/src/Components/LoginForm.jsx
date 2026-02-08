import { useState } from 'react';
import './LoginForm.css';
const LoginForm=()=>{
    const [details,setDetails]=useState({email:"",password:""});
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log("===========================",details);
        try
        {
            const data=await fetch('http://localhost:3000/api/login',
                {
                    method:"POST",
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(details)
                }
            )
            const result=await data.json();
            alert(result.message);

        }
        catch(error)
        {
            console.log(error);
        }
    }
    return(
        <>
        <fieldset>
            <legend>Login Fomr</legend>
            <form onSubmit={handlesubmit}>
               <label>UserName : </label>
               <input type="text" value={details.email} onChange={e=>setDetails((prev)=>({...prev,email:e.target.value}))}/>
               <br/>
               <label>Password : </label>
               <input type="text" value={details.password} onChange={e=>setDetails((prev)=>({...prev,password:e.target.value}))}/>
               <br/>
               <button type="submit">Submit</button>

            </form>
        </fieldset>
        </>
    )
}
export default LoginForm;