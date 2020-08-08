import { Component, OnInit } from '@angular/core';
//Importing the firebase core and authentication libraries.
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  loggedIn:boolean=false;
  user:any;//for checking the status of current user.
  userId:string;

  constructor()
  {
  //currentUser property returns a user object if current user is logged-in ,else it returns null.
  this.user=firebase.auth().currentUser;
  if(this.user)
  this.loggedIn=true;
  else
  this.loggedIn=false;
  
  //Setting up an observer,for detecting state changes more quickly.
  firebase.auth().onAuthStateChanged((user)=>{
  if(user)
  {this.userId=user.uid;
  this.loggedIn=true;
  }
  else
  this.loggedIn=false;
  })
  }

  ngOnInit(): void {
  }
  //logout function...
  logout(){
  firebase.auth().signOut();
  }

}
