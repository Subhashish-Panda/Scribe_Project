import { Component, OnInit,NgZone } from '@angular/core';
//Required core and firestore libraries of firebase.
import * as firebase from 'firebase/app';
import 'firebase/firestore';
//Importing the ActivatedRoute service inside view component.
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post:any={};//to capture all data inside the document(i.e documents's JSON object).
  postId:string;//postId to be given as input to comments component.

  constructor(public info:ActivatedRoute,public agent:NgZone){
    let postId=this.info.snapshot.paramMap.get("postId");
    firebase.firestore().collection("posts").doc(postId).get().then((fetched)=>{
    this.agent.run(()=>{
    this.post=fetched.data();
    this.postId=postId;
    });
    });
  }

  ngOnInit(): void {
  }

}
