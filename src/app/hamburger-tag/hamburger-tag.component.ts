import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../crud.service';


@Component({
  selector: 'app-hamburger-tag',
  templateUrl: './hamburger-tag.component.html',
  styleUrls: ['./hamburger-tag.component.css']
})
export class HamburgerTagComponent implements OnInit {
  @Input() filename: any = "";

 // @Output() tag: EventEmitter<boolean> = new EventEmitter();
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

  overlay() {
    //this.tag.emit(this.buttonHide);
    this.overlayHide = true;
    this.menuHidden = true;
    this.hamburgerHide = true;
    this.closeHidden = false;
  }

  closeModal() {
    this.overlayHide = false;
    this.hamburgerHide = false;
}

createTag() {
  const input = (<HTMLInputElement>document.getElementById("inputValue")).value;
  this.crud.createPersonalHashtag(input, this.filename);
  console.log(input);
  this.hamburgerHide = false;
}

}