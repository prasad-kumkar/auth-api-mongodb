const express = require('express')
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const verify = require("./routes/verifyToken")

dotenv.config();

//Import routes
const authRoute = require('./routes/auth')
const postRouter = require('./routes/posts')

//connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log("connected to db!"))


//Middlewares
app.use(express.json())

//Route middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRouter)

app.listen(3000, () => { console.log("Server up and running on 0.0.0.0:3000/...") })
