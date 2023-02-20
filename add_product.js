module.exports = (app, express, mysqlcon) => {
  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  const acces = require("./verifytoken");
  const acces2 = require("./verifytoken2");
  const jwt = require("jsonwebtoken");
  const cloudinary = require("cloudinary").v2;
  const uuid = require("uuid");

  const multer = require("multer");
  const router = express.Router();
  app.set("view engine", "ejs");
  app.use("/", router);
  app.use(express.urlencoded({ extended: true }));

  // use multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/home/surajsah97/ecomerce/upload");
    },
    filename: (req, file, cb) => {
      let newname = Date.now() + "-" + file.originalname;

      cb(null, newname);
    },
  });
  const upload = multer({ storage: storage });

  // use cloudinary
  cloudinary.config({
    cloud_name: "dc83y2s4i",
    api_key: "433282457447734",
    api_secret: "1XMIJUOJGXzHFO6rG-0B3eSpsak",
    secure: true,
  });

  router.get("/add_product", acces, async (req, res) => {
    res.render("add_product");
  });
  router.post("/add_product", acces, async (req, res) => {
    console.log(req.body, "////////");
    const file = req.files.product_image;
    console.log(file, "+++++");
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      console.log(result, "|||||\\>>><<<<");

      let stproductname = req.body.productname;
      let stproduct_image = result.url;
      let stprice = req.body.price;
      let stcolor = req.body.color;
      let stquantity = req.body.quantity;
      // let stcreater=req.body.product_created_by
      let stbrandname = req.body.brandname;
      let stproductdetail = req.body.productdetail;
      let stseller_id = req.body.mydata.seller_id;
      console.log(stseller_id, "-------");
      let stproduct_id = uuid.v4();
      console.log(stproduct_id);

      console.log(stproduct_image, "<<<<url>>>>");

      let a = mysqlcon(
        `insert into product (productname,product_image,price,color,quantity,brandname,productdetail,product_id,seller_id) values ("${stproductname}","${stproduct_image}","${stprice}","${stcolor}","${stquantity}","${stbrandname}","${stproductdetail}","${stproduct_id}","${stseller_id}")`
      );

      // const insert_product = await prisma.product.create({
      //   data: {
      //     productname: String(stproductname),
      //     product_image: String(stproduct_image),
      //     price: Number(stprice),
      //     color: String(stcolor),
      //     quantity: Number(stquantity),
      //     brandname: String(stbrandname),
      //     productdetail: String(stproductdetail),
      //     product_id: String(stproduct_id),
      //     seller_id: String(stseller_id),
      //   },
      // });

      return res.redirect("/home");
    });
  });
};
