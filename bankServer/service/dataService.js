//import jwt
const jwt= require('jsonwebtoken')

//import db.js
const db=require('./db.js')



userDetails={//object of objects
    1000:{acno:1000,username:'Jees',password:1234,balance:1000,transaction:[]},
    1001:{acno:2000,username:'Dani',password:1234,balance:1000,transaction:[]},
    1002:{acno:3000,username:'Anna',password:1234,balance:1000,transaction:[]},
    1003:{acno:4000,username:'Adhi',password:1234,balance:1000,transaction:[]}

  
  }


  const register=(acno, username, password)=> {

    return db.User.findOne({acno}) //port 27017, backend port 3000
    .then(user=>{
      if(user){
        return {
          statusCode:401,
          status:false,
          message:"User Already Exist"
        }
      }
      else{
        const newUser=new db.User({
          acno,
          username,
          password,
          balance:0,
          transaction:[]
        }
        )
        console.log(newUser);
        newUser.save()//to store data in mongoDb
        return {
          statusCode:200,
          status:true,
          message:"Register Successfully"
        }
      }
    })
  }

  //      if(acno in userDetails){
  //     return {
  //           statusCode:401,
  //           status:false,
  //           message:'User already exist'
  //     }
  //   } 
  //   else{

  //     userDetails[acno]={
  //       acno,
  //       username,
  //       password,
  //       balance:0,
  //       transaction:[]
  //     }
  //     console.log(userDetails);
  //     return{
  //           statusCode:200,
  //           status:true,
  //           message:'Registration Complted'
  //     }
  //   }
  // }

  
  const login=(acno,pswd)=>{
    return db.User.findOne({acno,password:pswd})
    .then(user=>{
      if(user){
        currentUser=user.username
        currentAcno=acno;
        //token generation
    const token=jwt.sign({currentAcno:acno},'superkey2022')
    return {
                statusCode:200,
                status:true,
                message:'LogIn Success',
                currentAcno,
                currentUser,
                token
            }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'Incorrect Username or password'
      }

      }
    })
    
    // if(acno in userDetails){
    //   if(pswd=userDetails[acno]['password']){
    //   currentUser=userDetails[acno]['username'];
    //   currentAcno=acno;
    //   //token generation
    // const token=jwt.sign({currentAcno:acno},'superkey2022')
    //   return {
    //               statusCode:200,
    //               status:true,
    //               message:'LogIn Success',
    //               currentAcno,
    //               currentUser,
    //               token
    //           }
    //   }

    //   else{
    //     return {
    //                 statusCode:401,
    //                 status:false,
    //                 message:'Password Error'
    //             }
    //   }
    // } 
    // else{
    //         return {
    //           statusCode:401,
    //           status:false,
    //           message:'Invalid User'
    //       }
    // }
  }


 const deposit=(acno,pswd,amt)=>{
var amount= parseInt(amt)
  return db.User.findOne({acno,password:pswd})
  .then(user=>{

    if(user){
      user.balance+=amount;
        user.transaction.push({
          type:'Credit',
          amount
    })
    user.save()
    return {
      statusCode:200,
      status:true,
      message:`${amount} is credited balance is ${user.balance}`
    }
  }
  else{
    return {
      statusCode:401,
      status:false,
      message:'Invalid User Details'
      }
  }
  })
 }    

    // if(acno in userDetails){
    //   if(pswd=userDetails[acno]['password']){
    //     userDetails[acno]['balance']+=amount;
    //     userDetails[acno]['transaction'].push({
    //       type:'Credit',
    //       amount
    //     })
    //     console.log(userDetails);
        
    //     return {
    //       statusCode:200,
    //       status:true,
    //       message:`${amount} is credited balance is ${userDetails[acno]['balance']}`
    //     }
    //     //userDetails[acno]['balance'];
    //   }
    //   else{
    //     return {
    //       statusCode:401,
    //       status:false,
    //       message:'Invalid Password'
    //       }
    //   }
    // }
    // else{
    //       return {
    //         statusCode:401,
    //         status:false,
    //         message:'Invalid User Details'
    //         }
    // }
    
  


  const withdraw=(acno,pswd,amt)=>{
    
    var amount=parseInt(amt);
    return db.User.findOne({acno,password:pswd})
    .then(user=>{
            if(user){
              if(user.balance>=amount){
            user.balance-=amount;
            user.transaction.push({
              type:'Debit',
              amount
            })
            user.save()
            
            return {
              statusCode:200,
              status:true,
              message:`${amount} is debited balance is ${user.balance}`
            }
          }
        }
        else{

          return {
            statusCode:401,
            status:false,
            message:'Insufficient Balance'
            }
        }

    })
  }
    // if(acno in userDetails){
    //   if(pswd=userDetails[acno]['password']){
    //     if(userDetails[acno]['balance']>=amount){
    //         userDetails[acno]['balance']-=amount;
    //         userDetails[acno]['transaction'].push({
    //           type:'Debit',
    //           amount
    //         })
    //         console.log(userDetails);
            
    //         return {
    //           statusCode:200,
    //           status:true,
    //           message:`${amount} is debited balance is ${userDetails[acno]['balance']}`
    //         }
    //         //userDetails[acno]['balance'];
    //       }
    //     else{
    //         return {
    //               statusCode:401,
    //               status:false,
    //               message:'Insufficient Balance'
    //               }
    //     }
    //   }
    //   else{
        
    //         return {
    //               statusCode:401,
    //               status:false,
    //               message:'Invalid Password'
    //               }
    //   }
    // }
    // else{
     
    //         return {
    //               statusCode:401,
    //               status:false,
    //               message:'Invalid User Details'
    //               }
    // }
 
  const getTransation=(acno)=>{
  return db.User.findOne({acno})
  .then(user=>{
    if(user){

    return {
            statusCode:200,
            status:true,
            transaction:user.transaction
    }
  }
  else{
    return {
      statusCode:401,
      status:false,
      message:'Transfer Error'
      }
  }

  })
   }

   const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno})
    .then(user=>{
      if(user){
        return{
          statusCode:200,
          status:true,
          message:'Account Deleted'
        }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:'Account not found'
          }
      }
    })
   }
 
  //export
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransation,
    deleteAcc
  }
