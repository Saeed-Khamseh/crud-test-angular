import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CustomerComponent} from "../customer/customer.component";
import {FormControl} from "@angular/forms";
import {debounceTime, Subscription} from "rxjs";
import {Customer} from "../../models/customer";
import {CustomerRepository} from "../../services/customer-repository";

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: FormControl<T[K]>;
};


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

  openDialog(initialData?: Customer) {
    this.dialog.open<CustomerComponent, any, Customer>(CustomerComponent, {data: initialData});
  }

  ngOnDestroy() {
    this._repositorySub.unsubscribe();
  }

  delete(element: Customer) {
    if (!confirm('Are you sure?')) return;
    this.repository.delete(element);
  }
}
