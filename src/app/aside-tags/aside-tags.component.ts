import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-aside-tags',
  templateUrl: './aside-tags.component.html',
  styleUrls: ['./aside-tags.component.css']
})
export class AsideTagsComponent implements OnInit {

  constructor(private item: CrudService) { }

  arraySet: any = new Set();
  personalTags: []= [];

  ngOnInit(): void {
    this.item.readHashtags().subscribe(items => {
      this.arraySet= new Set();
      for (let i of Object.values(items))
            this.arraySet.add(i)
    })
    this.item.readHashtags().subscribe((data: any) => {
      this.personalTags = data;
      console.log(this.personalTags);
    });
  }

}
