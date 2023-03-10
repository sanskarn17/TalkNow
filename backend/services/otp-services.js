const crypto = require('crypto');
const hashServices = require('./hash-services');

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid , smsAuthToken, {
    lazyLoading: true,
});

class OtpService{
    async generateOtp(){
        const otp = crypto.randomInt(1000,4999);
        return otp;
    }

    async sendBySms(phone,otp){
        return await twilio.messages.create({
            to : phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your TalkNow OTP is ${otp}`,
        })
    }

    verifyOtp(hashOtp , data){
        let computedHash = hashServices.hashOtp(data);
        return computedHash === hashOtp;
    }
}

module.exports = new OtpService();