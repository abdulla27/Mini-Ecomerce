const uuid=require("uuid")
const acces = require("./verifytoken")
const acces2 = require("./verifytoken2")
const jwt = require("jsonwebtoken")
const express=require("express")
const app=express()
const mysqlcon=require("./demo")
const multer=require ("multer")
const path=require("path")
const fs=require("fs")
const fileupload=require("express-fileupload")
app.use(fileupload({
    useTempFiles:true
}))
app.use(express.json())


app.post("/photoPC",(req,res)=>{
    let image=req.body.product_image
    let name=req.body.product
    let price=req.body.price

    let q="INSERT INTO productv8 values(NULL,?,?,?,NULL,NULL,NULL)"
    mysqlcon.query(q,[name,price,image],(err,rows,fields)=>{
        if(err) throw err
        res.send("added bhai")
        // res.redirect("products")
    })

})

app.use(express.static(path.join(__dirname,"views")))
app.use(express.urlencoded({extended:true}));
require("./login")(app,express,mysqlcon)
require("./registeration")(app,express,mysqlcon)
// require("./password")(app,express,mysqlcon)
require("./seller_registeration")(app,express,mysqlcon)
require("./buyer_registeration")(app,express,mysqlcon)
require("./add_product")(app,express,mysqlcon)
require("./seller_login")(app,express,mysqlcon)
require("./buyer_login")(app,express,mysqlcon)
require("./view_detail")(app,express,mysqlcon)
require("./addcart")(app,express,mysqlcon)
require("./maincart")(app,express,mysqlcon)








app.set("view engine","ejs")


app.listen(7005,()=>{console.log("listeningg 7005");})
