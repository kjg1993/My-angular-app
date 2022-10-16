import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  messageSender: string | undefined;
  @Input() message: Message;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    this.messageSender = contact?.name;
  }

}
