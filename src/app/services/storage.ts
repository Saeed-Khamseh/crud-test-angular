export abstract class Storage {

  abstract save(key: string, value: any): void;

  abstract load(key: string): any;
}

