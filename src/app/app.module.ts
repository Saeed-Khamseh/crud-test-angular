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

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, CustomerComponent, CustomerListComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatTableModule, MatDialogModule, MatInputModule, MatButtonModule],
  providers: []
})
export class AppModule {
}
