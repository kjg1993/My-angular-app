import { HttpClient, HttpHeaders } from '@angular/common/http';
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


  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
   }
   
   getContacts(): Contact[] {
    this.http.get('https://myangular-app-b7249-default-rtdb.firebaseio.com/contacts.json')
      .subscribe((contacts: Contact[] ) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          contacts.sort((a: Contact, b: Contact) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
          });
          const clonedContacts = contacts.slice()
          this.contactChangedEvent.next(clonedContacts);
      }, (error: any) => {
          console.log(error);
      }
    )
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

  storeContacts(contactsListClone: Contact[]) {
    const contactsJson = JSON.stringify(contactsListClone);
    const httpHeader = new HttpHeaders(
      {'Content-Type': 'application/json'},
    );
    this.http.put(
      'https://myangular-app-b7249-default-rtdb.firebaseio.com/contacts.json',
       contactsJson, 
       {headers: httpHeader}
    ).subscribe(
      () => {
        this.contactChangedEvent.next(contactsListClone);
      }
    )
  } 
}
