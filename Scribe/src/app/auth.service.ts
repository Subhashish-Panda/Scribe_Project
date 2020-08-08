import { Injectable } from '@angular/core';
//Importing the core library and authentication library of firebase. 
import * as firebase from 'firebase/app';
import 'firebase/auth'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  //To be used by any-login component.
  login(email:string,password:string)
  {
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  //To be used by any-signup component.
  signup(email:string,password:string,first_name:string,last_name:string)
  {
    return new Promise((resolve,reject) =>{
     firebase.auth().createUserWithEmailAndPassword(email,password).
      then((response)=>{
      let randomnumber=Math.floor(Math.random()*1000);//to get a random  number less than 1000.
      //Note:This can only be done after successful signup(i.e email and password are registered first properly).
      response.user.updateProfile({
      displayName: first_name+" "+last_name,//Update the display name of user object inside response.
      photoURL: "https://api.adorable.io/avatars/" + randomnumber//photoURL is helpful for setting an avatar for user.
      }).then(() => {
        resolve(response.user);
       })
       .catch((error)=>{
        reject(error);
       })
     })
     .catch((error)=>{
      reject(error);
     })
   })
  }
  //To be used by task component.
  task_signup(email:string,password:string)
  {
   return firebase.auth().createUserWithEmailAndPassword(email,password);
  }
}
