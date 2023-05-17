const crypto = require('crypto');
const hashed = require('./hash')

// const ssmSID = process.env.SMS_SID;
// const smsAuth = process.env.AUTH_TOKEN;
// const twilio = require('twilio')(ssmSID,smsAuth, {
//     lazyLoading: true
// });
class otpService{
    async generateOtp(){
        const otp = crypto.randomInt(10000,99999);
        return otp;
    }
    async sendBysms(phone, otp){
        // return await twilio.messages.create({
        //     to: phone,
        //     from : process.env.SMS_FROM_NUMBER,
        //     body: `Your TalkNowOTP is:${otp}`
        // })
        console.log(`Your TalkNowOTP is:${otp}`); 
    }   
    async verifyOtp(hashedOtp, data){
        let computedHash = hashed.hashOtp(data);
        return (computedHash === hashedOtp) ;

    }
}


module.exports = new otpService()