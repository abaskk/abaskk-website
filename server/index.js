const express = require('express')
const Session = require("./session")
const fs = require('fs');
const bcrypt = require('bcrypt');
const uuid = require("uuid")
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      credentials: true,
    })
  );


const PORT = process.env.PORT || 8080



userSessions = {}


app.listen(PORT, () => console.log(`server running on port ${PORT}`))


app.get('/get_info', (req, res) => {
    res.send(JSON.parse(info))
    res.end()
  })


app.post("/auth",(req,res) => {
    const password = req.body["password"];
    bcrypt.compare(password,process.env.PASSWORD, (err, result) => {
        if(err){
          console.log(err)
          res.send(false)
          return
        }

        if (result == true){
            const userId = uuid.v4()
            const currTime = new Date()
            // 24 hour cookie
            const cookieLength = 60 * 60 * 24 * 1000
            const expiryTime = new Date(currTime.getTime() + cookieLength)
            const newSess = new Session(userId, expiryTime)
            userSessions[userId] = newSess
            res.cookie('uuid', userId, { expires: expiryTime , httpOnly: true });
            res.send(true)
      

        }else{
            res.send(false)
        
        }
        res.end()
        
    });
})

app.get("/has_permission", (req,res) => {

    if(!req.cookies){
      res.send(false)
      return
    }
    const userToken = req.cookies['uuid']
    if (!userToken){
      res.send(false)
      return
    }

    if(userToken in userSessions === false ){
      res.send(false)
      return
    }else if(userSessions[userToken].hasExpired()){
      res.send(false)
      return
    }else{
      res.send(true)
    }

})


app.get("/info", (req,res) => {
    const info = fs.readFileSync("info.json");
    const data = info.toString()
    res.send(JSON.parse(data))

})

// protected endpoint
app.post("/modify_data", (req,res) =>{
  if(!req.cookies){
    res.send("unauthorized access")
    return
  }
  const userToken = req.cookies['uuid']
  if(!userToken){
    res.send("unauthorized access")
    return
  }

  if(userToken in userSessions === false ){
    res.send("unauthorized access")
    return
  }else if(userSessions[userToken].hasExpired()){
    res.send("unauthorized access")
    return
  }
  const modData = req.body["newJson"]
  fs.writeFile('info.json', modData, function (err) {
    if(err){
      console.log(err)
      res.send("failed")
    }
  });
  res.send("success")

})


