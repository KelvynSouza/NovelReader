import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscriber, Subscription } from "rxjs";

import { BookReaderService } from '../book-reader.service';
import { ChapterContent } from '../model/chaptercontent-model';


@Component({
  selector: 'app-book-chapter',
  templateUrl: './book-chapter.component.html',
  styleUrls: ['./book-chapter.component.css']
})
export class BookChapterComponent {
    
  ChapterNumber:string;
  ChapterContent:ChapterContent;
  subscriber: Subscription;

  constructor( 
    private route: ActivatedRoute,
    private bookReaderservice: BookReaderService
    ) { }

  ngOnInit() {    
      this.ChapterNumber = this.route.snapshot.paramMap.get('number');   

      this.bookReaderservice.getChapterText(this.ChapterNumber);
      this.subscriber = this.bookReaderservice.chapterContent$.subscribe(e => {
        this.ChapterContent = e;
      });

  }

  
}
