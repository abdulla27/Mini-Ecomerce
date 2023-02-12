const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();

var Publishable_Key =
  "pk_test_51MZCFtSAWcPzH6TBEmh2IRjJMFjC5hoSze0PVPXjNtPSCey17SAxNaFUuAeY9cH2AWrtr1mxtqU0JVXK7hd2N49200gSBGEQKA";
var Secret_Key =
  "sk_test_51MZCFtSAWcPzH6TBlKHJF9DDcK1xqeazEBs0uxTGzkDlkxHVinmEG27cZxSwlUMqAcJHxcfdBKNa0sDmG79YoXqI00jShvhg46";

const stripe = require("stripe")(Secret_Key);

const port = process.env.PORT || 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname,"views")))
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("", {
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

app.listen(port, function (error) {
  if (error) throw error;
  console.log("Server created Successfully");
});
