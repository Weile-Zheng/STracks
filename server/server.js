const express = require('express');
const app = express();

// Setting up route when user make a get request at url "/"
app.get("/", (req, res) =>{
    console.log("here");
    res.sendStatus(500);
})

const userRouter = require("./routes/users");
app.use("/users", userRouter);
app.listen(4000); 

