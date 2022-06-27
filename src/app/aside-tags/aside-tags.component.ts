import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-aside-tags',
  templateUrl: './aside-tags.component.html',
  styleUrls: ['./aside-tags.component.css'],
  providers:[HttpService]
})
export class AsideTagsComponent implements OnInit {

  constructor(private http: HttpService) { }

  hashtags = new Set();

  ngOnInit(): void {
    this.http.getData().subscribe(
      (data: any) => {
        for (let i of Object.values(data))
          if(this.hashtags.size<=19) {
            this.hashtags.add(i)
          }
      });
  }

}
