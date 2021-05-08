import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookChapterComponent } from './book-chapter.component';

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
    BookChapterComponent
  ],
  exports:[BookChapterComponent]
})
export class BookChapterModule { }
