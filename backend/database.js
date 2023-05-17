const mongoose = require('mongoose')

function Dbconnect(){

    const url = process.env.MONGODB;
    mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true
        }).then(()=>{
            console.log('Connection Successful');
        }).catch((error)=>{     
            console.log('Something went wrong', error)
        });
}

module.exports = Dbconnect