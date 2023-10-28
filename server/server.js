require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database')); 

app.get("/", (req, res) =>{
    res.sendStatus(200);
})


// Setting up url routes for users
const signupRouter = require("./routes/signups");
app.use(express.json());
app.use("/signups", signupRouter);

app.listen(4000, () => console.log("Server Started")); 

