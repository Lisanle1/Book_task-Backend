const jwt = require('jsonwebtoken');


module.exports = function (req,res,next){
    console.log(req.body)
    const token = req.headers.accesstoken;

    if(!token){
      return  res.json({
            statusCode:'401',
            message:"Unauthorised: Token not found"
        })
    }
   try {
    const decodeUserData= jwt.verify(token,process.env.SECRET_KEY);
    console.log('decodedData',decodeUserData)
    next();

   } catch (error) {
    console.log('token error: ',error)
   }

}