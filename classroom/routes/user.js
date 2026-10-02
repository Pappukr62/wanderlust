const express = require("express");
const router = express.Router();

router.get("/new", (req, res) => {
    res.send("New User Page");
});

router.get("/", (req, res) => {
    res.send("Users Index Page");
});

//index 
router.get("/posts",(req,res) =>{
    res.send("GET for posts");
});

//show
router.get("/posts/:id",(req,res) =>{
    res.send("GET for show posts id");
});

//POST 
router.post("/posts",(req,res) =>{
    res.send("POST for posts");
});

//Delete 
router.delete("/posts/:id",(req,res) =>{
    res.send("DELETE for posts id");
});

module.exports = router;