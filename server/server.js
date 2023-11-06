require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus:200
}

app.use(cors(corsOptions));

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database')); 

app.get("/", (req, res) =>{
    res.sendStatus(200);
})

app.get('/test', (req, res) => {
    res.status(200).send('Test route');
});



// Setting up url routes for users
const signupRouter = require("./routes/signups");
app.use(express.json());
app.use("/signups", signupRouter);

app.listen(4000, () => console.log("Server Started")); 

