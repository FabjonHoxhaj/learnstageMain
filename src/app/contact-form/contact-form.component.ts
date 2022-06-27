import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  providers: [HttpService]
})
export class ContactFormComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.http.sendDataForm(form.value).subscribe(
      data => console.log(data),
      error => console.error(error));
      form.resetForm();
  }

}