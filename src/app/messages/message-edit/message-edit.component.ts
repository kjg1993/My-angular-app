import { Component, OnInit, ElementRef, 
  EventEmitter, 
  Output, 
  ViewChild } from '@angular/core';
import {Message} from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
 currentSender: string = 'seth';


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage(event: any){
    const subject = event.target.value;
    const msgText = event.target.value;
    console.log(subject)
    const message = new Message('1', subject, msgText, this.currentSender);
   this.addMessageEvent.emit(message);
    this.messageService.addMessage(message);

  }

  onClear() {
     this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }

}
