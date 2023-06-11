
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';





const Login = () => {
    const [pass, setPass] = useState('');
    const [errorMsg,setErrMsg] = useState('');
    const navigate = useNavigate();

    const loginStatus = async (e) => {
        e.preventDefault()
        try{
          const api = axios.create({
            headers: {
                "Content-type": "application/json",
            },
          });
          const response = await api.post("http://ec2-44-216-125-228.compute-1.amazonaws.com:8080/api/auth",{password:pass})
          const loginData = response.data
          if (loginData === "invalid"){
            setErrMsg("Invalid Credentials")
          }else{
            localStorage.setItem("jwtToken", loginData);
            navigate("/admin")
          }

        }catch(err){
          setErrMsg("Invalid Credentials")
        }
        
    }

    
    // re-renders component when this changes
    useEffect(() => {
      setErrMsg('')
    },[pass])
    

    return (
        <div className="flex items-center justify-center h-screen text-white">
            <div className="bg-dark_purp px-20 justify-items-start rounded">
            <div className="">
             <div className="my-5 w-100">
                <label className="block py-2" htmlFor="password">Your Password</label>
                <input className="rounded focus:outline-none block bg-midnight" 
                type="password" id="password" value={pass} onChange={e => setPass(e.target.value)} required />
             </div>
             
             <div className="my-5">
                <button onClick={loginStatus} className="bg-pastel_red px-3  rounded" type="submit ">Submit</button>
             </div>
             <div className='my-2'>
              <p className='text-center text-pastel_red text-xs'>{errorMsg}</p>

             </div>
             </div>
             
            </div>
            
        </div>
    )
}

export default Login
