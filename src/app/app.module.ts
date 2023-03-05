import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CustomerComponent} from "./components/customer/customer.component";
import {CustomerListComponent} from "./components/customer-list/customer-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {DateAdapter, MatNativeDateModule, NativeDateAdapter} from "@angular/material/core";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from "@angular/material/form-field";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, CustomerComponent, CustomerListComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatTableModule, MatDialogModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatIconModule,
    MatNativeDateModule],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: <MatFormFieldDefaultOptions>{appearance: 'outline', hideRequiredMarker: true}},
  ]
})
export class AppModule {
}
