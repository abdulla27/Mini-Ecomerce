module.exports = (app, express, mysqlcon) => {
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  // const acces = require("./verifytoken");
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

    let value = await mysqlcon(
      `select*from cart where buyer_id="${stbuyer_id}" and status=1`
    );
    // let value = await prisma.cart.findMany({
    //   where: {
    //     buyer_id: stbuyer_id,
    //     status: 1,
    //   },
    // });

    console.log({ value }, "ghhghghgghhgghhggh");
    let taxes = 0;
    let shipping = 0;
    let grandtotal = 0;
    value.map((cart) => {
      grandtotal += cart.productprice * cart.quantity;
      // console.log(subtotal);
    });
    res.render("maincart", { data: value, grandtotal, taxes, shipping });
  });
  // router.post("/maincart",(req,res)=>{
  //     console.log(stproduct_image);
  // })
};
