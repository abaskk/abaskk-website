import { useEffect } from "react"
import { Navigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react";

const api = axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
  });



const ProtectedRoute = ({children}) =>{

    const [isAdmin,setAdmin] = useState(false)
    const [loading, setLoad] = useState(true)

    const hasCookie = async () =>{
        try{
            const checkCookie = await api.get("http://ec2-18-206-156-112.compute-1.amazonaws.com:8080/has_permission")
            setAdmin(checkCookie.data)
            setLoad(false)

        }catch(err){
            console.log(err)

        }
    }

    useEffect(() => {
        hasCookie()
    }, [])
    
    if(loading){
        return
    }

    return(
        isAdmin ? children : <Navigate to="/login" replace/>
    )


}

export default ProtectedRoute