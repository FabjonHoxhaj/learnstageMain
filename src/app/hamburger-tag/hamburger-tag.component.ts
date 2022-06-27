import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-hamburger-tag',
  templateUrl: './hamburger-tag.component.html',
  styleUrls: ['./hamburger-tag.component.css']
})
export class HamburgerTagComponent implements OnInit {

  @Output() tag: EventEmitter<boolean> = new EventEmitter();
  menuHidden: boolean = true;
  hamburgerHide: boolean = true;
  closeHidden: boolean = false;
  zaehler: number = 0;
  buttonHide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showMenu() {
    if(this.zaehler==0) {
      this.menuHidden = false;
      this.hamburgerHide = false;
      this.closeHidden = true;
      this.zaehler++;
      return;
    }
    if(this.zaehler==1) {
      this.menuHidden = true;
      this.hamburgerHide = true;
      this.closeHidden = false;
      this.zaehler--;
      return;
    }  
  }

  tagging() {
    this.tag.emit(this.buttonHide);
    this.menuHidden = true;
    this.hamburgerHide = true;
    this.closeHidden = false;
  
  }


}