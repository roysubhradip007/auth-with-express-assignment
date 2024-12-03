const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const userModel = require('../model/userSchema');

const signup = async (req, res, next) => {
    const {name, password, email, bio} = req.body;
    const validEmail = emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success: false,
            message: "please provide a valid email"
        })
    }

    try{
        const userInfo = userModel(req.body);
        const result = await userInfo.save();
        return res.status(200).json({
            success: true,
            data: result
        })
    }
    catch(err) {
        if(err.code === 11000){
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({
                success: false,
                message: `account already exists with provide ${field}`
            })
        }
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

}

const login = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        const user = await userModel.findOne({
            username
        }).select('+password');

        const isMatch = await bcrypt.compare(password, user.password);

        if(!user || !isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid credential"
            })
        }

        const token = await user.jwtToken();
        user.password = undefined;
        
        const cookieOption = {
            httpOnly: true,    
            secure: false,      
            sameSite: 'None',
            maxAge: 3600000,
        }

        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            data: user,
            message: 'cookie set successfully'
        })

    }
    catch(e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

const getUser = async (req, res) => {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if(!user){
        res.status(400).json({
            success: false,
            message: "user not exists"
        })
    }
    else{
        res.status(200).json(user);
    }
}


module.exports = {
    signup,
    login,
    getUser
}