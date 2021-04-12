const exp=require("express")
const todolistApiObj=exp.Router();
todolistApiObj.use(exp.json())
const bcryptjs=require("bcryptjs");
const jwt= require("jsonwebtoken");
const { isJSDocUnknownTag } = require("typescript");

todolistApiObj.post("/register",async(req,res)=>{
    let todolistCollectionObj=req.app.get("todolistCollectionObj");
    
    let userObj =  req.body;
   
  
    let user= await todolistCollectionObj.findOne({username:userObj.username})
    if(user!==null)
    {
        res.send({message:"user already exists"})
    }
    else{

        let hpw= await bcryptjs.hash(userObj.password,6)
        userObj.password=hpw;
   ;
        let success=await todolistCollectionObj.insertOne(userObj)
        res.send({message:"user created"})
    }
})



//get user
todolistApiObj.get("/getuser/:username",async (req,res,next)=>{
    //get user collectionobject
    let todolistActObj=req.app.get("todolistActObj");

   let userActObj=await todolistActObj.find({username:req.params.username}).toArray();
   res.send({message:userActObj})
})



todolistApiObj.post("/login",async(req,res)=>{
    let todolistCollectionObj=req.app.get("todolistCollectionObj");
    let userCredObj= req.body;

    let user = await todolistCollectionObj.findOne({username:userCredObj.username})

    if(user==null){
        res.send({message:"Invalid username"})
    }
    else{

        let status=await bcryptjs.compare(userCredObj.password,user.password)

        if(status==true)
        {
            let token = await jwt.sign({username:user.username},"abcd",{expiresIn:100})
            res.send({message:"success",signedToken:token,username:user.username})
        }
        else{
            res.send({message:"invalid password"})
        }
    }
})

todolistApiObj.post("/addactivity",async(req,res)=>{
    let todolistActObj=req.app.get("todolistActObj")
    let userObj=req.body;
    let success = await todolistActObj.insertOne(userObj)
    res.send({message:"activity added successfully"});
})

todolistApiObj.delete("/deleteuser/:username",async(req,res)=>{
    let todolistActObj=req.app.get("todolistActObj")
    await todolistActObj.deleteOne({username:req.params.username})
    res.send({message:"removed successfully"})
})

todolistApiObj.post("/reset",async(req,res)=>{
  
    let todolistCollectionObj=req.app.get("todolistCollectionObj");
    let userCredObj= req.body;
    let hashedpw= await bcryptjs.hash(userCredObj.password1,6)
    let success = await todolistCollectionObj.updateOne({username:userCredObj.username},{$set:{
        password:hashedpw
    }})

    res.send({message:"success"});
})

module.exports=todolistApiObj;