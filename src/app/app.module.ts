import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CdkTableModule } from '@angular/cdk/table';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import {
    // MdAutocompleteModule,
    // MdButtonModule,
    // MdButtonToggleModule,
    // MdCardModule,
    // MdCheckboxModule,
    // MdChipsModule,
    // MdDatepickerModule,
    // MdDialogModule,
    // MdExpansionModule,
    MdGridListModule,
    // MdIconModule,
    // MdInputModule,
    MdListModule,
    // MdMenuModule,
    // MdNativeDateModule,
    MdPaginatorModule,
    // MdProgressBarModule,
    // MdProgressSpinnerModule,
    // MdRadioModule,
    // MdRippleModule,
    // MdSelectModule,
    // MdSidenavModule,
    // MdSliderModule,
    // MdSlideToggleModule,
    // MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    // MdTabsModule,
    // MdToolbarModule,
    // MdTooltipModule,
    // MdStepperModule,
} from '@angular/material';

import { routing} from './app.routes';

import { AppComponent }  from './app.component';
import { EmployeeListComponent } from './employee-list.component';
import { AddEmployeeComponent } from './add-employee.component';
import { EditEmployeeComponent } from './edit-employee.component';
import { TaskDetailComponent } from'./task-detail.component';
import { FileUploaderComponent } from './file-uploader.component';


@NgModule({
  exports: [
      CdkTableModule,
      // MdAutocompleteModule,
      // MdButtonModule,
      // MdButtonToggleModule,
      // MdCardModule,
      // MdCheckboxModule,
      // MdChipsModule,
      // MdStepperModule,
      // MdDatepickerModule,
      // MdDialogModule,
      // MdExpansionModule,
      MdGridListModule,
      // MdIconModule,
      // MdInputModule,
      MdListModule,
      // MdMenuModule,
      // MdNativeDateModule,
      MdPaginatorModule,
      // MdProgressBarModule,
      // MdProgressSpinnerModule,
      // MdRadioModule,
      // MdRippleModule,
      // MdSelectModule,
      // MdSidenavModule,
      // MdSliderModule,
      // MdSlideToggleModule,
      // MdSnackBarModule,
      MdSortModule,
      MdTableModule,
      // MdTabsModule,
      // MdToolbarModule,
      // MdTooltipModule,
  ]
})
export class PlunkerMaterialModule {}

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, routing, FormsModule, HttpModule, PlunkerMaterialModule, NgbModule.forRoot() ],
  declarations: [ AppComponent, EmployeeListComponent, AddEmployeeComponent, EditEmployeeComponent, TaskDetailComponent, FileUploaderComponent ],
  entryComponents: [
      TaskDetailComponent,
  ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
