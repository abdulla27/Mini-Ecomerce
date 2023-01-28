// module.exports = (app, express, mysqlcon) => {
//     const acces2 = require("./verifytoken2")
//     const acces = require("./verifytoken")
//     const jwt = require("jsonwebtoken")
//         const router = express.Router()
//         app.use("/", router);

//         router.get("/home", acces,
//         (req, res) => {
//             console.log(req.body.mydata);
//             res.render("home",{data: req.body.mydata})
//         })
//         try{
//         router.post("/home",acces,async(req,res)=>{
//             let value= await mysqlcon(`select*from product`)
//             console.log(value);

//         })
//     }
//     catch(err){console.log(err);}

// }