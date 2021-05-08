import { Injectable, EventEmitter, OnDestroy } from "@angular/core";
import { Observable, Subject, BehaviorSubject,throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import { ChapterList } from "./model/chapterlist-model";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class BookReaderService {
  
  private chapterList: any = new BehaviorSubject<ChapterList[]>(null);
  chapterlist$ = this.chapterList.asObservable();

  constructor(private http: HttpClient) {}

  getChapterTitles(){
    var corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'      
    });
    
    this.http.get(
    'https://localhost:44333/api/novel/', 
    {observe: 'body', responseType: 'json', headers:corsHeaders})
    .subscribe(e=>this.chapterList.next(e))
  }

  private getXML(path: string) {
    if (path == "") {
      path = "../../assets/xml/TestsService.xml";
    }
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send();
    return request;
  }

  private processTests(xmlString: string) {
    return new Promise<ChapterList>((resolve, reject)=> {
     
        if (xmlString =="") {
          var xmlDoc = this.getXML(xmlString);
          xmlString = new XMLSerializer().serializeToString(xmlDoc.responseXML);
        } 
        
        var convert = require("xml2js");
        var parser = new convert.Parser({
          mergeAttrs: true,
          explicitArray: false
        });
        var resultJson: any;
        parser.parseString(xmlString, function(err, result) {
          resultJson = result;
        });        
        resolve(resultJson);
      
    });
  }

  setTests(xmlString: string) {
    this.processTests(xmlString).then(e => {
      this.chapterList.next(e);
    });
  }
  
}
