import {shareReplay, Subject} from "rxjs";
import {Customer, Identifiable} from "./components/customer-list/customer-list.component";
import {Injectable} from "@angular/core";
import {Storage} from "./storage";

export abstract class Repository<T extends Identifiable> {
  readonly storageKey = 'customer-repository';
  protected items: T[] = [];
  private readonly _changes$ = new Subject<void>();
  readonly changes$ = this._changes$.asObservable().pipe(shareReplay(1));

  protected constructor(protected storage: Storage) {
    // it's not performance friendly to rewrite back all items into local storage on every change. but that's the simplest solution.
    this.changes$.subscribe(() => this.storage.save(this.storageKey, this.getAll()));
    this.items = this.storage.load(this.storageKey) ?? [];
    this._changes$.next();
  }

  create(item: T) {
    // here we assign a random id to the element; Better use a solution like UUID, but let's keep things simple for now.
    item.id = Math.floor(Math.random() * Date.now()).toString(16);
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
