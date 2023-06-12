import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useEffect, useState } from 'react'
import { Routes,Route } from "react-router-dom";
import aboutMe from "./assets/info.json";
import axios from "axios"

// https://web.dev/how-to-use-local-https/



const App = () =>{

    const [userInfo,setUserInfo] = useState({})
    const [loading, setLoad] = useState(true)

    const fetchData = async () =>{
        const api = axios.create({
            headers: {
                "Content-type": "application/json",
            },
        });
        const allInfo = await api.get("http://amruthbaskar.info:8080/api/info")

        setUserInfo(allInfo.data)
        setLoad(false)
    }

    useEffect( () => {
        fetchData()
    },[])


    if(loading){
        return
    }


    return(
        <Routes>
            <Route index element={<Home userData={userInfo} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin"
                element={
                    <ProtectedRoute>
                        <Admin userData={userInfo} />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    )
}
export default App
