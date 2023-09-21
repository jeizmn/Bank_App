import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

//deposit properties
acno="";
pswd="";
amount="";
//withdraw properties
acno1="";
pswd1="";
amount1="";
//login user
user="";
SystemDate: any;

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { 
    if(localStorage.getItem('currentAcno')){

      this.user=JSON.parse(localStorage.getItem('currentUser')||'')

    }
   this.SystemDate=new Date();
   
  }
  creditForm=this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  debitForm=this.fb.group({

    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })

  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('Please Login');
      //this.router.navigateByUrl('');
      this.logout()
    }
  }
deposit(){
  var acno=this.creditForm.value.acno;
  var pswd=this.creditForm.value.pswd;
  var amount=this.creditForm.value.amount;

  if(this.creditForm.valid){
    const result=this.ds.deposit(acno,pswd,amount)
    .subscribe((result:any)=>
    {
      alert(result.message);
    },
    result=>{
      alert(result.error.message);

    })   
  }
}

withdraw(){
  var acno=this.debitForm.value.acno1;
  var pswd=this.debitForm.value.pswd1;
  var amount=this.debitForm.value.amount1;

  if(this.debitForm.valid){
    const result=this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>
    {
      alert(result.message);
    },
    result=>{
      alert(result.error.message);

    })   
  }
}

logout(){
  //Remove login name
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentAcno');
  localStorage.removeItem('token');

  //navigate to login page
  this.router.navigateByUrl('');
}
delete(){
  this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');

}
onCancel(){
  this.acno="";
}

onDelete(event:any){
 // alert(event)
 this.ds.deleteAcc(event)
 .subscribe((result:any)=>
    {
      alert(result.message);
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message);

    }) 
}
}
