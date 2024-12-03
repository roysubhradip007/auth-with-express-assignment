const JWT = require('jsonwebtoken');

const authUser = (req, res, next) => {
    const token = req.cookies.token || null;
    if(!token){
        return res.status(400).json({
            success: false,
            message: "Not authorized"
        })
    }
    try{
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = {id: payload.id, email: payload.email};
    }
    catch(e){
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
    next();
}

module.exports = authUser;