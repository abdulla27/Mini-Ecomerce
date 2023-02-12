module.exports = (app, express, mysqlcon) => {
    const acces2 = require("./verifytoken2")
    const acces = require("./verifytoken")

    const jwt = require("jsonwebtoken");
    const cloudinary=require("cloudinary").v2
    
        const router = express.Router()
        app.set("view engine","ejs")
        app.use("/", router);
        app.use(express.urlencoded({extended:true}));

        router.get("/cart/:id",acces2,async(req,res)=>{
            let stid=req.params.id
            let value1= await mysqlcon(`select*from product where id=${stid} `)
            res.render("addcart",{data: value1[0]})
            // res.send(value)
            console.log(stid);
            console.log(value1[0]);

        })
        router.post("/add",acces2,async(req,res)=>{
            console.log({req:req.body});
            let stbuyer_id=req.body.mydata.buyer_id
            console.log(stbuyer_id,"this is buyer id");
            let stproductname=req.body.productname
            let stproduct_image=req.body.product_image
            let stproductprice=req.body.price
            let stproductcolor=req.body.color
            let stproductquantity=req.body.quantity
            let stproductbrandname=req.body.brandname
            let stproductdetail=req.body.productdetail
            let stproductid=req.body.product_id



            let a= await mysqlcon(`select product_id from cart where product_id="${stproductid}"`)
            console.log(a,",,,,,");
            if(a.length > 0){
                await mysqlcon(`update cart set quantity="${stproductquantity}" where product_id="${stproductid}"`)
            }
            else{
            await mysqlcon(`insert into cart (productname,product_image,productprice,color,quantity,brandname,productdetail,product_id,buyer_id,status) values ("${stproductname}","${stproduct_image}","${stproductprice}","${stproductcolor}","${stproductquantity}","${stproductbrandname}","${stproductdetail}","${stproductid}","${stbuyer_id}",1)`)
            }
        })

        router.delete("/cart/:id",acces,async(req,res)=>{
            let stid=req.params.id
            console.log(stid,"this is product_id which present is in the cart");
            let value1= await mysqlcon(`delete from cart where product_id="${stid}"`)
            // res.send(value)

        })

}
