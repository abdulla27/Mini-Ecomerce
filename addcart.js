module.exports = (app, express, mysqlcon) => {
    const acces2 = require("./verifytoken2")
    const jwt = require("jsonwebtoken");
    const cloudinary=require("cloudinary").v2
    
        const multer=require("multer")
        const router = express.Router()
        app.set("view engine","ejs")
        app.use("/", router);
        app.use(express.urlencoded({extended:true}));

        router.get("/cart/:id",acces2,async(req,res)=>{
            let stid=req.params.id
            let value1= await mysqlcon(`select*from product where id=${stid}`)
            res.render("addcart",{data: value1[0]})
            // res.send(value)
            console.log(stid);
            console.log(value1[0]);

        })
        
        

}