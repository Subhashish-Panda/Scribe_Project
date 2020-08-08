import { Component, OnInit } from '@angular/core';
//Importing the necessary firebase libraries.
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {
  //Initialising the user object as blank JSON object.
  user:any = {};
  posts:any[]=[];

  constructor() {
  this.user=firebase.auth().currentUser;
  this.getPosts();
   }

  ngOnInit(): void {
  }

  getPosts(){
    //gets the list of posts made by all users(from firestore).
    firebase.firestore().collection("posts").orderBy("created","desc").get().then((result)=>{
      console.log(result.docs);
      this.posts=result.docs;
    }).catch((err)=>{
      console.log(err);
    });
  }
  onPostCreated(){
    //refreshes the list of posts made by all users(to be displayed inside the post component).
    this.posts=[];
    this.getPosts();
  }
  onDelete(){
    //refreshes the list of posts made by all users(to be displayed inside the post component),
    //after a delete operation has been made by any user.
    this.posts=[];
    this.getPosts();
  }

}
