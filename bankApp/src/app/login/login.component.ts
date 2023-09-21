import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//3rd execute

  //properties 
  aim='Your Perfect banking partner';

  accounts='Enter your AcntNo here';
  acno="";
  pswd="";
  //user defined functions//4th execute
  acnoChange(event:any)
  {
    this.acno=event.target.value;
    console.log(this.acno);
  }

  pswdChange(event:any)
  {
    this.pswd=event.target.value;
    console.log(this.pswd);
  }
  login(){
    //alert('LogIn Clicked!!!')
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    
    
    if(this.loginForm.valid){
      const result=this.ds.login(acno,pswd)
      .subscribe((result:any)=>
      {
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))

        alert(result.message);
        this.router.navigateByUrl('dashboard')
      },
      result=>{
        alert(result.error.message);
        
      })   
    
    
  }
} 
  // login(a:any,p:any){
  //   //alert('LogIn Clicked!!!')
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var userDetails=this.userDetails;

  //   if(acno in userDetails)
  //   {
  //       if(pswd==userDetails[acno]['password'])
  //       {
  //         alert('LogIn Successful');
  //       }
  //       else
  //       {
  //         alert('Invalid Password');
  //       }

  //   }
  //   else{
  //     alert('Invalid User Details');
  //   }
  // }
  userDetails:any={//object of objects
    1000:{acno:1000,username:'Jees',password:1234,balance:1000},
    1001:{acno:2000,username:'Dani',password:1234,balance:1000},
    1002:{acno:3000,username:'Anna',password:1234,balance:1000},
    1003:{acno:4000,username:'Adhi',password:1234,balance:1000}

  }
//router - variable of login
//Router - its a class of navigateByUrl
  constructor(private fb:FormBuilder, private router:Router,private ds:DataService) { }//1st execute
  //spl member fns , automatically involks when an obj created
  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  ngOnInit(): void {//2 nd execute - life cycle hooks of angular-
    //initial process of component initialization
  }

}
