import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
 const [username,setUsername]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const[error,setError]=useState({})
 const[success,setSuccess]=useState(false)
 const [loading,setLoading]=useState(false)


const handleRegistration=async(e)=>{
  e.preventDefault();
  setLoading(true);
 const userData={
    username,email,password
 }
try{
const res=await  axios.post('http://127.0.0.1:8000/api/v1/register/',userData)
console.log('response.data==>',res.data)
console.log('registartion successful');
setError({})
setSuccess(true)
}catch(error){
    // when their is error we set to error
    setError(error.response.data)
 
}finally{
    setLoading(false)
}

}
 
  return (
   <>
   
   <div className="container">
    <div className="row justify-content-center">
        <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-4">Create Account</h3>
            <form onSubmit={handleRegistration}>
               <div className='mb-4'>
                 <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} className='form-control' placeholder='Enter username'/>
             {error?.username && <div className='text-danger'>{error.username}</div>}
               </div>
               <div className='mb-4'>
                 <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='form-control' placeholder='Enter email address'/>
       
               </div>
                <div className='mb-4'>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}   value={password} className='form-control mb-2' placeholder='Set password'/>
                    {error?.password && <div className='text-danger'>{error.password} </div>}
                </div>
                {success && <div className='alert alert-success'>Registration Successful </div>}
                   <button type='submit' className='btn btn-info d-block mx-auto' disabled={loading}>
                   {loading ? (
                    <>
                    <FontAwesomeIcon icon={faSpinner} spin className='me-2'  />
                    please wait....
                    
                    </>

                   )  : (
                    <button className='btn btn-info d-block mx-auto'>Register </button>
                   )}
                   </button>
           
            </form>

        </div>
    </div>
   </div>
   </>
  )
}

export default Register