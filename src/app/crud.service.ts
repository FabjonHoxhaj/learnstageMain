import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { Firestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore, ) { }

  fileName: BehaviorSubject<[]> = new BehaviorSubject([]);
  personalTagNames: BehaviorSubject<[]> = new BehaviorSubject([]);
  personalTags: BehaviorSubject<[]> = new BehaviorSubject([]);
  hashtag: BehaviorSubject<string> = new BehaviorSubject("");
  downloadURL: BehaviorSubject<string> = new BehaviorSubject(" ");

  

  readHashtags() { 
      return this.firestore.collection("hashtags").valueChanges();
  }

  createHashtags(input: String) {
      const merkel = this.firestore.collection("hashtags");
      const inputSplit = input.split("#");
      merkel.doc(inputSplit[1]).set({name: input})
  }

  createPersonalTag(input: string, filename: string) {
    const merkel = this.firestore.collection("users").doc("fabjon");
    merkel.collection(input).add({name:filename})
    let tagIstVorhanden = false;
    merkel.valueChanges().subscribe((data: any)=>{
      if(!tagIstVorhanden){
        for (const d of data.subcollections) {
          console.log(d);
          if(d === input) {
            tagIstVorhanden = true;
          }
        }
        if(!tagIstVorhanden){
          data.subcollections.push(input);
        }
        console.log(data.subcollections);
        merkel.set({subcollections: data.subcollections});
      }
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

  readPersonalTagNames(): any{
    //return this.firestore.collection("users").doc("fabjon");
    this.firestore.collection("users").doc("fabjon").valueChanges().subscribe((data:any)=>{
      this.setPersonalTagNames(data.subcollections);
      const tagNames = data.subcollections;
    });
  }

  readPersonalTags(tagName: any) {
      this.firestore.collection("users").doc("fabjon").collection(tagName).valueChanges().subscribe((data:any)=>{
        this.setPersonalTags(data)
      });
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