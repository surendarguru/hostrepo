const exp=require("express")
const app=exp();
const path=require("path")
const mc=require("mongodb").MongoClient


app.use(exp.static(path.join(__dirname,"./dist/to-do-App")))

//import the apis
const todolistApiObj=require("./APIS/to-do-list")

app.use("/user",todolistApiObj)

const dburl="mongodb+srv://cdb37:cdb37@surendar.hsbas.mongodb.net/cdb37db?retryWrites=true&w=majority"
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    //get database
    const databaseObj=client.db("cdb37db")
    const todolistCollectionObj=databaseObj.collection("todolistcollection")
    const todolistActObj=databaseObj.collection("todolistactivity");
    
    //sharing collection object
    app.set("todolistCollectionObj",todolistCollectionObj)
    app.set("todolistActObj",todolistActObj);
    console.log("db server is on")
})
.catch(err=>console.log("err in db",err))

app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid`});
})

app.use((err,req,res,next)=>{
    res.send({message:"error occurred",reason:err.message})
})

const port = process.env.PORT||8080

app.listen(3500,()=>console.log("server is on 3500"));