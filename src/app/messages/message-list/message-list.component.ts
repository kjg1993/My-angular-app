import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message("1", "Test 1", "The grade for this assignment have been posted", "Bro. Jackson"),
    new Message("2", "Test 2", "When is assignment 3 due", "Steve Johnson"),
    new Message("3", "Test 3", "Assignment 3 is due on Saturday at 11:30 pm", "Bro. Jackson"),
    new Message("4", "Test 4", "Can I meet with you sometime. I need help with assigment 3 ", "Mark Smith"),
    new Message("5", "Test 5", "I can meet with you today at 4:00 pm in my office", "Bro. Jackson")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
