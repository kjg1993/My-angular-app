import { Contact} from "./contact.model";
import { Subject } from "rxjs";
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>()
  
  contacts: Contact[] = [];
  maxId: number;
  currentId: number;
  maxContactId: number;
  contactListClone: Contact[];


  constructor() {
    this.contacts = MOCKCONTACTS;
   }
   
   getContacts(): Contact[]{
     return this.contacts.slice();
  }

   getContact(id: string): Contact{
 
    for (let index = 0; index < this.contacts.length; index++) {
      const element = this.contacts[index];
      if (element.id === id) {
         return element;
      }
    }
    return null;
   }
   
   deleteContact(contact: Contact){
    if (!contact) {
      return;
  }
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) {
      return;
  }
  this.contacts.splice(pos, 1);
  this.contactChangedEvent.next(this.contacts.slice());
      
  }

  addContact(newContact: Contact){
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListClone = this.contacts.slice();

    this.contactChangedEvent.next(this.contactListClone)
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if(!originalContact || !newContact){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    newContact[pos] = newContact;
    this.contactListClone = this.contacts.slice();
    this.contactChangedEvent.next(this.contactListClone);
  }


  getMaxId(): number {
    this.maxId = 0;

    for(let contact of this.contacts) {
       this.currentId = +contact.id;
       if(this.currentId > this.maxId){
        this.maxId = this.currentId;
       };
      return this.maxId;
    }
  }
}
