import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { SignupComponent } from './signup/signup.component';

//Required JSON object variable to initialise firebase SDK in our application.
let config = {
  apiKey: "AIzaSyB16FbYGnVKq_a__UlxlPnHEICgBZCQcd8",
  authDomain: "scribe-26bd8.firebaseapp.com",
  databaseURL: "https://scribe-26bd8.firebaseio.com",
  projectId: "scribe-26bd8",
  storageBucket: "scribe-26bd8.appspot.com",
  messagingSenderId: "322917716504",
  appId: "1:322917716504:web:63aa20b19e5c305d80a96d",
  measurementId: "G-CHEN84Z1VG"
};

//Importing core firebase library and authentication firebase library.
import * as firebase from 'firebase/app';
import 'firebase/auth';
//Required components and pipes in our application.
import { LoginComponent } from './login/login.component';
import { CapitalizePipe } from './capitalize.pipe';
import { MenuComponent } from './menu/menu.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule} from '@angular/common/http';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';


//Initializing the firebase SDK for our project(i.e our integration work is over).
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CapitalizePipe,
    MenuComponent,
    MyblogsComponent,
    HomeComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditprofileComponent,
    ProfileComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
