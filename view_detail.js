module.exports = (app, express, mysqlcon) => {
  // const { PrismaClient } = require("@prisma/client");
  // const prisma = new PrismaClient();
  const acces = require("./verifytoken");
  const jwt = require("jsonwebtoken");
  const cloudinary = require("cloudinary").v2;

  const multer = require("multer");
  const router = express.Router();
  app.set("view engine", "ejs");
  app.use("/", router);
  app.use(express.urlencoded({ extended: true }));

  router.get("/details/:id", acces, async (req, res) => {
    let stid = req.params.id;
    let value1 = await mysqlcon(`select*from product where id=${stid}`);
    // let value1 = await prisma.product.findMany({
    //   where: { id: Number(stid) },
    // });
    res.render("viewdet", { data: value1[0] });
    // res.send(value)
    console.log(stid);
    console.log(value1);
  });
};
