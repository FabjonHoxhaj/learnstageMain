import { Injectable, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
  export class CrudService implements OnInit {


  constructor(private firestore: AngularFirestore, private authService: AuthService) {
   }

  fileName: BehaviorSubject<[]> = new BehaviorSubject([]);
  personalTagNames: BehaviorSubject<[]> = new BehaviorSubject([]);
  personalTags: BehaviorSubject<[]> = new BehaviorSubject([]);
  hashtag: BehaviorSubject<string> = new BehaviorSubject("");
  downloadURL: BehaviorSubject<string> = new BehaviorSubject(" ");
  registrationProcess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly user: BehaviorSubject<string> = new BehaviorSubject<string>("");

  ngOnInit() {
 
  }

  readHashtags() { 
      return this.firestore.collection("hashtags").valueChanges();
  }

  createHashtags(input: String) {
      const merkel = this.firestore.collection("hashtags");
      const inputSplit = input.split("#");
      merkel.doc(inputSplit[1]).set({name: input})
  }

  createPersonalTag(input: string, filename: string) {
    const merkel = this.firestore.collection("users").doc(this.user.value);
    merkel.collection(input).add({name:filename})
    let tagIstVorhanden = false;
    this.updateSubCollections(tagIstVorhanden,input);
}

updateSubCollections(tagIstVorhanden: boolean, input: string){
  const merkel = this.firestore.collection("users").doc(this.user.value);
  merkel.valueChanges().subscribe((data: any)=>{
    if(!data.subcollections){
      merkel.set({subcollections: []});
    }
    const subCollections = data.subcollections;
    if(!tagIstVorhanden){
      for (const d of data.subcollections) {
        if(d === input) {
          tagIstVorhanden = true;
        }
      }
      if(!tagIstVorhanden){
        subCollections.push(input);
      }
      merkel.set({subcollections: subCollections, password: data.password});
    }
  });
}

deleteInSubCollections(merkel: any, tagIstVorhanden: boolean, input: string){
  merkel.valueChanges().subscribe((data: any)=>{
    if(!tagIstVorhanden){
      for (const d of data.subcollections) {
        if(d === input) {
          tagIstVorhanden = true;
        }
      }
      if(tagIstVorhanden){
        data.subcollections.splice(data.subcollections.indexOf(input),1);
      }
      merkel.set({subcollections: data.subcollections});
    }
  });
}

  async deletePersonalTag(filename: string) {
  this.firestore.collection("users").doc(this.user.value).collection(filename).valueChanges({idField:"id"}).subscribe((data: any) => {
    data.forEach((element: any) => {
      this.firestore.collection("users").doc(this.user.value).collection(filename).doc(element.id).delete();
    });
    this.deleteInSubCollections(
      this.firestore.collection("users").doc(this.user.value), false, filename
      );
    });
}

  readFiles(hashtagString: any) {
    let files: any = [];
    const hashtagSplit = hashtagString.split("#");
    this.firestore.collection("hashtags").doc(hashtagSplit[1]).collection("files").valueChanges().subscribe((data: any) => { 

      files = [];
      for(let i of Object.values(data)) {
        files.push(i)
      }
      this.setFileName(files)
    });
  }

  checkIfUserExists(uname: any, pwd: any) {
    this.firestore.collection("users").snapshotChanges().subscribe((users)=>{
      let userAlreadyExists = false;
      if(this.getRegProcess().value){
        for(let i of Object.values(users)) {
          const username = i.payload.doc.id;
          if(uname === username){
            userAlreadyExists = true;
            break;
          }
        }
        if(!userAlreadyExists){
          this.createUser(uname, pwd);
        }
      }
      
      this.setRegProcess(false); 
    });
  }       
   

  createUser(name: string, pwd: string) {
    const merkel = this.firestore.collection("users");
    merkel.doc(name).set({password: pwd});
  }

  readPersonalTagNames(): any{
    //return this.firestore.collection("users").doc(this.user.value);
    this.firestore.collection("users").doc(this.user.value).valueChanges().subscribe((data:any)=>{
      this.setPersonalTagNames(data.subcollections);
      const tagNames = data.subcollections;
    });
  }

  readPersonalTags(tagName: any) {
      this.firestore.collection("users").doc(this.user.value).collection(tagName).valueChanges().subscribe((data:any)=>{
        this.setPersonalTags(data)
      });
  }

  getRegProcess() {
    return this.registrationProcess;
  }

  setRegProcess(element:boolean) {
    this.registrationProcess.next(element);
  }

  getPersonalTagNames() {
    return this.personalTagNames;
  }

  setPersonalTagNames(element:[]) {
    this.personalTagNames.next(element);
  }

  getPersonalTags() {
    return this.personalTags;
  }

  setPersonalTags(element:any) {
    this.personalTags.next(element);
  }

  setFileName(element:[]) {
    this.fileName.next(element);
  }

  getFileName() {
    return this.fileName;
  }
  getUsername(): BehaviorSubject<string> {
    return this.user;
  }

  setUsername(value: string): void {
    this.user.next(value);
  }

  saveHashtagFile(hashtagString: any, filename: any, url: any) {
    const hashtagSplit = hashtagString.split("#");
        this.firestore.collection("hashtags").doc(hashtagSplit[1]).collection("files").doc(filename).set({name: filename, url: url});
  }


  saveHashtag(hashtag: any) {
    this.hashtag.next(hashtag);
  }

  getHashtag() {
    return this.hashtag;
  }

  saveURL() {

  }

  getURL() {
    let url: any = [];
  }
}