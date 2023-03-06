import {Injectable} from "@angular/core";
import {Storage} from "./storage";

@Injectable({providedIn: 'root'})
export class LocalStorage extends Storage {

  readonly iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  override save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value, (key, value) => value instanceof Date ? value.toISOString() : value));
  }

  override load(key: string): any {
    const item = localStorage.getItem(key);
    if (item == null) return null;
    try {
      return JSON.parse(item, (key, value) => this.iso8601.test(value) ? new Date(value) : value);
    } catch (e) {
      return null;
    }
  }
}
