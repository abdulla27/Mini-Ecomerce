// module.exports = (app, express, mysqlcon) => {
//     // app.use("/", router);

const express=require("express")
const router=express.Router()

    
    router.get("/",(req,res)=>{
        res.send("helloooo")
    })
    module.exports=router

