import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
//Importing the necessary firebase libraries.
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any={};
  posts:any[]=[];

  constructor(public serve:ActivatedRoute) {
    let id=this.serve.snapshot.paramMap.get('id');
    this.getProfile(id);
    this.getUserPosts(id);
   }

  ngOnInit(): void {
  }

  //This function fetches all data of current user from "users" collection.
  getProfile(id:string){
    firebase.firestore().collection("users").doc(id).get().then((result)=>{
    this.user=result.data();
    this.user.id=result.id;
    this.user.displayName=this.user.firstName+" "+this.user.lastName;
    this.user.hobbies=this.user.hobbies.split(",");
    console.log(this.user);
    }).catch((error)=>{
      console.log(error);
    });
  }
  //This function fetches all the posts made by the current user.
  getUserPosts(id:string){
    firebase.firestore().collection("posts").where("owner","==",id).get().then((result)=>{
      this.posts=result.docs;
    })
  }
}
