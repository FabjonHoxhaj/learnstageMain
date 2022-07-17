import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  user = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsername().subscribe((user)=>{
      this.user = user;
    });
  }

}
