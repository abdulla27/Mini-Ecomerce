module.exports = (app, express, mysqlcon) => {
    const acces2 = require("./verifytoken2")
    const jwt = require("jsonwebtoken");
    const cloudinary=require("cloudinary").v2
    
        const multer=require("multer")
        const router = express.Router()
        app.set("view engine","ejs")
        app.use("/", router);
        app.use(express.urlencoded({extended:true}));

        router.get("/maincart",acces2,async(req,res)=>{
            // let stid=req.params.id
            // let value1= await mysqlcon(`select*from cart`)
            // // res.render("addcart",{data: value1[0]})
            // // res.send(value)
            // let stproductname=value1[0].productname
            // let stproduct_image=value1[0].product_image
            // console.log(stid);
            // console.log(value1[0]);
            let value= await mysqlcon(`select*from cart`)
            console.log({value});
            res.render("maincart",{data: value})

            
        })
        // router.post("/maincart",(req,res)=>{
        //     console.log(stproduct_image);
        // })
        
        

}