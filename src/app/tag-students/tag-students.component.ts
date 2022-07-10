import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth } from "firebase/auth";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-tag-students',
  templateUrl: './tag-students.component.html',
  styleUrls: ['./tag-students.component.css']
})
export class TagStudentsComponent implements OnInit {

  user = 'fabjon';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  this.authService.checkUser();
  }

}
