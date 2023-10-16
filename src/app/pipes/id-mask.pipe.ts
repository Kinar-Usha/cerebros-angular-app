import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idMask'
})
export class IdMaskPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) {
      return '';
    }
    const maskedValue = value.replace(/[0-9]/g, 'X');
    return value.substring(0, 4) + maskedValue.substring(4);
  }

}
