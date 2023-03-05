import {Component, Inject} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators} from "@angular/forms";
import {ControlsOf, Customer} from "../customer-list/customer-list.component";
import {CustomerRepository} from "../../repository";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {delay, map, of, timer} from "rxjs";

@Component({
  selector: 'customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.scss']
})
export class CustomerComponent {

  readonly emailUniquenessValidator: AsyncValidatorFn = (control: AbstractControl<string>) => {
    return of(control.value).pipe(delay(300), map((email) => this.repository.findByEmail(email)),
      map((foundCustomer) => foundCustomer == null || foundCustomer.id == this.form.controls.id.value ? null : {duplicate: true}));
  };

  readonly customerUniquenessValidator: AsyncValidatorFn = (control: AbstractControl<Customer>) => {
    return of(control.value).pipe(delay(300), map((x) => this.repository.findByCredentials(x.firstName, x.lastName, x.birthDate)),
      map((foundCustomer) => foundCustomer == null || foundCustomer.id == this.form.controls.id.value ? null : {duplicate: true}));
  };

  readonly form = new FormGroup<ControlsOf<Customer>>({
    id: new FormControl('', {nonNullable: true}),
    firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email], asyncValidators: [this.emailUniquenessValidator]}),
    bankAccountNumber: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    birthDate: new FormControl(new Date(), {nonNullable: true, validators: [Validators.required]}),
    phoneNumber: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  }, {asyncValidators: this.customerUniquenessValidator});

  constructor(private readonly repository: CustomerRepository, private readonly dialogRef: MatDialogRef<CustomerComponent>
    , @Inject(MAT_DIALOG_DATA) public readonly editData?: Customer) {
    this.form.reset(editData ?? {
      firstName: 'name', lastName: 'family', email: 'dummy@example.com', phoneNumber: '+98123445',
      birthDate: new Date(), bankAccountNumber: '12345'
    });
  }

  save() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    const value = this.form.getRawValue();
    if (this.editData) this.repository.update(value); else this.repository.create(value);
    this.dialogRef.close(true);
  }
}
