// const { Prisma } = require("@prisma/client")
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
module.exports = (app, express, mysqlcon) => {
  const acces = require("./verifytoken");
  app.set("view engine", "ejs");

  const router = express.Router();
  app.use("/", router);
  router.get("/buyer_login", (req, res) => {
    res.render("buyer_login");
  });
  router.post("/buyer_login", async (req, res) => {
    console.log(req.body, "<<<<");
    let stusername = req.body.username;
    let stpassword = req.body.password;
    try {
      let value= await mysqlcon("select*from buyer_registeration")
      // let value = await prisma.buyer_registeration.findMany();
      console.log(value, "<><><><>");

      for (let i in value) {
        if (value[i].username == stusername) {
          if (value[i].password == stpassword) {
  
            let myToken = jwt.sign(
              JSON.stringify({
                buyer_id: value[i]["buyer_id"],
                role: value[i]["role"],
              }),
              "secretkey"
            );
            console.log(myToken);
            return res.cookie("auth", myToken).redirect("/public_home");
          } else {
            return res.send("wrong password.");
          }
        }
      }
      return res.send("username different.");
    } catch (err) {
      console.log(err);
    }
  });
};
