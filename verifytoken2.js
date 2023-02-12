module.exports=(req,res,next)=>{
  const jwt=require("jsonwebtoken")
    let a=req.headers.cookie;
    console.log(a,"kuch>>>>>>>>");
    if(a){
      // a=JSON.parse(a)
      let token=a.split("=")[1]
      console.log(token,"<<<<<kuch bhi");
      let verifyToken2=jwt.verify(token,"secretkey");//rukne ke liye chhod do baki aage bado
      console.log({verifyToken2});
      if(verifyToken2){
        // if (role=1){
        req.body.mydata=verifyToken2
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