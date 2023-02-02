module.exports=(req,res,next)=>{
  const jwt=require("jsonwebtoken")
    let a=req.headers.cookie;
    console.log(a,"kuch>>>>>>>>");
    if(a){
      // a=JSON.parse(a)
      let token=a.split("=")[1]
      console.log(token,"<<<<<kuch bhi");
      let verifyToken=jwt.verify(token,"secretkey");//rukne ke liye chhod do baki aage bado
      console.log({verifyToken});
      if(verifyToken){
        if(verifyToken["role"]==1)
        req.body.mydata=verifyToken
        next()
        
      }
      else{
      return res.send("sorry")
      }
    // a=JSON.parse(a);
    }
    else{
      res.send("<h1>sorry you are not autherized.....<h1>")
    }
  }