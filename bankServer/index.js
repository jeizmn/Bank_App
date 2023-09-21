//Server creation

//1 Import Express
const express = require('express');

//import data service
 const dataService = require('./service/dataService');

 //import jwt
const jwt= require('jsonwebtoken')

//import cors
const cors=require('cors')


//2 Create an app using express
const app = express();


//give command to share data via cors
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:8080']
}))


//to parse json from req body
app.use(express.json());


//3 create a port number
app.listen(3000, ()=>{
    console.log('listening on port 3000');
})


//application specific middleware
const middleware=(req,res,next)=>{
    console.log('Application Specific Middleware');
    next();
}
app.use(middleware)


//Router specific middleware
const jwtMiddleware=(req,res,next)=>{
    try{
    const token=req.headers['x-access-token'];
    console.log('Router Specific Middleware');
    const data=jwt.verify(token,'superkey2022')
    console.log(data);
    next();
    }
    catch{
        //422 unprocessable error
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'Please login again'
        })
    }
}


//4 Resolving HTTP requests


//GET METHOD - To GET data
app.get('/',(req,res)=>{
res.send("GET METHOD");
})

    

//POST METHOD - To create data
app.post('/',(req,res)=>{
    res.send("POST METHOD");
})
    
    //To parse json from req bosy
    app.use(express.json());

   


//PUT METHOD - To update a data completely
app.put('/',(req,res)=>{
    res.send("PUT METHOD");
})

//DELETE METHOD - To delete a data
app.delete('/',(req,res)=>{
    res.send("DELETE METHOD");
})


//PATCH METHOD - To update a data partially
app.patch('/',(req,res)=>{
    res.send("PATCH METHOD");
})


//API calls or request

//register
//login
//deposite
//withdraw
//transaction


//Resolving register request
app.post('/register',(req,res)=>{
    console.log(req.body);
  dataService.register(req.body.acno,req.body.username,req.body.password)
  .then(result=>{
    res.status(result.statusCode).json(result);
  })
    
    // if(result){
    // res.send("Successfully Registered");
    // }
    // else
    // {
    //     res.send("User already Registered")
    // }
})


//Resolving login request
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.password)
    .then(result=>{
    res.status(result.statusCode).json(result);
    })
     });


//Resolving deposit request
app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
    res.status(result.statusCode).json(result);
    })
});


//Resolving withdraw request
app.post('/withdraw',(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.password,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result);
        })
});


//Resolving transaction request
app.post('/transaction',(req,res)=>{
    console.log(req.body);
   dataService.getTransation(req.body.acno)
   .then(result=>{
    res.status(result.statusCode).json(result);
})
});


//Resolving delete request
app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
   .then(result=>{
    res.status(result.statusCode).json(result);
})
});

