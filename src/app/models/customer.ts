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
