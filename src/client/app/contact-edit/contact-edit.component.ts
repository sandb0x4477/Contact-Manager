import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { NgForm } from '@angular/forms';
import { MongodbService } from '../shared/mongodb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  selectedContact: Contact;

  constructor(public mongodb: MongodbService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.mongodb.updateContact(form.value._id, form.value)
      .subscribe(res => {
        this.router.navigate(['/contacts']);
      });
    }
}
