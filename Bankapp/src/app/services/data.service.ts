import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  withCredentials:true
}

@Injectable({
  providedIn: 'root'
})

export class DataService { 
//   accountDetails:any = {

//     1000: { acno: 1000, balance: 1000, username: "userone", password: "testuser" },
//     1001: { acno: 1001, balance: 12000, username: "usertwo", password: "testuser1" },
//     1002: { acno: 1002, balance: 13000, username: "usethree", password: "testuser2" },
// }
currentUser:any;
  constructor(private http:HttpClient) { 
   // this.getData()
  }
//   saveData(){
//     localStorage.setItem("accountDetails",JSON.stringify( this.accountDetails))
//     if(this.currentUser){
//     localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
  
//   }
// }

//   getData(){
//     if(localStorage.getItem("accountDetails")){
//     this.accountDetails=JSON.parse(localStorage.getItem("accountDetails")||'')
//     }
//     if(localStorage.getItem("currentUser")){

//     this.currentUser=JSON.parse(localStorage.getItem("currentUser")||'')
//     }
//   }
  login(acc:any,pass:any){
    const data={
      acno:acc,
      password:pass
    }
    return this.http.post("http://localhost:3000/login",data,options)
    //let dataset=this.accountDetails ;
    //  if (acc in data){
    //    var pswdd = data[acc].password
    //    if(pswdd==pass){
    //      this.currentUser=data[acc].username
    //      this.saveData();
    //     alert("Login successful");
    //     return true;
    //    }
     
    // else{
    // alert("Incorrect password");
    // return false;
    // }
    //  }
    
    //  else{
    //    alert("No user exist with this Account Number")
    //    return false;
    //  }
    }
  
  register(acno:any,username:any,password:any){
    const data={
      acno,
      balance:0,
      username,
      password
    }
    return this.http.post("http://localhost:3000/register",data)
  }
  deposit(acc:any,pass:any,amount:any){
    const data={
      acno:acc,
      password:pass,
      amount
    }
    return this.http.post("http://localhost:3000/deposit",data,options)
    
      }
  

  withdraw(acc:any,pass:any,amount:any){
    const data={
      acno:acc,
      password:pass,
      amount
    }
    return this.http.post("http://localhost:3000/withdraw",data,options)
   
      }
  }

