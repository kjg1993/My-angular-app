
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  // documents: Document[] = [
  //   new Document(1, 
  //     "CIT 260 - Object Oriented Programming", 
  //     "In this course you will learn Object Oriented Programming and the Java programming language by designing and creating a simple game.", 
  //     "https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html", 
  //     {'children': '5'}),

  //     new Document(2, 
  //       "CIT 366 - Full Stack Web Development", 
  //       "This course will teach you how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.", 
  //       "https://www.byui.edu/computer-information-technology/courses", 
  //       {'children': '4'}),

  //       new Document(3, 
  //         "CIT 425 - Data Warehousing", 
  //         "This course defines the theory and practice of data analysis. The course will compare and contrast the operational and analytical database models.", 
  //         "https://www.byui.edu/computer-information-technology/courses", 
  //         {'children': '3'}),

       
  //           new Document(4, 
  //             "CIT 460 - Enterprise Development", 
  //             "Learn how to develop web applications using the Mean Stack", 
  //             "https://content.byu.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT_336-course-description.pdf", 
  //             {'children': '2'}),

  //             new Document(5, 
  //               "CIT 495 - Senior Practicum", 
  //               "This is a capstone experience for the Computer Information Technology major. There are two options available: A research paper on a relevant Information Technology topic or participate in service learning.", 
  //               "https://www.byui.edu/computer-information-technology/courses", 
  //               {'children': '1'}),
  

  // ]

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document){
    this.documentService.documentSelectedEvent.emit(document);
  }

}
