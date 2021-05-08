import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import {  TestsGroup, TestClass } from '../model/baseTests';

@Component({
  selector: 'app-tests-classes',
  templateUrl: './tests-classes.component.html',
  styleUrls: ['./tests-classes.component.css']
})
export class TestsClassesComponent implements OnChanges {
 
  @Input() Tests: TestClass[];
  Test: TestClass[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    let currentTests = changes.Tests.currentValue;
    if (currentTests != undefined || currentTests != null) {      
      this.Test = this.Tests;    
    }
  }
  constructor() {}

  
}
