import {Pipe, PipeTransform} from '@angular/core';

// source code taken from ng-as library: https://github.com/nigrosimone/ng-as

@Pipe({name: 'as', pure: true})
export class CastPipe implements PipeTransform {
  transform<T>(input: unknown, baseItem: T | undefined): T {
    return input as unknown as T;
  }
}
