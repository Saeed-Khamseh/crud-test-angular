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

  delete(element: T): boolean {
    const indexOf = this.items.indexOf(element);
    if (indexOf < 0) return false;
    this.items.splice(indexOf, 1);
    this._changes$.next();
    return true;
  }

  getAll(): T[] {
    return [...this.items];
  }
}

@Injectable({providedIn: 'root'})
export class CustomerRepository extends Repository<Customer> {
}
