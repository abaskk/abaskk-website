import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useEffect, useState } from 'react'
import { Routes,Route } from "react-router-dom";
import axios from "axios"
import { backendUrl } from './utils/backend.js'

const App = () =>{

    const [userInfo,setUserInfo] = useState({})
    const [loading, setLoad] = useState(true)

    const fetchData = async () =>{
        const api = axios.create({
            headers: {
                "Content-type": "application/json",
            },
        });

        const allInfo = await api.get(`${backendUrl}/api/info`)

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
