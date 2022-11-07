import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  sameOrDuplicated: boolean = false;
  invalidGroupContact: boolean = false;


  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.sameOrDuplicated = false;
      let id = params['id'];
      if(id === null || id === undefined){
        this.editMode = false;
        return;
      }

      let contact = this.contactService.getContact(id);
      if(contact === undefined || contact === null){
        return;
      }

      this.originalContact = contact;
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(contact));
      
      if (contact.group) {
        this.groupContacts = contact.group.slice();
      }
    });
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  onSubmit(form: NgForm) {
    let contact = new Contact(
      form.value.id,
      form.value.name, 
      form.value.email, 
      form.value.phone, 
      form.value.imageUrl, 
      this.groupContacts
    );
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, contact);
    } else {
      this.contactService.addContact(contact);
    }

    this.router.navigate(['/contacts']);

  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }
    if(newContact.id === this.contact.id){
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++){
        if (newContact.id === this.groupContacts[i].id) {
          return true;
        }
    }
    return false;
  }

  addToGroup($event: any){
    const selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if(this.invalidGroupContact){
      this.sameOrDuplicated = true;
      return;
    }
    this.sameOrDuplicated = false;
    this.groupContacts.push(selectedContact);
  }

  
  onRemoveItem(index: number) {
    if(index < 0 || index > this.groupContacts.length){
        return;
    }
    this.groupContacts.splice(index, 1);
  }

}
