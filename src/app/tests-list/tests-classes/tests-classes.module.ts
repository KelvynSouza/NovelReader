import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsClassesComponent } from './tests-classes.component';
import { TestsMethodComponent } from './tests-method/tests-method.component';

import {MaterialModule} from '../material-module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule
  ],
  declarations: 
  [
    TestsClassesComponent,
    TestsMethodComponent
  ],
  exports:[TestsClassesComponent]
})
export class TestsClassesModule { }
