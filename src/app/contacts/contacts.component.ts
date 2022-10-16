import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  constructor(private contactServices: ContactService) { }

  ngOnInit(): void {
    this.contactServices.contactSelectedEvent.subscribe( contact => {
      this.selectedContact = contact;
    });
  }

}
