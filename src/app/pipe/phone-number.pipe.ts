import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    return `${value.toString().slice(0, 3)}-${value.toString().slice(3, 6)}-${value.toString().slice(6, 10)}`;
  }

}
