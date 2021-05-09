import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { TestsListModule } from 'app/tests-list/tests-list.module';
import { BookReaderModule} from '../../book-reader/book-reader.module';
import { BookChapterModule} from '../../book-reader/book-chapter/book-chapter.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    TestsListModule,
    BookReaderModule,
    BookChapterModule
  ],
  declarations: [
    
  ]
})

export class AdminLayoutModule {}
