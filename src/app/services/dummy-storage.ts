import {Injectable} from "@angular/core";
import {Storage} from "./storage";

@Injectable()
export class DummyStorage extends Storage {

  override save(key: string, value: any) {
  }

  override load(key: string): any {
    return null;
  }

}
