module.exports = (app, express, mysqlcon) => {
const acces = require("./verifytoken")
const acces2 = require("./verifytoken2")
const jwt = require("jsonwebtoken");
const cloudinary=require("cloudinary").v2
const uuid=require("uuid")


    const multer=require("multer")
    const router = express.Router()
    app.set("view engine","ejs")
    app.use("/", router);
    app.use(express.urlencoded({extended:true}));

    // use multer
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"/home/surajsah97/ecomerce/upload")
        },
        filename:(req,file,cb)=>{
            let newname=Date.now()+"-"+file.originalname
            /
            cb(null,newname)
        }
    })
    const upload=multer({storage:storage})
    
    // use cloudinary
    cloudinary.config({ 
        cloud_name: 'dc83y2s4i', 
        api_key: '433282457447734', 
        api_secret: '1XMIJUOJGXzHFO6rG-0B3eSpsak',
        secure: true
      });


    router.get("/add_product",acces,(req, res) => {
        res.render("add_product")
    })
    router.post("/add_product",acces,(req,res)=>{
        console.log(req.body,"////////")
        const file=req.files.product_image
        cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
            console.log(result,"|||||\\>>><<<<");
        
        let stproductname=req.body.productname
        let stproduct_image=result.url
        let stprice=req.body.price
        let stcolor=req.body.color
        let stquantity=req.body.quantity
        let stcreater=req.body.product_created_by
        let stbrandname=req.body.brandname
        let stproductdetail=req.body.productdetail
        let stuuid=uuid.v4()
        console.log(stuuid);
        

        console.log(stproduct_image,"<<<<url>>>>");



        
        let a= mysqlcon(`insert into product (productname,product_image,price,color,product_created_by,quantity,brandname,productdetail,product_id) values ("${stproductname}","${stproduct_image}","${stprice}","${stcolor}","${stcreater}","${stquantity}","${stbrandname}","${stproductdetail}","${stuuid}")`)
        return res.redirect("/home")
    })
    })
}