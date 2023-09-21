import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ɵresetJitOptions } from '@angular/core';

const options={
  headers:new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser:any;

  //login acno
  currentAcno:any;

  userDetails:any={//object of objects
    1000:{acno:1000,username:'Jees',password:1234,balance:1000,transaction:[]},
    1001:{acno:2000,username:'Dani',password:1234,balance:1000,transaction:[]},
    1002:{acno:3000,username:'Anna',password:1234,balance:1000,transaction:[]},
    1003:{acno:4000,username:'Adhi',password:1234,balance:1000,transaction:[]}

  }
  
  
  

  constructor(private http:HttpClient) {  
    this.getDetails();//call function
  }

//saveDetails - To store the details into local storage

saveDetails(){//function defenition
  if(this.userDetails)
  {
    localStorage.setItem('dataBase',JSON.stringify(this.userDetails))
  }
  if(this.currentAcno)
  {
    localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
  }
  if(this.currentUser)
  {
    localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
  }

}
//getDetails - To get details from localstorage
getDetails(){
  if(localStorage.getItem('database')){
    this.userDetails=JSON.parse(localStorage.getItem('database')||'');
  }
  if(localStorage.getItem('currentAcno')){
    this.currentAcno=JSON.parse(localStorage.getItem('currentAcno')||'');
  }
  if(localStorage.getItem('currentUser')){
    this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'');
  }
}

  register(acno:any,username:any,password:any) {
    
    const data={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/register',data)
  }

  login(acno:any,password:any){
    
    const data={
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',data)
  
  }
  getToken(){
    const token=JSON.parse(localStorage.getItem('token')||'');//get the token from local storage
    //generator Header
    let headers=new HttpHeaders()
    //token append
    if(token){
      options.headers=headers.append('x-access-token',token)
    }
    return options
  }
  deposit(acno:any,pswd:any,amt:any){
    let userDetails=this.userDetails;
    var amount=parseInt(amt);
    const data={
      acno,
      password:pswd,
      amount:amt
    }
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())
    
  }
  withdraw(acno:any,pswd:any,amt:any){
    let userDetails=this.userDetails;
    var amount=parseInt(amt);

    const data={
      acno,
      password:pswd,
      amount:amt
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
  }

  getTransation(acno:any){
    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())
  }
 
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)

  }
  
 
}
