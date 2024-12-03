const signupDataValidate = (req, res, next) => {
    const {name,username, password, email, bio} = req.body;

    if(!name || !username || !password || !email || !bio){
        return res.status(400).json({
            success: false,
            message: "every field is required"
        })
    }else{
        next();
    }
}

module.exports = signupDataValidate;