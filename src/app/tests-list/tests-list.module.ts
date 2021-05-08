import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { TestsListComponent } from "./tests-list.component";
import { TestsClassesModule } from "./tests-classes/tests-classes.module";
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material-module';
@NgModule({
  declarations: [TestsListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TestsClassesModule,
    MaterialModule
  ],
  providers: []
})
export class TestsListModule {}
