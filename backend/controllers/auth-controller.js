const otpService = require('../services/otp-service') 
const hashing = require('../services/hash');
const userService = require('../services/user-service')
const tokenService = require('../services/token-service')
const UserDto = require('../dtos/user-dto');
class Authcontroller{
    async sendOtp(req,res){
        //Logic
        const { phone } = req.body;
        if(!phone){
            res.status(400).json({message: 'Mobile number field is required'});
        }
        const otp = await otpService.generateOtp();
        const ttl = 1000*60*2;
        const expires = Date.now() + ttl;
        const data = `${phone}.${otp}.${expires}`
        //hashing the otp

        const hash = hashing.hashOtp(data);
        try{
            //await otpService.sendBysms(phone,otp);
            res.json({
                hash:`${hash}.${expires}`,
                phone: `${phone}`,
                otp 
            });
        }catch(err){
            console.log(err);
            res.send(500).json({msg: 'message sending failed'})
        }

    }
    async verifyOtp(req,res){
        const {phone,otp, hash} = req.body;
        if(!otp || !hash || !phone){
            res.status(400).json({message: "all fields are required."})
        }
        const [hashedotp, expires] = hash.split('.');
        if(Date.now() > +expires){
            res.status(500).json({message: "OTP expired"})
        }

        const data = `${phone}.${otp}.${expires}`;
        const isValid = otpService.verifyOtp(hashedotp, data)
        if(!isValid){
            res.status(400).json({message : "Invalid OTP"})
        }

        let user;
        try{
            user = await userService.findUser({phone});
            if(!user){
                user = await userService.createUser({phone})
            }
        }catch(err){
            console.log(err);
            res.status(500).send({message: 'Db error'});
        }

        //tokens
        const {accessToken, refreshToken} =tokenService.generateTokens({  _id: user._id, activated: false});
        await tokenService.storeRefreshToken(refreshToken, user._id)


        res.cookie('refreshToken',refreshToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly : true
        })
        res.cookie('accessToken',accessToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly : true
        })
        const userDto = new UserDto(user)
        res.json({  user: userDto, auth: true});

    }
    async refresh(req,res){
        //get refresh token from cookie
        const {refreshToken: refreshTokenFromCookie} = req.cookies;
        let userData;
        //check if token is valid
        try{
            userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie)
        }catch(err){
            return res.status(401).json({message : "Invalid Token"})
        }
        //check if the token is in database
        try{
            const token = await tokenService.findRefreshToken(userData._id, refreshTokenFromCookie);
            if(!token){
                return res.status(401).json({message: 'Invalid token'})
            }
        }catch(err){
            return res.status(500).json({message: 'Internal error'})
        }
        //chcek if valid user
        const user = await userService.findUser({_id: userData._id})
        if(!user){
            return res.status(404).json({message: 'No user found'})
        }
        //generate new tokens
        const {refreshToken,accessToken} =tokenService.generateTokens({_id:userData._id});
        //refresh token update
        try{
            await tokenService.updateRefreshToken(userData._id, refreshToken)
        }catch(err){
            return res.status(500).json({message: 'Internal error'})
        }

        //put in cookie
        res.cookie('refreshToken',refreshToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly : true
        })
        res.cookie('accessToken',accessToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly : true
        })
        
        //reponse

        const userDto = new UserDto(user)
        res.json({  user: userDto, auth: true});

    
    }
    async logout(req,res){
        //delete the refresh token from the db
        const {refreshToken} = req.cookies;
        await tokenService.removeToken(refreshToken);
        //delete the cookies
        res.clearCookie('refreshToken');
        res.clearCookie('accesshToken');
        res.json({user: null, auth:false})

    }
}

module.exports = new  Authcontroller();