const express = require("express");
const app = express();
const posts = require("./routes/post");
const users = require("./routes/user");
const session = require("express-session");
const flash = require("connect-flash")
const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOption = 
{secret:"mysupersecretstring",
     resave:false,
      saveUninitialized:true
    };

    app.use(session(sessionOption));
    app.use(flash());

    app.use((req, res, next) => {
          res.locals.successMsg = req.flash("success");
         res.locals.errorMsg = req.flash("error");
         next();
    });

    app.get("/register",(req,res) =>{
        let{ name = "anonymous" } = req.query;
        req.session.name = name;
       
       if (name === "anonymous") {
    req.flash("error", "User not registered!");
} else {
    req.flash("success", "User registered successfully!");
}

        res.redirect("/hello");
    });
   
    app.get("/hello",(req,res)=>{
      
        res.render("page.ejs",{name:req.session.name,});
    });

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count) {
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you sent a request, ${req.session.count} times`);
    
// });

// app.get("/test",(req,res)=>{
//     res.send("test sucessful!");
// });

















// // const cookieparser = require("cookie-parser");

// // app.use(cookieparser("secretcode"));

// // app.get("/getsignedcookie", (req, res) =>{
// //     res.cookie("made-in", "India", {signed:true});
// //     res.send("signed cookie sent");
// // });

// // app.get("/verify",(req,res)=>{
// //     console.log(req.signedCookies);
// //     res.send("veryfied");
// // });

// // app.get("/getcookies", (req, res) => {
// //     res.cookie("made_in", "india");
// //     res.cookie("greet", "india");
// //     res.send("Sent you some cookies!");
// // });

// // app.get("/greet", (req, res) => {
// //     let { name = "anonymous" } = req.cookies;
// //     res.send(`Hi, ${name}`);
// // });

// // app.get("/", (req, res) => {
// //     console.log(req.cookies);
// //     res.send("hi i am root");
// // });

// // app.use("/posts", posts);
// // app.use("/users", users);
 
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
 