const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
    let a=req.headers.cookie;
    console.log(a,"kuch>>>>>>>>");
    if(a){
      // a=JSON.parse(a)
      let token=a.split("=")[1]
      console.log(token,"<<<<<kuch bhi");
      let verifyToken=jwt.verify(token,"secretkey");//rukne ke liye chhod do baki aage bado
      console.log({verifyToken});
      if(verifyToken){
        req.body.mydata=verifyToken
        next()
      }
      else{
      return res.redirect("sorry")
      }
    // a=JSON.parse(a);
    }
    else{
      res.redirect("sorry again")
    }
  }