import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //Creating an instance of FormGroup.
  myForm:FormGroup;
  message:string="";
  usererror:any;
  
  //Then creating instance of FormBuilder.
  //Using group function on instance fb to assign it the formControls needed in your form.
  constructor(public fb: FormBuilder,public authService:AuthService,public router:Router){
    this.myForm=this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]]
      },
      {
    //Passing the name of the formcontrol object as parameter to custom-validate function.
    validator: this.checkIfMatching("password","confirmPassword")  
      })
  }


  ngOnInit(): void {
  }

  checkIfMatching(passwordKey:string,confirmPasswordKey:string){
    return(group:FormGroup) =>{
      let password=group.controls[passwordKey];
      let confirmPassword=group.controls[confirmPasswordKey];
      if(password.value==confirmPassword.value){
        return;
      }
      else{
       confirmPassword.setErrors({
         notEqualToPassword:true
       })
      }
    }
  }
  //Storing the email and password into Firebase.
  onSubmit(Form)
  {
  //Extracting email and password values from value JSON object.
  let email:string=Form.value.email;
  let password:string=Form.value.password;
  //Extracting first name and last name of user from value JSON object.
  let fname:string=Form.value.firstName;
  let lname:string=Form.value.lastName;

  //To perform successful signup and storing data using signup.
  this.authService.signup(email,password,fname,lname)
  .then((user:any) =>{
    firebase.firestore().collection("users").doc(user.uid).set({
      firstName:fname,
      lastName:lname,
      email:email,
      photoURL:user.photoURL,
      interests:"",
      bio:"",
      hobbies:""
    }).then(()=>{
    this.message="Holla,your signup is successful!";
    this.router.navigate(['/myblogs']);
    });

  })
  .catch((error)=>{
  this.usererror=error;
  });
}
}
