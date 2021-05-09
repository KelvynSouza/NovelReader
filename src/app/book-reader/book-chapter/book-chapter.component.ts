import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-book-chapter',
  templateUrl: './book-chapter.component.html',
  styleUrls: ['./book-chapter.component.css']
})
export class BookChapterComponent implements OnChanges {
 
  @Input() ChapterReceived: string;  
  Chapter:string;
  ChapterNumber:Number;

  constructor( private route: ActivatedRoute,) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.ChapterNumber = params['chnumber'];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currentChapter = changes.ChapterReceived.currentValue;
    if (currentChapter != undefined || currentChapter != null) {      
      this.Chapter = this.ChapterReceived;    
    }
  }
 

  
}
