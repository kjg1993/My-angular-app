import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id: string ){
    for(let document of this.documents.slice()){
        if (document.id === id) {
           return document
        } else {
          return null; 
        };
    };
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }

  documentSelectedEvent = new EventEmitter<Document>()
  documentChangedEvent = new EventEmitter<Document[]>()
}
