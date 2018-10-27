import { Component, OnInit } from '@angular/core';
import { Contact } from '../shared/contact.model';
import { MongodbService } from '../shared/mongodb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(public mongodb: MongodbService, private router: Router) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.mongodb.getContacts()
      .subscribe(data => {
        this.contacts = data;
      });
  }

  deleteContact(contact: Contact) {
    this.mongodb.deleteContect(contact._id)
      .subscribe(res => {
        this.getContacts();
      });
  }

  editContact(contact) {
    this.mongodb.selectedContact = contact;
    this.router.navigate(['/edit']);
  }
}
