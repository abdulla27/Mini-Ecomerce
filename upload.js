const mysqlcon=require("./demo")
const express=require("express")
const app=express()
const multer=require("multer")
app.set("view engine","ejs")


const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/home/surajsah97/Desktop/image_in_mysql/upload")
    },
    filename:(req,file,cb)=>{
        console.log(file);
        let newname=Date.now()+"-"+file.originalname
        cb(null,newname)
    }
})
const upload=multer({storage:storage})

app.get("/",(req,res)=>{
    res.render("/home/surajsah97/Desktop/image_in_mysql/views/image_upload.ejs")
})

app.post("/upload",upload.single("files"),(req,res)=>{
    res.send("file uploaded")
})

app.listen(5000,()=>{
    console.log("listening the port 5000");
}) = await mysqlcon(
        `insert into seller_registeration (username,password,seller_id,email,gender,phone,role) values ("${stusername}","${stpassword}","${stseller_id}","${stemail}","${stgender}","${stphone}",1)`
      );