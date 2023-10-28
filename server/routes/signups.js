const express = require("express"); 
const router = express.Router(); 
const signup = require('../models/signup')

router.use(logger);

// root route of signups
router.route('/')
    // Getting all entries in the signup list
  .get(async (req, res) => {
    try {
      const entries = await signup.find();
      res.json(entries);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  // Creating one new entry in the signup list 
  .post(async (req, res) => {
    const entry = new signup({
      name: req.body.name,
      email: req.body.email,
      spotifyID: req.body.spotifyID
    });

    try {
      const newEntry = await entry.save();
      res.status(201).json(newEntry);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


//signups/:id route
router
    .route("/:id")

    // Getting one entry in the signup list
    .get((req, res)=>{
        const user = req.user;
        if (!user) {
            res.status(404).send("Entries not found");
        } else {
            res.send({
                id: req.params.id,
                name: user.name
            });
        }
    })

    // Updating one entry in the signup list
    .put((req, res)=>{
        res.send(`Update entry with ID ${req.params.id}`)
    }) 

    // Deleting on entry in the signup list    
    .delete((req, res)=>{
        res.send(`Delete entry with ID ${req.params.id}`)
    })


const users = [{name: "Kyle"}, {name: "Sally"}]

// Middleware executed whenever a route parameter with the speciifc id name is included.
// Executes when the /:id route is matched and before the specific request method
// is matched and codes following it. 
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