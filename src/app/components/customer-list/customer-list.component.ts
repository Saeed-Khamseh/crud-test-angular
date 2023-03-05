import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CustomerComponent} from "../customer/customer.component";
import {FormControl} from "@angular/forms";
import {CustomerRepository} from "../../repository";
import {debounceTime, Subscription} from "rxjs";

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: FormControl<T[K]>;
};

export interface Identifiable {
  id: string;
}

export interface Customer extends Identifiable {
  firstName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  bankAccountNumber: string;
}

@Component({
  selector: 'customer-list',
  templateUrl: 'customer-list.component.html',
  styleUrls: ['customer-list.component.scss']
})
export class CustomerListComponent implements OnDestroy {
  readonly Customer!: Customer;
  readonly columns: (keyof Customer)[] = ['firstName', 'lastName', 'birthDate', 'phoneNumber', 'email', 'bankAccountNumber'];
  customers: Customer[] = [];
  private readonly _repositorySub: Subscription;

  constructor(private readonly dialog: MatDialog, private readonly repository: CustomerRepository) {
    this._repositorySub = this.repository.changes$.pipe(debounceTime(100)).subscribe(() => this.customers = this.repository.getAll());
  }

  add() {
    this.dialog.open(CustomerComponent);
  }

  ngOnDestroy() {
    this._repositorySub.unsubscribe();
  }

  delete(element: Customer) {
    if (!confirm('Are you sure?')) return;
    this.repository.delete(element);
  }

  edit(element: Customer) {
    this.dialog.open<CustomerComponent, any, Customer>(CustomerComponent, {data: element});
  }
}
