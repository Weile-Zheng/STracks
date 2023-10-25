const express = require("express"); 
const router = express.Router(); 

router.use(logger);
router.get("/",(req, res) =>{
    res.send("User List");
})

router.get("/new",(req, res) =>{
    res.send("User New Form");
})

router.post("/", (req, res)=> {
    req.body.first 
})

router
    .route("/:id")
    .get((req, res)=>{
        res.send(`Get User with ID ${req.params.id}`)
    })
    .put((req, res)=>{
        res.send(`Update user with ID ${req.params.id}`)
    }) 
    .delete((req, res)=>{
        res.send(`Delete user with ID ${req.params.id}`)
    })


const users = [{name: "Kyle"}, {name: "Sally"}]
router.param("id", (req, res , next, id)=>{
    req.user = users[id]; 
    next();
});


// Middleware. Code that runs between the starting of the request and ending of a request
function logger(req, res, next){
    console.log(req.originalUrl);
    next(); 
}
// a special object in Node.js that is used to define the public interface of a module.
module.exports = router; 