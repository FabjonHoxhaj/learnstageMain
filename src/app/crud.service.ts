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

  createPersonalHashtag(input: string, filename: string) {
    const merkel = this.firestore.collection("users").doc("fabjon");
//lesen der subcollections, lesen der subcollection aus docuemnt field
//input der subcollection hinzufügen
//setter mit neuer Subcollection aufrufen

    merkel.set({subcollections: [1,2,3,4]});
    merkel.collection(input).add({name:filename})
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

  readPersonalTags(): any{
    return this.firestore.collection("users").doc("fabjon");
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