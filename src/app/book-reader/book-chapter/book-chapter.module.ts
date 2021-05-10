import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookChapterComponent } from './book-chapter.component';

import {MaterialModule} from '../material-module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MaterialModule,
    RouterModule
  ],
  declarations: 
  [
    BookChapterComponent
  ],
  exports:[BookChapterComponent]
})
export class BookChapterModule { }
