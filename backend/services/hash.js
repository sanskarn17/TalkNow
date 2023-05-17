const crypto = require('crypto')

class hash{
    hashOtp(data){
        return crypto.createHmac('sha256',process.env.SECRET).update(data).digest('hex');
    }
}


module.exports = new hash()