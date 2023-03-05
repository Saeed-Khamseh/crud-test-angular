import {Subject} from "rxjs";
import {Customer, Identifiable} from "./components/customer-list/customer-list.component";
import {Injectable} from "@angular/core";

export abstract class Repository<T extends Identifiable> {

  private items: T[] = [];
  private readonly _changes$ = new Subject<void>();
  readonly changes$ = this._changes$.asObservable();

  create(item: T) {
    // here we assign a random id to the element; Better use a solution like UUID, but let's keep things simple for now.
    item.id = Math.floor(Math.random() * Date.now()).toString(16);
    console.log(item.id, 'item id');
    this.items.push(item);
    this._changes$.next();
  }

  update(item: T) {
    const foundIndex = this.items.findIndex(x => x.id == item.id);
    if (foundIndex < 0) throw new Error(`Unable to find any item with given id of '${item.id}'`);
    this.items[foundIndex] = item;
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
