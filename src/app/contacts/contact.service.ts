import { Contact} from "./contact.model";
import { Injectable, EventEmitter } from '@angular/core';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  // static getContacts(): Contact[] {
  //   throw new Error('Method not implemented.');
  // }
  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   getContacts(): Contact[]{
    return this.contacts.slice();
  }

   getContact(id: string){
    for(let contact of this.contacts.slice()){
       if (contact.id === id) {
          return contact
       } else {
        return null
       }
    }

   }
   
   contactSelectedEvent = new EventEmitter<Contact>();

   }
