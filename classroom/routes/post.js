const express = require("express");
const router = express.Router();

//post
//index 
router.get("/",(req,res) =>{
    res.send("GET for posts");
});

//show
router.get("/:id",(req,res) =>{
    res.send("GET for show posts id");
});

//POST 
router.post("/",(req,res) =>{
    res.send("POST for posts");
});

//Delete 
router.delete("/:id",(req,res) =>{
    res.send("DELETE for posts id");
});  

module.exports = router;