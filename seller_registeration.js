const uuid=require("uuid")
const acces = require("./verifytoken")
const jwt = require("jsonwebtoken");
module.exports = (app, express, mysqlcon) => {
    const router = express.Router()
    app.use("/", router);
    app.use(express.urlencoded({extended:true}));

    router.get("/seller_registeration", (req, res) => {
        res.render("seller_registeration")
    })
    router.post("/seller_registeration",async(req,res)=>{
        console.log(req.body,"////////");
        let stusername=req.body.username
        let stpassword=req.body.password;
        let stuuid=uuid.v4()
        try{
            console.log(stuuid,"0000000000000000000000s");
            let value=await mysqlcon("select * from seller_registeration");
            console.log(value,"---------------------------");
        for (let i in value) {
            if (value[i].username === stusername) { return res.send("seller username already exists") }
        }
        let a= await mysqlcon(`insert into seller_registeration (username,password,uuid,role) values ("${stusername}","${stpassword}","${stuuid}",1)`)
        return res.redirect("/seller_login")
        }
        catch(err){
            console.log(err);
         }

    })
}