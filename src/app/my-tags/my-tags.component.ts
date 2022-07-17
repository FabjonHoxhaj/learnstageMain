import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-my-tags',
  templateUrl: './my-tags.component.html',
  styleUrls: ['./my-tags.component.css']
})
export class MyTagsComponent implements OnInit {

  personalTagNames: []= [];

  constructor(private item: CrudService) { }

  ngOnInit(): void {
    this.item.readPersonalTagNames();
    this.item.getPersonalTagNames().subscribe((data:any)=>{
      this.personalTagNames = data;
    })
  }

  

}
