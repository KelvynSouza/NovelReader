import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BookReaderComponent } from "./book-reader.component";
import { BookChapterModule } from "./book-chapter/book-chapter.module";
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material-module';
@NgModule({
  declarations: [BookReaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BookChapterModule,
    MaterialModule
  ],
  providers: []
})
export class BookReaderModule {}
