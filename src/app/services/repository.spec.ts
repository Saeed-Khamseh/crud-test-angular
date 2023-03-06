import {TestBed} from '@angular/core/testing';
import {Customer} from "../models/customer";
import {CustomerRepository} from "./customer-repository";
import {DummyStorage} from "./dummy-storage";

describe('CustomerRepository', () => {
  let service: CustomerRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new CustomerRepository(new DummyStorage());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should add a new item', () => {
    service.create(<any>{firstName: 'test', lastName: 'test'});
    expect(service.getAll().length).toBe(1);
  });

  it('delete should remove item', () => {
    // arrange
    let element: Customer = <any>{firstName: 'test', lastName: 'test'};
    service.create(element);
    // act
    service.delete(element);
    // assert
    expect(service.getAll().length).toBe(0);
  });
});
