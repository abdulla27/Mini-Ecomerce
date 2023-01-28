module.exports = (app, express, mysqlcon) => {
    const router = express.Router()
    app.use("/", router)
    app.set("view engine","ejs")

    router.get("/registeration", (req, res) => {
        res.render("registeration")
    })
    router.post("/registeration", async(req, res) => {
        console.log(req.body, "<<<<");
        let stusername = req.body.username
        let stpassword = req.body.password
        let strole = req.body.role

try{
        let value=await mysqlcon("select * from user");
        console.log(value,"---------------------------");
                  
    for (let i in value) {
        if (value[i].username === stusername) { return res.send("username already exists.") }
    }
    let a= await mysqlcon(`insert into user (username,password,role) values ("${stusername}","${stpassword}","${strole}")`)
    return res.redirect("/login")
}
catch(err){
    console.log(err);
 }

    })}