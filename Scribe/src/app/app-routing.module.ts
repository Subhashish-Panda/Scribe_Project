import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import {  AuthGuard} from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [{
  path:'login',
  component:LoginComponent
},
{
  path:'',redirectTo:'home',pathMatch:'full'
},
{
  path:'home',
  component:HomeComponent
},
{
  path:'myblogs',
  component:MyblogsComponent,
  canActivate:[AuthGuard]
},
{
  path:'view/:postId',component:ViewComponent,canActivate:[AuthGuard]
},
{
  path:'editprofile/:id',component:EditprofileComponent,canActivate:[AuthGuard]
},
{
  path:'profile/:id',component:ProfileComponent,canActivate:[AuthGuard]
},
{
  path:'**',
  component:ErrorComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
