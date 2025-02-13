import jwt from 'jsonwebtoken';
const jwtAuth =  async(req, res, next)=>{
    
    try {
        // 1. Read the token.
    const token = req.cookies.token;

    // 2. if no token, return the error.
    if(!token){
        return res.status(401).json({
            message:"Not Authorized",
            success:false
        });
    }
    const decode  = await jwt.verify(
        token,
        process.env.SECERETE_KEY 
    );
    if(!decode){
        return res.status(401).json({
            message:"Invalid Token",
            success:false
        });
    }
    req.id = decode.userId;
    next();
    } catch (error) {
        console.log(error);
    }
    
};

export default jwtAuth;