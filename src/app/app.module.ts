import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './tests-list/material-module';
import { TestsListModule } from './tests-list/tests-list.module';
import { TestsListService } from './tests-list/tests-list.service';
import { BookReaderModule } from './book-reader/book-reader.module';
import { BookReaderService } from './book-reader/book-reader.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    NgbModule,
    MaterialModule,
    AppRoutingModule,    
    TestsListModule,
    BookReaderModule
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [
    TestsListService,
    BookReaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
