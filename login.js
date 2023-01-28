module.exports = (app, express, mysqlcon) => {
const acces2 = require("./verifytoken2")
const acces = require("./verifytoken")
const jwt = require("jsonwebtoken")
    const router = express.Router()
    app.use("/", router);

    router.get("/home", acces,
        async(req, res) => {
            console.log(req.body.mydata);
            let value= await mysqlcon(`select*from product`)
            res.render("home",{data: value})
        })

        router.get("/public_home", acces2,
        async(req, res) => {
            console.log(req.body.mydata);
            let value= await mysqlcon(`select*from product`)
            res.render("home_public",{data: value})
        })

    router.get("/about",acces,
        (req, res) => {
            res.render("about", { data: "this is your about information please don't share it anyone ha ha ha ha ha....." })
        })
    router.get("/login", (req, res) => {
        res.render("login")
    })
    router.post("/login", async(req, res) => {
        console.log(req.body, "<<<<");
        let stusername = req.body.username
        let stpassword = req.body.password
        try {
            let value= await mysqlcon("select * from user")
            console.log(value,"<><><><>");
            
            for (let i in value) {
                if (value[i].username === stusername) {
                    if (value[i].password === stpassword) {
                        let myToken = jwt.sign(JSON.stringify(value[i]), "secretkey")
                        console.log(myToken);
                        return res.cookie("auth",myToken).redirect("/home")
                    }
                    else { return res.send("wrong password.") };
                }
            }
            return res.send("username different.")
        }
        catch(err){console.log(err);}


    })
}

