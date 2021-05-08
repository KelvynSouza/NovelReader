import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { BookReaderService } from "./book-reader.service";
import { ChapterList } from "./model/chapterlist-model";
import { Subscriber, Subscription } from "rxjs";

@Component({
  selector: "app-book-reader",
  templateUrl: "./book-reader.component.html",
  styleUrls: ["./book-reader.component.css"]
})
export class BookReaderComponent implements OnInit, OnDestroy {
  cpList: ChapterList[];
  subscriber: Subscription;
  display:boolean = false;
  constructor(private bookReaderservice: BookReaderService) {}
  
  ngOnInit() {
    this.bookReaderservice.getChapterTitles();
    this.subscriber = this.bookReaderservice.chapterlist$.subscribe(e => {
      this.cpList = e;
    });
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
   
  }
  
}
