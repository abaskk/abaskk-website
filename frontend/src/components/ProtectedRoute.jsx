import { useEffect } from "react"
import { Navigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react";






const ProtectedRoute = ({children}) =>{

    const [isAdmin,setAdmin] = useState(false)
    const [loading, setLoad] = useState(true)

    const hasCookie = async () =>{
        try{
            const token = localStorage.getItem("jwtToken");
            const api = axios.create({
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            const checkCookie = await api.get("/api/has_permission")
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
