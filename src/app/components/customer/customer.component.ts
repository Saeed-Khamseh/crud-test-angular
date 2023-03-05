import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ControlsOf, Customer} from "../customer-list/customer-list.component";
import {CustomerRepository} from "../../repository";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.scss']
})
export class CustomerComponent implements OnInit {

  readonly form = new FormGroup<ControlsOf<Customer>>({
    id: new FormControl('', {nonNullable: true}),
    firstName: new FormControl('', {nonNullable: true}),
    lastName: new FormControl('', {nonNullable: true}),
    email: new FormControl('', {nonNullable: true}),
    bankAccountNumber: new FormControl('', {nonNullable: true}),
    birthDate: new FormControl(new Date(), {nonNullable: true}),
    phoneNumber: new FormControl('', {nonNullable: true}),
  });

  constructor(private readonly repository: CustomerRepository, private readonly dialogRef: MatDialogRef<CustomerComponent>
    , @Inject(MAT_DIALOG_DATA) public readonly editData?: Customer) {
    this.form.reset(editData ?? {
      firstName: 'name', lastName: 'family', email: 'dummy@example.com', phoneNumber: '+98123445',
      birthDate: new Date(), bankAccountNumber: '12345'
    });
  }

  ngOnInit(): void {
  }

  save() {
    const value = this.form.getRawValue();
    if (this.editData) this.repository.update(value); else this.repository.create(value);
    this.dialogRef.close(true);
  }
}
