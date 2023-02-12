module.exports = (app, express, mysqlcon) => {
  const acces2 = require("./verifytoken2");
  const jwt = require("jsonwebtoken");
  const cloudinary = require("cloudinary").v2;

  const multer = require("multer");
  const router = express.Router();
  app.set("view engine", "ejs");
  app.use("/", router);
  app.use(express.urlencoded({ extended: true }));

  router.get("/maincart", acces2, async (req, res) => {
    let stbuyer_id = req.body.mydata.buyer_id;
    console.log(stbuyer_id);
    // let stid=req.params.id
    // let value1= await mysqlcon(`select*from cart`)
    // // res.render("addcart",{data: value1[0]})
    // // res.send(value)
    // let stproductname=value1[0].productname
    // let stproduct_image=value1[0].product_image
    // console.log(stid);
    // console.log(value1[0]);
    let value = await mysqlcon(
      `select*from cart where buyer_id="${stbuyer_id}" and status=1`
    );
    console.log({ value });
    let taxes = 0;
    let shipping = 0;
    let subtotal = 0;
    value.map((cart) => {
      subtotal += cart.productprice * cart.quantity;
      // console.log(subtotal);
    });
    res.render("maincart", { data: value, subtotal, taxes, shipping });
  });
  // router.post("/maincart",(req,res)=>{
  //     console.log(stproduct_image);
  // })
};
