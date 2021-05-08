import { Injectable, EventEmitter, OnDestroy } from "@angular/core";

import { convertToBaseTests } from "./adapter/nunitAdapter";
import { BaseTests } from "./model/baseTests";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { resolve } from "dns";

@Injectable()
export class TestsListService {
  private testsSubject: any = new BehaviorSubject<BaseTests>(null);
  testsSubject$ = this.testsSubject.asObservable();

  constructor() {}

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
    return new Promise<BaseTests>((resolve, reject)=> {
     
        //var lstorage = localStorage.getItem("xmlTest");
        //var xmlString: string;
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
        resultJson = convertToBaseTests(resultJson);
        resolve(resultJson);
      
    });
  }

  setTests(xmlString: string) {
    this.processTests(xmlString).then(e => {
      this.testsSubject.next(e);
    });
  }
  
}
