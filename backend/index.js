const express = require('express')
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const filePath = path.join(__dirname, 'data', 'info.json');
const generateAccessToken = (username) => {
  return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '6h' });
}

const authenticateToken = (req_head)=> {
  const token = req_head && req_head.split(' ')[1]
  if (token == null){
    return false
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const name = decoded["username"]

    if(name != process.env.USERNAME){
      return false
    }

  } catch(err) {
    return false
    
  }
  return true

}


const app = express()
app.use(express.json())
app.use(
    cors({
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization'
    })
  );


const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`server running on port ${PORT}`))



app.get("/api/info", (req,res) => {
  const info = fs.readFileSync(filePath);
  const data = info.toString()
  res.send(JSON.parse(data))
  res.end()

})

app.post("/api/auth",(req,res) => {
    const password = req.body["password"];
    bcrypt.compare(password,process.env.PASSWORD, (err, result) => {
        if(err){
          console.log(err)
          res.send("invalid")
          return
        }

        if (result == true){
            const token = generateAccessToken(process.env.USERNAME);
            res.json(token)
      

        }else{
            res.send("invalid")
        
        }
        res.end()
        
    });
})



app.get("/api/has_permission", (req,res) => {
  const validToken = authenticateToken(req.headers['authorization'])
  if(!validToken){
    res.send(false)
    return
  }
  res.send(true)
  res.end()
})




// protected endpoint
app.post("/api/modify_data", (req,res) =>{
  const validToken = authenticateToken(req.headers['authorization'])
  if(!validToken){
    res.send(false)
    return
  }

  const modData = req.body["newJson"]
  fs.writeFile(filePath, modData, function (err) {
    if(err){
      console.log(err)
      res.send(false)
    }
  });
  res.send(true)
  res.end()

})


