import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.css']
})
export class HashtagComponent implements OnInit {

  constructor(private item: CrudService) { }

  arraySet: any = new Set();
  personalTags: []= [];
  isHidden: boolean = false;
  showHashtags: boolean = false;

  ngOnInit(): void {
    this.item.readHashtags().subscribe(items => {
      this.arraySet= new Set();
      for (let i of Object.values(items))
            this.arraySet.add(i)
    })
    this.item.readPersonalTags().subscribe((data: any) => {
      this.personalTags = data;
      console.log(this.personalTags);
    });
  }


  closeButton() {
    this.isHidden = false;
  }

  newHashtag() {
    this.isHidden = true;
  }

  createHashtag() {
    let input = (<HTMLInputElement>document.getElementById("inputValue")).value;
    const hashtag = input;
    if(hashtag.startsWith("#")) {
      this.item.createHashtags(input);
    }
   else {
    this.item.createHashtags("#" + input);
   }

   this.closeButton();
   
  }

  loadHashtagFiles(hashtagString: any) {
    this.item.readFiles(hashtagString);
    this.item.saveHashtag(hashtagString);
  }

}