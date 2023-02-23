const acces = require("./verifytoken");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
module.exports = (app, express, mysqlcon) => {
  const router = express.Router();
  app.use("/", router);
  app.use(express.urlencoded({ extended: true }));

  router.get("/buyer_registeration", (req, res) => {
    res.render("buyer_registeration");
  });
  router.post("/buyer_registeration", async (req, res) => {
    console.log(req.body, "////////");
    let stusername = req.body.username;
    let stpassword = req.body.password;
    let stemail = req.body.email;
    let stgender = req.body.inlineRadioOptions;
    let stphone = req.body.phone;
    let stbuyer_id = uuid.v4();

    if (stgender == "option1") {
      stgender = "female";
    } else if (stgender == "option2") {
      stgender = "male";
    } else if (stgender == "option3") {
      stgender = "other";
    }

    console.log(stgender, stphone);
    try {
      let value = await mysqlcon("select * from buyer_registeration");
      // let value = await prisma.buyer_registeration.findMany();

      console.log({ value }, "---------------------------");
      for (let i in value) {
        if (value[i].username === stusername) {
          return res.send("seller username already exists");
        }
      }
      let a = await mysqlcon(
        `insert into buyer_registeration (username,password,email,gender,phone,buyer_id,role) values ("${stusername}","${stpassword}","${stemail}","${stgender}","${stphone}","${stbuyer_id}",2)`
      );

      // const insertcart = await prisma.buyer_registeration.create({
      //   data: {
      //     username: String(stusername),
      //     password: Number(stpassword),
      //     email: String(stemail),
      //     gender: String(stgender),
      //     phone: Number(stphone),
      //     buyer_id: String(stbuyer_id),
      //     role: 2,
      //   },
      // });

      res.redirect("/buyer_login");
    } catch (err) {
      console.log(err);
    }
  });
};
