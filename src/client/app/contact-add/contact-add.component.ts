import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { NgForm } from '@angular/forms';
import { MongodbService } from '../shared/mongodb.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  newContact: boolean;

  constructor(public mongodb: MongodbService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.mongodb.postContact(form.value)
      .subscribe(res => {
        form.reset();
      });
  }
}
