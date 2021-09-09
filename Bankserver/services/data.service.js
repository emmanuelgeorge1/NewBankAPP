
const db = require('./db');

// let accountDetails = {

//     1000: { acno: 1000, balance: 1000, username: "userone", password: "testuser" },
//     1001: { acno: 1001, balance: 12000, username: "usertwo", password: "testuser1" },
//     1002: { acno: 1002, balance: 13000, username: "usethree", password: "testuser2" },
// }
// let currentUser;

const register = (acno,username,password)=>{
    //console.log("register called")
    return db.User.findOne({
      acno}).then(user=>{
       // console.log(user)
      if(user){
        return{
          status:false,
          statusCode:422,
          message:"User already exist, please Login"
        }
      }
        else{
           const newUser = new db.User({
          acno,
      balance:0,
      username,
      password

        });
        newUser.save() ;
    return {
        status:true,
        statusCode: 200,
        message: " Registration Successful " 
       
    }
  }
})
}
   const login = (req,acno,pass)=>{
     var accno =parseInt(acno);
     return db.User.findOne({
      acno:accno,
      password:pass
     }).then(user=>{
       if(user){
         req.session.currentUser = user.acno
         return{
          status:true,
          statusCode: 201,
          message:"Login succesful",
          name:user.username

         }
       
       }  
       return{
        status:false,
        statusCode: 423,
        message:"Invalid Credentials"
       }


     })
    }
 const deposit =(acno,password,amount)=>{
          var amt=parseInt(amount);
          return db.User.findOne({
            acno,
            password
          }).then(user=>{
            if(!user){
              return{
                status: false,
                statusCode: 424,
                message:"No user exist with this Account Number"
              }
            }
              user.balance+=amt;
              user.save();
              return{
              status: true,
              statusCode: 202,
              message: " Amount Credited",
              balance:user.balance
              }            
          })
          }


           const withdraw = (req,acno,password,amount)=>{
              var amt=parseInt(amount);
              return db.User.findOne({
                acno,
                password
              }).then(user=>{
                if(!user){
                  return{
                    status: false,
                    statusCode: 425,
                    message:"No user exist with this Account Number"
                  }
                }
               if(req.session.currentUser!=acno){

                return{
                  status: false,
                  statusCode: 426,
                  message: "Opearation Denied"
                  }
                }
                if(user.balance<amt){
                  return{
                  status: false,
                  statusCode: 426,
                  message: "Insuffisent balance"
                  }
                }
              user.balance-=amt;
              user.save();
              return{
              status: true,
              statusCode: 203,
              message: " Amount  has been dedited",
              balance:user.balance
              }
                         
              })
            }              
        module.exports ={
            register,
            login,
            deposit,
            withdraw
           }