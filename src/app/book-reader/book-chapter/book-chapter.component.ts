import { DOCUMENT, Location } from '@angular/common';
import { Component, Input, SimpleChanges, OnChanges, Inject, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Subscriber, Subscription } from "rxjs";

import { BookReaderService } from '../book-reader.service';
import { ChapterContent } from '../model/chaptercontent-model';


@Component({
  selector: 'app-book-chapter',
  templateUrl: './book-chapter.component.html',
  styleUrls: ['./book-chapter.component.css']
})
export class BookChapterComponent implements  OnInit, OnDestroy{
    
  ChapterNumber:string;
  ChapterContent:ChapterContent;
  subscriber: Subscription;

  constructor( 
    private route: ActivatedRoute,
    private bookReaderservice: BookReaderService,
    private router: Router,
    private location: Location,
    @Inject(DOCUMENT) document
    ) { }
 

  ngOnInit() {    
      this.ChapterNumber = this.route.snapshot.paramMap.get('number');   

      this.bookReaderservice.getChapterText(this.ChapterNumber);
      this.subscriber = this.bookReaderservice.chapterContent$.subscribe(e => {        
        this.ChapterContent = e;
        if(this.ChapterContent !== null){
          this.appendDataInPage()
        }
      });      
  }

  nextChapter(){
    const nextchapter = this.ChapterContent.chapNumber+1;

    let newurl = this.location.path().replace(String(this.ChapterContent.chapNumber), String(nextchapter));
    this.location.go(newurl);

    this.bookReaderservice.getChapterText(nextchapter);
    this.appendDataInPage()
  }
  previousChapter(){
    const previouschapter = this.ChapterContent.chapNumber-1;

    let newurl = this.location.path().replace(String(this.ChapterContent.chapNumber), String(previouschapter));
    this.location.go(newurl);

    this.bookReaderservice.getChapterText(previouschapter);    
  }
  appendDataInPage(){
    const text = this.ChapterContent.text.replace(/(?:\r\n|\r|\n)/g, '<br>');

    var $divContent = document.getElementsByName("chapterContent")[0];
    $divContent.innerHTML = "";
    $divContent.insertAdjacentHTML('beforeend', text);
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
   
  }
  
}
