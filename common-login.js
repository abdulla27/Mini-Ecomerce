module.exports = (app, express, mysqlcon) => {
  const acces2 = require("./verifytoken2");
  const acces = require("./verifytoken");
  const jwt = require("jsonwebtoken");
  const router = express.Router();
  app.use("/", router);
  app.set("view engine", "ejs");

  router.get("/common-login", (req, res) => {
    res.render("common-login");
  });
};
