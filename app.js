const uuid = require("uuid");
const acces = require("./verifytoken");
const acces2 = require("./verifytoken2");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const mysqlcon = require("./demo");
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 4000;
const fs = require("fs");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(
  fileupload({
    useTempFiles: true,
  })
);
app.use(express.json());

// app.post("/photoPC", (req, res) => {
//   let image = req.body.product_image;
//   let name = req.body.product;
//   let price = req.body.price;

//   let q = "INSERT INTO productv8 values(NULL,?,?,?,NULL,NULL,NULL)";
//   mysqlcon.query(q, [name, price, image], (err, rows, fields) => {
//     if (err) throw err;
//     res.send("added bhai");
//     // res.redirect("products")
//   });
// });

app.use(express.static(path.join(__dirname, "views")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//now this is razorpay routes
// app.use("/", require("./routes/index"));
app.use("/checkout", require("./routes/razorpay"));

require("./login")(app, express, mysqlcon);
// require("./registeration")(app, express, mysqlcon);
// require("./password")(app,express,mysqlcon)
require("./seller_registeration")(app, express, mysqlcon);
require("./buyer_registeration")(app, express, mysqlcon);
require("./add_product")(app, express, mysqlcon);
require("./seller_login")(app, express, mysqlcon);
require("./buyer_login")(app, express, mysqlcon);
require("./view_detail")(app, express, mysqlcon);
require("./addcart")(app, express, mysqlcon);
require("./maincart")(app, express, mysqlcon);
require("./common-registeration")(app, express, mysqlcon);
require("./common-login")(app, express, mysqlcon);

// require("./routes/index")(app,express,mysqlcon)

var Publishable_Key =
  "pk_test_51MZCFtSAWcPzH6TBEmh2IRjJMFjC5hoSze0PVPXjNtPSCey17SAxNaFUuAeY9cH2AWrtr1mxtqU0JVXK7hd2N49200gSBGEQKA";
var Secret_Key =
  "sk_test_51MZCFtSAWcPzH6TBlKHJF9DDcK1xqeazEBs0uxTGzkDlkxHVinmEG27cZxSwlUMqAcJHxcfdBKNa0sDmG79YoXqI00jShvhg46";

const stripe = require("stripe")(Secret_Key);

// const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname,"views")))
app.set("view engine", "ejs");

app.get("/payment", acces2, async (req, res) => {
  let stbuyer_id = req.body.mydata.buyer_id;
  console.log(stbuyer_id);
  let value = await mysqlcon(
    `select*from cart where buyer_id="${stbuyer_id}" and status=1`
  );

  // let value = await prisma.cart.findMany({
  //   where: {
  //     buyer_id: String(stbuyer_id),
  //     status: 1,
  //   },
  // });

  console.log({ value });
  let taxes = 0;
  let shipping = 0;
  let subtotal = 0;
  value.map((cart) => {
    subtotal += cart.productprice * cart.quantity;
    // console.log(subtotal);
  });
  res.render("Home2", {
    data: value,
    subtotal,
    taxes,
    shipping,
    key: Publishable_Key,
  });
});

app.post("/payment", (req, res) => {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Mr. Abdulla",
      address: {
        line1: "23 mountain valley new delhi",
        postal_code: "110092",
        city: "new delhi",
        state: "delhi",
        country: "india",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 7000,
        description: "web develepment product",
        currency: "INR",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log(charge);
      res.send("Success");
    })
    .catch((err) => {
      res.send({ err });
      console.log(err);
    });
});

app.listen(port, () => {
  console.log(`listeningg ${port}`);
});
