import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {

 contacts: Contact[] = [];
 contactSubscription: Subscription;
 term: string;

 

  constructor(private contactServices: ContactService ) {}

  ngOnInit(): void {
    this.contacts =  this.contactServices.getContacts();
    this.contactSubscription = this.contactServices.contactChangedEvent.
    subscribe((contact: Contact[])=>{
      this.contacts = contact;
    })
  }

  onContactSelected(contact: Contact){
    this.contactServices.contactSelectedEvent.next(contact);
  }

  ngOnDestroy(){
    this.contactSubscription.unsubscribe();
  } 

  search(value: string){
    this.term = value;
  }

}
