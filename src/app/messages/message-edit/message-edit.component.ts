import { Component, OnInit, ElementRef, 
  EventEmitter, 
  Output, 
  ViewChild } from '@angular/core';

import {Message} from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
 @Output() addMessageEvent = new EventEmitter<Message>();
 @ViewChild('subject') subect: ElementRef;
 @ViewChild('msgText') msgText: ElementRef;
 currentSender: string = 'seth';

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(){
    const subject = this.subect.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const message = new Message('1', subject, msgText, this.currentSender);
    this.addMessageEvent.emit(message);

  }

  onClear() {
    this.subect.nativeElement.value = "";
    this.subect.nativeElement.value = "";
  }

}
