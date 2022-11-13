import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) { 
   // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get('https://myangular-app-b7249-default-rtdb.firebaseio.com/documents.json')
      .subscribe((documents: Document[] ) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          documents.sort((a: Document, b: Document) => {
            if (a < b) return -1;
            else if (a > b) return 1;
            else return 0;
          });
          const clonedDocuments = documents.slice()
          this.documentListChangedEvent.next(clonedDocuments);
      }, (error: any) => {
          console.log(error);
      }
    )
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

  storeDocuments(documentsListClone: Document[]) {
    const documentsJson = JSON.stringify(documentsListClone);
    const httpHeader = new HttpHeaders(
      {'Content-Type': 'application/json'},
    );
    this.http.put(
      'https://myangular-app-b7249-default-rtdb.firebaseio.com/documents.json',
       documentsJson, 
       {headers: httpHeader}
    ).subscribe(
      () => {
        this.documentListChangedEvent.next(documentsListClone);
      }
    )
  } 

}
