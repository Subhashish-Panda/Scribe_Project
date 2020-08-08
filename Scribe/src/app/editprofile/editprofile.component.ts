import { Component, OnInit } from '@angular/core';
//Importing the necessary firebase libraries.
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  user:any={};
  message:string="";

  constructor() {
    this.getProfile();
   }

  ngOnInit(): void {
  }

  //This function fetches all data of current user from "users" collection.
  getProfile(){
    let userId=firebase.auth().currentUser.uid;
    firebase.firestore().collection("users").doc(userId).get().then((result)=>{
    this.user=result.data();
    this.user.id=result.id;
    this.user.displayName=this.user.firstName+" "+this.user.lastName;
    console.log(this.user);
    }).catch((error)=>{
      console.log(error);
    });
  }
  //This function updates all entered data of current user inside "users" collection.
  update(){
    this.message="Updating profile....";
    firebase.auth().currentUser.updateProfile({
    displayName:this.user.displayName,
    photoURL:this.user.photoURL  
    }
    ).then(()=>{
      let userId=firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).update({
      firstName:this.user.displayName.split(' ')[0],
      lastName:this.user.displayName.split(' ')[1],
      hobbies:this.user.hobbies,
      interests:this.user.interests,
      bio:this.user.bio  
      }).then(()=>{
        this.message="Profile updated successfully";
      }).catch((error)=>{
        console.log(error);
      });
    })
}
}
