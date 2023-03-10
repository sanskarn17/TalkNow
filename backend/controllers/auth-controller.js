const otpService = require('../services/otp-services.js'); 
const hashService = require('../services/hash-services.js');
const userService = require('../services/user-services.js');
const tokenService = require('../services/token-services');
const UserDto = require('../dtos/user-dto')
class AuthController{
    async sendOtp(req,res){

        const {phone} = req.body;
        if(!phone){
            return res.status(400).json({message : 'Phone field is required'});
        }
        
        const otp = await otpService.generateOtp();

        // hash
        const ttl = 1000 * 60 * 2; // 2min
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`;
        const hash = hashService.hashOtp(data);

        // sendotp
        try{
            // await otpService.sendBySms(phone , otp);
            return res.json({
                hash : `${hash}.${expires}`,
                phone,
                otp
            })
        }catch(err){
            console.log(err);
            return res.status(500).json({message : "message sending failed"});
        } 
    }

    async verifyOtp(req,res){
        //logic
        const {otp , hash, phone} = req.body;
        if(!otp || !hash || !phone){
            return res.status(400).json({message:"All fields are required"});
        }

        const [hashOtp , expires] = hash.split(".");
        if(Date.now()> +expires){
            return res.status(400).json({message: "OTP expired."});
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashOtp,data);
        if(!isValid){
            return res.status(400).json({message: "Invalid OTP!!"});
        }

        let user;

        try{
            user = await userService.findUser({phone: phone});
            if(!user){
                user = await userService.createUser({phone: phone});
            }
        }catch(err){
            console.log(err);
            return res.status(500).json({message : 'Db error'});
        }

        // token 
        const {accessToken , refreshToken} = tokenService.generateTokens({_id: user._id , activated: false});

        await tokenService.storeRefreshToken(refreshToken , user._id);
        res.cookie('refreshToken' , refreshToken, {
            maxAge: 1000*60*60*24*30,
            httpOnly: true,
        });

        res.cookie('accessToken' , accessToken, {
            maxAge: 1000*60*60*24*30,
            httpOnly: true,
        });

        const userDto = new UserDto(user);
        return res.json({user: userDto , auth: true});
    }

    async refresh(req,res){
        // get refresh token from cookie
        const {refreshToken: refreshTokenFromCookie} = req.cookies;
        // check if token is valid
        let userData;
        try{
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        }catch(err){
            return res.status(401).json({message:"Invalid Token."})
        }
        // check if the token is in database
        try{
            const token = await tokenService.findRefreshToken(userData._id , refreshTokenFromCookie);
            if(!token){
                return res.status(401).json({message:"invalid token"});
            }
        }catch(err){
            return res.status(500).json({message: "internal error"});
        }
        // check if valid-user
        const user = await userService.findUser({_id: userData._id});
        if(!user){
            return res.status(404).json({message:"No user"});
        }
        // generate new tokens
        const {refreshToken , accessToken} = tokenService.generateTokens({
            _id: userData._id,
        }); 

        // update refreshtoken
        try{
            await tokenService.updateRefreshToken(userData._id , refreshToken);
        }catch(err){
            return res.status(500).json({message: 'Internal error'});
        }
        // put in the cookie
        res.cookie('refreshToken' , refreshToken, {
            maxAge: 1000*60*60*24*30,
            httpOnly: true,
        });

        res.cookie('accessToken' , accessToken, {
            maxAge: 1000*60*60*24*30,
            httpOnly: true,
        });

        // response
        const userDto = new UserDto(user);
        return res.json({user: userDto , auth: true});
    }

    async logout(req,res){
        const {refreshToken} = req.cookies;
        // delete refresh token from db
        await tokenService.removeToken(refreshToken);
        // delete cookies 
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.json({user: null , auth: false});
    }
}


module.exports = new AuthController();
// res.send(otp)
// it follow a singleton pattern means it will return the same object everytime but it is sufficient for our purpose