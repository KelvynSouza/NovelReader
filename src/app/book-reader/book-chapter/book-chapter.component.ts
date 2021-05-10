import { Location } from '@angular/common';
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
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
    private bookReaderservice: BookReaderService,
    private router: Router,
    private location: Location,
    ) { }

  ngOnInit() {    
      this.ChapterNumber = this.route.snapshot.paramMap.get('number');   

      this.bookReaderservice.getChapterText(this.ChapterNumber);
      this.subscriber = this.bookReaderservice.chapterContent$.subscribe(e => {
        this.ChapterContent = e;
      });      
  }

  nextChapter(){
    const nextchapter = this.ChapterContent.chapNumber+1;

    let newurl = this.location.path().replace(String(this.ChapterContent.chapNumber), String(nextchapter));
    this.location.go(newurl);

    this.router.navigate
    this.bookReaderservice.getChapterText(nextchapter);
  }
  previousChapter(){
    const previouschapter = this.ChapterContent.chapNumber-1;

    let newurl = this.location.path().replace(String(this.ChapterContent.chapNumber), String(previouschapter));
    this.location.go(newurl);

    this.bookReaderservice.getChapterText(previouschapter);
  }

  
}
