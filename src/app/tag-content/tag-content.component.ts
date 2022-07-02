import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-content',
  templateUrl: './tag-content.component.html',
  styleUrls: ['./tag-content.component.css']
})
export class TagContentComponent implements OnInit {

  personalTags: any;

  constructor(private item: CrudService, private activate: ActivatedRoute) { }

  ngOnInit(): void {
    const tag = this.activate.snapshot.paramMap.get("tag");
    this.item.readPersonalTags(tag);
    this.item.getPersonalTags().subscribe((data:any)=>{
      this.personalTags = data;
    })
  }

}
