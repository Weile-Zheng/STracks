const express = require("express"); 
const router = express.Router(); 

router.get("/",(req, res) =>{
    res.send("User List")
})

router.get("/new",(req, res) =>{
    res.send("User New Form")
})

// a special object in Node.js that is used to define the public interface of a module.
module.exports = router; 