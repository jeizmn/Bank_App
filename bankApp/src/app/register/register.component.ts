import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // uname="";
  // acno="";
  // pswd="";

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }//ds - register variable
//register model
  registerForm=this.fb.group({

    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  ngOnInit(): void {
  }

  register(){
    //register clicked
    console.log(this.registerForm);
    
    var uname=this.registerForm.value.uname;
    var acno=this.registerForm.value.acno;
    var pswd=this.registerForm.value.pswd;

    
    if(this.registerForm.valid){
      const result=this.ds.register(acno,uname,pswd)
      .subscribe((result:any)=>
      {
        alert(result.message);//register successfully
        this.router.navigateByUrl('')
      },
      result=>{
        alert(result.error.message);//user already registered
        this.router.navigateByUrl('register')
        
      })   
   }
    else{
      alert('Register Failed');
      console.log(this.registerForm.get('uname')?.errors);
        }
  }

}
