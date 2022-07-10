import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userTest = 'fabjon';
  passwordTest = 'test';
  private readonly isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) { 
    this.checkUser();
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  checkUser() {
    this.firestore.collection("users").snapshotChanges().subscribe((users)=>{
      for(let i of Object.values(users)) {
        const username = i.payload.doc.id;
        const userpassword = i.payload.doc.get("password");
        if(this.userTest === username && this.passwordTest === userpassword){
          this.setIsLoggedIn(true);
          // console.log(username);
          // console.log(userpassword);
        } else {
          this.setIsLoggedIn(false);
        }
      }
    });
  
    // this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user:any)=>{
    //   console.log(user.additionalUserInfo?.profile.name)
    // });
    // this.auth.signInAnonymously();
    // getAuth().onAuthStateChanged(user => {
    //   if (user?.isAnonymous === true) {
    //     // Redirect to a page for the user to give you their credentials.
    //     // console.log(user);
    //     console.log(user);
    //   } else {
    //     console.log('ist nicht anonym');
    //     // Give access to the detail page.
    //   }
    // });
    // onAuthStateChanged(getAuth(), (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     const uid = user.uid;
    //     console.log(user.displayName);
    //     // ...
    //   } else {
    //     // User is signed out
    //     // ...
    //   }
    // });
  }

  logout() {
    this.auth.signOut();
  }
}