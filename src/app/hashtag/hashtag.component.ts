import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-hashtag',
  templateUrl: './hashtag.component.html',
  styleUrls: ['./hashtag.component.css'],
  providers: [HttpService]
})
export class HashtagComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getData().subscribe(
      (data: any) => {
        for (let i of Object.values(data))
          this.arraySet.add(i)
      });
  }

  arraySet = new Set();
  isHidden: boolean = false;
  showHashtags: boolean = false;


  closeButton() {
    this.isHidden = false;
  }

  newHashtag() {
    this.isHidden = true;
  }

  create() {
    let input = (<HTMLInputElement>document.getElementById("inputValue")).value;
    this.arraySet.add(input);

    this.http.sendDataHashtags(input).subscribe(
      data => console.log(data),
      error => console.error(error));

    this.closeButton();
  }

}