import {Injectable} from "@angular/core";
import {Customer} from "../models/customer";
import {Storage} from "./storage";
import {Repository} from "./repository";

@Injectable({providedIn: 'root'})
export class CustomerRepository extends Repository<Customer> {

  constructor(storage: Storage) {
    super(storage);
  }

  findByEmail(email: string): Customer | undefined {
    const search = email.toLowerCase();
    return this.items.find(x => x.email.toLowerCase() === search);
  }

  findByCredentials(firstName: string, lastName: string, birthDate: Date): Customer | undefined {
    return this.items.find(x => {
      return x.firstName == firstName && x.lastName == lastName && x.birthDate.toDateString() == birthDate.toDateString();
    });
  }
}
