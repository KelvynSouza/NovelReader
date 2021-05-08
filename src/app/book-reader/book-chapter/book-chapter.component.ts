import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChapterList } from '../model/chapterlist-model';

@Component({
  selector: 'app-book-chapter',
  templateUrl: './book-chapter.component.html',
  styleUrls: ['./book-chapter.component.css']
})
export class BookChapterComponent implements OnChanges {
 
  @Input() ChapterReceived: string;  
  Chapter:string;
  ngOnChanges(changes: SimpleChanges): void {
    let currentChapter = changes.ChapterReceived.currentValue;
    if (currentChapter != undefined || currentChapter != null) {      
      this.Chapter = this.ChapterReceived;    
    }
  }
  constructor() {}

  
}
