import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CrudService } from './crud.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userTest = 'fabjon';
  passwordTest = 'test';
  loggingIn = false;
  private readonly isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly userName: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private readonly userPassword: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private crud: CrudService) {
    
  }

  getUsername(): BehaviorSubject<string> {
    return this.userName;
  }

  setUsername(value: string): void {
    this.userName.next(value);
  }

  getPassword(): BehaviorSubject<string> {
    return this.userPassword;
  }

  setPassword(value: string): void {
    this.userPassword.next(value);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  setIsLoggedIn(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  checkUser(uname: string, upassword: string) {
    this.loggingIn = true;
    this.firestore.collection("users").snapshotChanges().subscribe((users) => {
      if (this.loggingIn) {
        this.setIsLoggedIn(false);
        for (let i of Object.values(users)) {
          const username = i.payload.doc.id;
          const userpassword = i.payload.doc.get("password");
          if (uname === username && upassword === userpassword) {
            this.setUsername(uname);
            this.setPassword(upassword);
            this.setIsLoggedIn(true);
            this.crud.setUsername(uname);
            break;
          } 
        }
        this.loggingIn = false;
      }
    }
    )
  }
}