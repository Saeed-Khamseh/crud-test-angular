import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ControlsOf} from "../components/customer-list/customer-list.component";
import {PhoneNumberType, PhoneNumberUtil} from "google-libphonenumber";
import {delay, map, of} from "rxjs";
import {Customer} from "./customer";
import {CustomerRepository} from "../services/customer-repository";

export class CustomerForm extends FormGroup<ControlsOf<Customer>> {

  readonly mobileNumberValidator: ValidatorFn = (control: AbstractControl<string>) => {
    try {
      const numberUtil = PhoneNumberUtil.getInstance();
      return numberUtil.isPossibleNumberForType(numberUtil.parse(control.value), PhoneNumberType.MOBILE) ? null : {pattern: true};
    } catch (e) {
      return {pattern: true};
    }
  };

  readonly emailUniquenessValidator: AsyncValidatorFn = (control: AbstractControl<string>) => {
    return of(control.value).pipe(delay(300), map((email) => this.repository.findByEmail(email)),
      map((foundCustomer) => foundCustomer == null || foundCustomer.id == this.controls.id.value ? null : {duplicate: true}));
  };

  readonly customerUniquenessValidator: AsyncValidatorFn = (control: AbstractControl<Customer>) => {
    return of(control.value).pipe(delay(300), map((x) => this.repository.findByCredentials(x.firstName, x.lastName, x.birthDate)),
      map((foundCustomer) => foundCustomer == null || foundCustomer.id == this.controls.id.value ? null : {duplicate: true}));
  };

  constructor(private readonly repository: CustomerRepository) {
    super({
      id: new FormControl('', {nonNullable: true}),
      firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
      bankAccountNumber: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
      birthDate: new FormControl(new Date(), {nonNullable: true, validators: [Validators.required]}),
      phoneNumber: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    });
    this.controls.email.addAsyncValidators(this.emailUniquenessValidator)
    this.controls.phoneNumber.addValidators(this.mobileNumberValidator);
    this.addAsyncValidators(this.customerUniquenessValidator);
  }
}
