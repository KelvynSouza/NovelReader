import { Injectable, EventEmitter, OnDestroy } from "@angular/core";
import { Observable, Subject, BehaviorSubject,throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ChapterList } from "./model/chapterlist-model";
const config = require('../../configs/appsettings.json');


@Injectable()
export class BookReaderService {
  
  private chapterList: any = new BehaviorSubject<ChapterList[]>(null);
  chapterlist$ = this.chapterList.asObservable();

  constructor(private http: HttpClient) {}

  getChapterTitles(){    
    this.http.get(config.BookReaderHost+'/api/novel/', 
    {observe: 'body', responseType: 'json'})
    .subscribe(e=>this.chapterList.next(e))
  }
  
  
}
