import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../crud.service';


@Component({
  selector: 'app-hamburger-tag',
  templateUrl: './hamburger-tag.component.html',
  styleUrls: ['./hamburger-tag.component.css']
})
export class HamburgerTagComponent implements OnInit {
  @Input() filename: any = "";

  menuHidden: boolean = true;
  hamburgerHide: boolean = true;
  closeHidden: boolean = false;
  zaehler: number = 0;
  buttonHide: boolean = true;
  overlayHide: boolean = false;


  constructor(private crud: CrudService) { }

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
    this.overlayHide = true;
    this.menuHidden = true;
    this.closeHidden = true;
  }

  closeModal() {
    this.overlayHide = false;
    this.hamburgerHide = true;
    this.closeHidden = false;
}

createTag() {
  const input = (<HTMLInputElement>document.getElementById("inputValue")).value;
  this.crud.createPersonalHashtag(input, this.filename);
  console.log(input);
  this.hamburgerHide = false;
  this.closeModal();
}

}