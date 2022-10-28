import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
   messages: Message[] = [];
   messageChangedEvent = new EventEmitter<Message[]>();
 

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message {

    for(let index = 0; index < this.messages.length; index++){
      const element = this.messages[index];
      if(element.id === id){
        return element;
      }
    }
    return null;
   }

   addMessage(message: Message): void {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    
   }
}
