import {shareReplay, Subject} from "rxjs";
import {Storage} from "./storage";
import {Identifiable} from "../models/customer";

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

