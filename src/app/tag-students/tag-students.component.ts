import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from "firebase/auth";
import { AuthService } from "../auth.service";
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-tag-students',
  templateUrl: './tag-students.component.html',
  styleUrls: ['./tag-students.component.css']
})
export class TagStudentsComponent implements OnInit {

  sharedTagNames: []= [];

  constructor(private authService: AuthService, private item: CrudService) { }

  ngOnInit(): void {
    this.item.readSharedTagNames();
    this.item.getSharedTagNames().subscribe((data:any)=>{
      this.sharedTagNames = data;
    })
    // this.authService.getUsername().subscribe((res)=>{
    //   this.user = res;
      // this.item.readStudentTags(this.user);
    // });
    // this.item.getPersonalTagNames().subscribe((data:any)=>{
    //   this.studentTagNames = data;
    // })
  }

}
