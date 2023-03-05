import {Subject} from "rxjs";
import {Customer} from "./components/customer-list/customer-list.component";
import {Injectable} from "@angular/core";

export abstract class Repository<T extends object> {

  private items: T[] = [];
  private readonly _changes$ = new Subject<void>();
  readonly changes$ = this._changes$.asObservable();

  create(item: T) {
    this.items.push(item);
    this._changes$.next();
  }

  getAll(): T[] {
    return [...this.items];
  }
}

@Injectable({providedIn: 'root'})
export class CustomerRepository extends Repository<Customer> {
}
