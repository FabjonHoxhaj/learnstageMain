import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Input() starId: any;
  @Input() rating: any;

  @Output() starEnter: EventEmitter<number> = new EventEmitter();
  @Output() starLeave: EventEmitter<number> = new EventEmitter();
  @Output() starClicked: EventEmitter<number> = new EventEmitter();
 

  constructor() { }

  ngOnInit() {}

  StarEnter() {
    this.starEnter.emit(this.starId);
  }

  StarLeave() {
    this.starLeave.emit();
  }

  StarClicked() {
    this.starClicked.emit(this.starId);
  }

}