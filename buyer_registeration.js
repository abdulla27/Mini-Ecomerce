const acces = require("./verifytoken")
const jwt = require("jsonwebtoken");
const uuid=require("uuid")
module.exports = (app, express, mysqlcon) => {
    const router = express.Router()
    app.use("/", router);
    app.use(express.urlencoded({extended:true}));

    router.get("/buyer_registeration", (req, res) => {
        res.render("buyer_registeration")
    })
    router.post("/buyer_registeration",async(req,res)=>{
        console.log(req.body,"////////");
        let stusername=req.body.username
        let stpassword=req.body.password;
        let stemail=req.body.email
        let stgender=req.body.inlineRadioOptions
        let stphone=req.body.phone
        let stuuid=uuid.v4()
        if(stgender=="option1"){
            stgender="female"
        }
        else if(stgender=="option2"){
            stgender="male"
        }
        else if(stgender=="option3"){
            stgender="other"
        }

        
        console.log(stgender,stphone);
        try{
            let value=await mysqlcon("select * from buyer_registeration");
            console.log({value},"---------------------------");
        for (let i in value) {
            if (value[i].username === stusername) { return res.send("seller username already exists") }
        }
        let a= await mysqlcon(`insert into buyer_registeration (username,password,email,gender,phone,uuid,role) values ("${stusername}","${stpassword}","${stemail}","${stgender}","${stphone}","${stuuid}",2)`)
            res.redirect("/buyer_login")
        }
        catch(err){
            console.log(err);
         }

    })


}