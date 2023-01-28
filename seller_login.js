module.exports = (app, express, mysqlcon) => {
    const acces = require("./verifytoken")
    const jwt = require("jsonwebtoken")
    const router = express.Router()
    app.use("/", router);
    app.use(express.urlencoded({ extended: true }));

    router.get("/seller_login", (req, res) => {
        res.render("seller_login")
    })
    router.post("/seller_login", async (req, res) => {
        console.log(req.body, "<<<<");
        let stusername = req.body.username
        let stpassword = req.body.password
        console.log(`${stusername}`);
        console.log(`${stpassword}`);

        try {
            if (!stusername) {
                return res.send("username required")
            }
            if (!stpassword) {
                return res.send("password required")
            }
            // let value= await mysqlcon("select*from buyer_registeration")
            // console.log(value,"<><><><>");
            // console.log(value[1].username,value[1].password,">>><<<<");



            // for (let i in value) {
            //     if (value[i].username == stusername) {
            //         console.log(value[i].username==stusername);
            //         if (value[i].password == stpassword) {
            //             let myToken = jwt.sign(JSON.stringify(value[i]), "secretkey")
            //             console.log(myToken);
            //             return res.cookie("auth",myToken).redirect("/home")
            //         }
            //         else { return res.send("wrong password.") };
            //     }
            // }
            // return res.send("username different.")

            let value = await mysqlcon(`select*from seller_registeration where username="${stusername}"`)
            console.log(value);
            if (value.length == 0) {
                return res.send("invalid username")
            }
            // if (value.length==0){
            //     return res.send("invalid username")
            // }

            console.log(value[0]["username"], "<><><><>");
            console.log(value[0]["password"], "<><><><>", stpassword);
            console.log(value[0]["password"] == stpassword)


            if (value[0]["username"] == stusername) {
                if (value[0]["password"] == stpassword) { //value[0]["stpassword"]
                    console.log(value[0]["password"]);
                    let myToken = jwt.sign(JSON.stringify({ id: value[0]["uuid"], role: value[0]["role"] }), "secretkey")
                    console.log(myToken);
                    return res.cookie("auth", myToken).redirect("/add_product")
                }
                else { return res.send("wrong password.") };
            }

            else res.send("username different.")
        }
        catch (err) { console.log(err); }


    })

}