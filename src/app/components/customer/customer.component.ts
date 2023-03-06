import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerForm} from "../../models/customer.form";
import {Customer} from "../../models/customer";
import {CustomerRepository} from "../../services/customer-repository";

@Component({
  selector: 'customer',
  templateUrl: 'customer.component.html',
  styleUrls: ['customer.component.scss']
})
export class CustomerComponent {

  readonly form = new CustomerForm(this.repository);

  constructor(private readonly repository: CustomerRepository, private readonly dialogRef: MatDialogRef<CustomerComponent>
    , @Inject(MAT_DIALOG_DATA) public readonly editData?: Customer) {
    this.form.reset(editData ?? {});
  }

  save() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;
    const value = this.form.getRawValue();
    if (this.editData) this.repository.update(value); else this.repository.create(value);
    this.dialogRef.close(true);
  }
}
