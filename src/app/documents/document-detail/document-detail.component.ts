import { Routes, ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from 'src/app/wind-ref.service';


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

@Injectable()
export class DocumentDetailComponent implements OnInit {
 document: Document;
 id: string;
 nativeWindows: any;

  constructor(private documentService: DocumentService, 
              private activateRourter: ActivatedRoute,
              private router: Router,
              private winRefService: WindRefService) { 
                this.nativeWindows = winRefService.getNativeWindow();

              }

  ngOnInit() {
    this.activateRourter.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.documentService.getDocument(this.id);

    })
  }

  
  onView(){
    if (this.document.url) {
      this.nativeWindows.open(this.document.url);
      
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents']);  
 }
}
