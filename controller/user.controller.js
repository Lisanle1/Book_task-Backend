const {getDB} =require('../dbConfig/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// signup flow
exports.signup= async(req,res)=>{
    try {
    // payload destructure
    const {username, email, password} = req.body;

    const db=getDB();

    // check exist user
    const existUser= await db.collection('users').findOne({email:email});

    if(existUser){
        return res.json({
            statusCode:'400',
            message:"User Already Exists..."
        })
    }

    // hash password 
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);

    const payload ={
        username:username,
        email:email,
        password:hashedPassword,
        createdAt: new Date(),
    }

    await db.collection('users').insertOne(payload);

    jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1hr"},(err,token)=>{
        if(err) throw err;
        res.json({
            statusCode:'201',
            message:"User Created Successfully",
            tokenData:token
        })
    })
} catch (error) {
    res.json({
        statusCode:500,
        message:"Internal Server Error",
    })
}
}

// login flow

exports.login= async(req,res)=>{
    
    try {
    
    
    const {email, password} = req.body;
    
    const db=getDB();
    
    // checking user exist or not
    const UserExist = await db.collection('users').findOne({email:email});
    
    if(!UserExist){
        return res.json({
            statusCode:"400",
            message:"User doesn't exist please do signup"
            })
            }
            const isMatchPassword = await bcrypt.compare(password, UserExist.password);
            if(!isMatchPassword){
                return res.json({
                    statusCode:"400",
                    message:"Invalid Password"
                    })
                    }
    const tokenData = {
        id:UserExist._id,
        username:UserExist.username,
        email:UserExist.email
    }

jwt.sign(tokenData,process.env.SECRET_KEY,(err,token)=>{
    if(err) throw err;
res.json({
    statusCode:'200',
message:"Login Successfully",
tokenData:token
})
})

} catch (error) {
    res.json({
        statusCode:500,
        message:"Internal Server Error",
    })
}

}