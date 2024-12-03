const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required "],
        trim: true,
        min: [5, "name must be atleast 5 characters"],
        max: [20, "name must be within 20 characters"]
    },
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        min: [5, "username must be atleast 5 character"],
        max: [15, "username must be within 15 character"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "provide email is already exists"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
    forgotPassword: {
        type: String
    },
    passwordExpire: {
        type: Date
    },
    bio: {
        type: String,
        required: [true, "bio is required"]
    }
},{
    timestamps: true
});

userSchema.methods = {
    jwtToken(){
        try{
            return JWT.sign(
                {id : this.id, username: this.username},
                process.env.SECRET,
                {expiresIn: '24h'}
            )
        }
        catch(e){
            console.log(e);
        }
    }
}

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;