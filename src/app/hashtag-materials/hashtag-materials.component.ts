import { Component, OnInit, HostBinding } from '@angular/core';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hashtag-materials',
  templateUrl: './hashtag-materials.component.html',
  styleUrls: ['./hashtag-materials.component.css']
})
export class HashtagMaterialsComponent implements OnInit {

  selectedFiles?: FileList;

  fileUploads?: any[];

  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  overlayHide: boolean = false;


  constructor() { }

  ngOnInit(): void {
    
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    
  }


onStarEnter(starId: any) {
  this.hoverState = starId;
}

onStarLeave() {
  this.hoverState = 0;
}

onStarClicked(starId: any) {
  this.rating =starId;
  console.log(this.rating);
}


onTagging(buttonHide: boolean) {
this.overlayHide = buttonHide;
}

closeModal() {
    this.overlayHide = false;
}

createTag() {
  console.log("Test");
}

}