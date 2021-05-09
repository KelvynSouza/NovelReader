import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent  } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialModule } from 'app/tests-list/material-module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { SettingsModalComponent } from './navbar/settings-modal/settings-modal.component';
import { SnackbarComponent } from './navbar/snackbar/snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,    
    MaterialModule
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    SettingsModalComponent,
    SnackbarComponent     
  ],
  exports: [
    NavbarComponent,
    SidebarComponent 
  ],
  entryComponents:[SnackbarComponent],
  providers:[]
})
export class ComponentsModule { }
