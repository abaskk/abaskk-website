import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { useEffect, useState } from 'react'
import { Routes,Route } from "react-router-dom";
import axios from "axios"


const api = axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
  });

const App = () =>{

    const [userInfo,setUserInfo] = useState({})
    const [loading, setLoad] = useState(true)

    const fetchData = async () =>{
        const allInfo = await api.get("http://ec2-3-92-200-251.compute-1.amazonaws.com:8080/info")
        setUserInfo(allInfo.data)
        setLoad(false)
    }

    useEffect( () => {
        fetchData()
    },[])


    if(loading){
        return
    }
    //console.log(userInfo)

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