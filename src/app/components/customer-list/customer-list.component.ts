import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CustomerComponent} from "../customer/customer.component";

export interface Customer {
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
export class CustomerListComponent {
  readonly columns: (keyof Customer)[] = ['firstName', 'lastName', 'birthDate', 'phoneNumber', 'email', 'bankAccountNumber'];
  readonly customers: Customer[] = [
    {
      firstName: 'Saeed', lastName: 'Khamseh', phoneNumber: '+98935426262', birthDate: new Date(), email: 'saeed.khamseh67@gmail.com', bankAccountNumber: '1111'
    },
  ];

  constructor(private readonly dialog: MatDialog) {
  }

  add() {
    this.dialog.open(CustomerComponent);
  }
}
