//Database integration


//1 server and mongodb integration
//mongoose import   

const mongoose= require('mongoose');

//2 state connection  string via mongodb integration

    mongoose.connect('mongodb://0.0.0.0:27017/BankServer',
    {
    UseNewUrlParser:true,UseUnifiedTopology:true
    //to avoid warning
    },(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Successfully connected');
        }
    })

//3 Define bank db model

const User=mongoose.model('User',
{
//schema
acno:Number,
username:String,
password:Number,
balance:0,
transaction:[]
})
module.exports={User}
