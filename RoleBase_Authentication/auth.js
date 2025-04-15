const jwt= require('jsonwebtoken');
require ('dotenv').config();
function authenticateToken(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    let token=authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user;
        next();
    });
}

function authorizationRole(...allowedRoles){
    if(allowedRoles.includes(req.user.role)){
        return next();
    }
    return res.status(403).json({message:'not allowed to access'});
}
module.exports={authenticateToken, authorizationRole};
