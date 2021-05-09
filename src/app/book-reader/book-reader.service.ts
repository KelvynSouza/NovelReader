import { Injectable, EventEmitter, OnDestroy } from "@angular/core";
import { Observable, Subject, BehaviorSubject, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ChapterList } from "./model/chapterlist-model";
import { ChapterContent } from "./model/chaptercontent-model";
import { resolve } from "url";
import { rejects } from "assert";
const config = require('../../configs/appsettings.json');


@Injectable()
export class BookReaderService {

    private chapterList: any = new BehaviorSubject<ChapterList[]>(null);
    chapterlist$ = this.chapterList.asObservable();

    private chapterContent: any = new BehaviorSubject<ChapterContent>(null);
    chapterContent$ = this.chapterContent.asObservable();


    constructor(private http: HttpClient) { }

    getChapterTitles() {
        this.http.get(config.BookReaderHost + '/api/novel/',
            { observe: 'body', responseType: 'json' })
            .subscribe(e => this.chapterList.next(e))
    }

    getChapterText(chnumber: any) {
        this.http.get(config.BookReaderHost + '/api/novel/' + chnumber,
            { observe: 'body', responseType: 'json' })
            .subscribe(
                e => this.chapterContent.next(e)
                )
    }

    postFillDatabaseChapters() {
        return this.http.post(config.BookReaderHost + '/api/novel/FillDatabase',
            { observe: 'body', responseType: 'json' }).toPromise()            
    }

    postFillDatabaseChaptersByFile(data:FormData) {
        return this.http.post(config.BookReaderHost + '/api/novel/FillDatabaseFile',
            data,{ observe: 'body', responseType: 'json' }).toPromise()
    }

}
