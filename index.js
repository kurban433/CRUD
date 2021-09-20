var express=require("express")
var app=express();
 var mongoose=require("mongoose")
 var User=require("./model/index")
var bodyparser=require("body-parser")

 app.use(bodyparser.urlencoded({extended:true}))
  app.use(bodyparser.json());

mongoose.connect("mongodb://localhost:27017/Customer")
 
var connection=mongoose.connection;
connection.once("open",()=>{
    console.log("connect successful");
})

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index")
});

// create opration
app.post("/insert",function(req,res){
    
    var user=new User({
         name:req.body.name,
         email:req.body.email,
         password:req.body.password
    })
    user.save(()=>{
        res.redirect("show")
    })
})

// read opration

app.get("/show",(req,res)=>{
    User.find({},(err,result)=>{
     
        res.render("show",{user:result})
        
    })

})

// Delete opration

app.get("/delete/:id",async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    res.redirect("/show");
})

// Update opration

app.get("/edit/:id",(req,res)=>{
    User.findById(req.params.id,(err,result)=>{
        res.render("edit",{user:result})
    })
})
app.post("/update/:id",async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/show");
})


app.listen("8000",()=>{
  console.log("done");
})