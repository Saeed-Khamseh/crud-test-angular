import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ControlsOf, Customer} from "../customer-list/customer-list.component";
import {CustomerRepository} from "../../repository";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.scss']
})
export class CustomerComponent implements OnInit {

  readonly form = new FormGroup<ControlsOf<Customer>>({
    firstName: new FormControl('', {nonNullable: true}),
    lastName: new FormControl('', {nonNullable: true}),
    email: new FormControl('', {nonNullable: true}),
    bankAccountNumber: new FormControl('', {nonNullable: true}),
    birthDate: new FormControl(new Date(), {nonNullable: true}),
    phoneNumber: new FormControl('', {nonNullable: true}),
  });

  constructor(private readonly repository: CustomerRepository, private readonly dialogRef: MatDialogRef<CustomerComponent>) {
  }

  ngOnInit(): void {
    this.form.patchValue({firstName: 'name', lastName: 'family', email: 'dummy@example.com', phoneNumber: '+98123445',
      birthDate: new Date(), bankAccountNumber: '12345'});
  }

  save() {
    this.repository.create(this.form.getRawValue());
    this.dialogRef.close(true);
  }
}
