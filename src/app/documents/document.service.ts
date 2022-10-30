import { Injectable, EventEmitter } from '@angular/core';
import {Subject } from 	'rxjs'
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // documentChangedEvent = new Subject<Document[]>()
  documentSelectedEvent = new Subject<Document>()
  documentListChangedEvent = new Subject<Document[]>()

  documents: Document[] = [];
  maxDocumentId: number;
  documentsListClone: Document[];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
    this.documentListChangedEvent.next(this.documents.slice());
  }


  getMaxId():number{
   let maxId = 0;

   for (const document of this.documents) {
       let currentId = +document.id;
       if (currentId > maxId) {
          maxId = currentId;
       }
       return maxId;
   }
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice(); 
    
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  updateDocument(originalDocument:Document, newDocument: Document){
    if (!originalDocument || !newDocument) {
      return;
    };
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    };
    newDocument.id = originalDocument.id;
    document[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
  }

  deletDocument(document:Document){
    if(!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.slice(pos, 1);
    this.documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(this.documentsListClone);
  }

}
