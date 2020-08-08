import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
//Importing necessary firebase library in our guard.
import * as firebase from 'firebase/app';
import 'firebase/auth';
//Importing the router service inside this guard.
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private rt:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve,reject)=>{
      //Checking whaether the current user is logged-in or not.
      firebase.auth().onAuthStateChanged((user)=>{
        if(user)
        resolve(true);
        else
        {
        this.rt.navigate(['/login']);    
        resolve(false);
        }
      });
  });
}

}