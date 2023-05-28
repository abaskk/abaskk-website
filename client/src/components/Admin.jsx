import { useEffect, useState } from "react"
import axios from "axios"

const api = axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
    },
  });

const Admin = (props) => {

    const currJson = props.userData
    let editData = JSON.stringify(currJson,null,"\t")
    const [userInfo,setUserInfo] = useState(editData)
    const [errMsg,setErrMsg] = useState('')

    const updateUserData = async (e) => {
        e.preventDefault()
        try{
            JSON.parse(userInfo)
        }catch(err){
            setErrMsg("Invalid JSON formatting")
        }

        try{
            const response = await api.post("http://server:8080/modify_data",
              {newJson:userInfo})
            if(response.data == "failed"){
                setErrMsg("Server write failed, try later")
            }else if(response.data == "unauthorized access"){
                setErrMsg("Unauthorized access")
            }else{
                setErrMsg("Success!")
            }

        }catch(err){
            setErrMsg("The server has problems &#128543;")
        }
          

    }

    useEffect(() => {
        setErrMsg('')
      },[userInfo])

    

    return (
    <div className="justify-items-center text-white py-28 container mx-auto px-8 sm:px-20 lg:px-36 xl:px-64">
        <div className="my-3">
            <p className="text-2xl">Update Information</p>
        </div>
        <div className="my-2">
            <textarea rows ="50" className=" rounded p-8 bg-dark_purp focus:outline-none w-full h-full
            focus:ring-pastel_red focus:border-pastel_red" value={userInfo} onChange={e => setUserInfo(e.target.value)}>
            </textarea>
        </div>
        <div className="text-center my-2">
        <button className="bg-pastel_red p-2  rounded" type="submit" onClick={updateUserData}>Update</button>
        </div>
        <div className="my-2 text-center text-pastel_red">
            <p>{errMsg}</p>
        </div>
    </div>
    )
    

}

export default Admin