import { Component, OnInit,Input} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comment:string="";
  loggedIn:boolean=false;
  comments:any[]=[];
  @Input('postId') postId:string="";

  constructor() {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user)
      this.loggedIn=true;
      else
      this.loggedIn=false;
    });
   }

  ngOnInit(){
    console.log(this.postId);
    this.getComments();
      
  }
  postCmt(){
    if(this.comment.length<3){
      return;
    }
    firebase.firestore().collection("comments").add({
      text:this.comment,
      post:this.postId,
      owner:firebase.auth().currentUser.uid,
      ownername:firebase.auth().currentUser.displayName,
      created:firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{
      this.getComments();
    }).catch((err)=>{
      console.log(err);
    });
  }
  getComments(){
    this.comments=[];
  firebase.firestore().collection("comments").where("post","==",this.postId).orderBy("created","desc").get().
  then((data)=>{
  data.docs.forEach((commentRef)=>{
    this.comments.push(commentRef.data());//thus our comments array would have multiple JSON objects.
  });
  });
  }

}
