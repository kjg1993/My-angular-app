import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
   messages: Message[] = [];
   messageChangedEvent = new EventEmitter<Message[]>();
   maxMessageId: number;
 

  constructor(private http: HttpClient) {
    //this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    this.http.get('https://myangular-app-b7249-default-rtdb.firebaseio.com/messages.json')
      .subscribe((messages: Message[] ) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          messages.sort((a: Message, b: Message) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
          });
          const clonedMessages = messages.slice()
          this.messageChangedEvent.next(clonedMessages);
      }, (error: any) => {
          console.log(error);
      }
    )
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
    const messagesListClone = this.messages.slice();
    this.storeMessages(messagesListClone);
    
   }

   getMaxId(): number {
    let maxId = 0

    for (let message of this.messages){
      let currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId
  }
  

  storeMessages(messagesListClone: Message[]) {
    const messagesJson = JSON.stringify(messagesListClone);
    const httpHeader = new HttpHeaders(
      {'Content-Type': 'application/json'},
    );
    this.http.put(
      'https://myangular-app-b7249-default-rtdb.firebaseio.com/messages.json',
       messagesJson, 
       {headers: httpHeader}
    ).subscribe(
      () => {
        this.messageChangedEvent.next(messagesListClone);
      }
    )
  } 
}
