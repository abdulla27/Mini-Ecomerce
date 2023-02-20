const uuid = require("uuid");
const acces = require("./verifytoken");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = (app, express, mysqlcon) => {
  const router = express.Router();
  app.use("/", router);
  app.use(express.urlencoded({ extended: true }));

  router.get("/seller_registeration", (req, res) => {
    res.render("seller_registeration");
  });
  router.post("/seller_registeration", async (req, res) => {
    console.log(req.body, "////////");
    let stusername = req.body.username;
    let stpassword = req.body.password;
    let stemail = req.body.email;
    let stseller_id = uuid.v4();
    let stgender = req.body.inlineRadioOptions;
    let stphone = req.body.phone;

    if (stgender == "option1") {
      stgender = "female";
    } else if (stgender == "option2") {
      stgender = "male";
    } else if (stgender == "option3") {
      stgender = "other";
    }

    try {
      console.log(stseller_id, "0000000000000000000000s");
      let value = await mysqlcon("select * from seller_registeration");
      // let value = await prisma.seller_registeration.findMany();

      console.log(value, "---------------------------");
      for (let i in value) {
        if (value[i].username === stusername) {
          return res.send("seller username already exists");
        }
      }
      let a = await mysqlcon(
        `insert into seller_registeration (username,password,seller_id,email,gender,phone,role) values ("${stusername}","${stpassword}","${stseller_id}","${stemail}","${stgender}","${stphone}",1)`
      );

      // const insert_seller_registeration =
      //   await prisma.seller_registeration.create({
      //     data: {
      //       username: String(stusername),
      //       password: Number(stpassword),
      //       seller_id: String(stseller_id),
      //       email: String(stemail),
      //       gender: String(stgender),
      //       phone: Number(stphone),
      //       role: 1,
      //     },
      //   });

      return res.redirect("/seller_login");
    } catch (err) {
      console.log(err);
    }
  });
};
