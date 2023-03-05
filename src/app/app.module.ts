import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {CustomerComponent} from "./components/customer/customer.component";
import {CustomerListComponent} from "./components/customer-list/customer-list.component";

@NgModule({
  declarations: [AppComponent, CustomerComponent, CustomerListComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
