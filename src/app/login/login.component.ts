import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private authService: AuthService, private crud: CrudService) { }

  overlayHide: boolean = false;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.authService.setUsername('');
    this.authService.setPassword('');
    this.authService.checkUser('','');
    this.crud.setUsername("");
  }

  login() {
    let username = (<HTMLInputElement>document.getElementById("uname")).value;
    let userpassword = (<HTMLInputElement>document.getElementById("psw")).value;
    this.authService.checkUser(username, userpassword);
    this.router.navigateByUrl('home');
  }

  regUser() {
    this.crud.setRegProcess(true);
    const inputUser = (<HTMLInputElement>document.getElementById("inputUser")).value;
    const inputPassword = (<HTMLInputElement>document.getElementById("inputPassword")).value;
    this.crud.checkIfUserExists(inputUser, inputPassword);
    this.closeModal();
    this.overlayHide = false;
  }

  closeModal() {
    this.overlayHide = false;
  }

  newUser() {
    this.overlayHide = true;
  }

}
