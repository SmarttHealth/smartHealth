const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const connectDb = require("./models/db")
const userRoutes = require("./routes/user.routes")

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use('/api/users', userRoutes)
connectDb()
    .then(()=>{
        console.log("db connection succeeded");
        app.listen(8082, ()=>{console.log('server started at 8082 !!');})
    })
    .catch(err => console.log(err))
