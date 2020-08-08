import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
//Importing the necessary firebase libraries.
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input('post') post:any;//Receiving a post object(input) from myblogs component.

  //postdata and user are nothing but blank json object of class PostComponent.
  postdata:any={};//To store the data present inside the received post object.
  user:any={};//To store the information about current logged-in user.
  @Output('onDelete') onDelete= new EventEmitter();//To emit event to the myblogs component whenever the post is deleted.
  constructor() { }

  ngOnInit(): void {
    this.postdata=this.post.data();
    this.user=firebase.auth().currentUser;
  }
  delete(){
      firebase.firestore().collection("posts").doc(this.post.id).delete().then(()=>{
      this.onDelete.emit();//Helpful in refreshing the list inside myblogs component after deletion of a post.
    });
  }

}
