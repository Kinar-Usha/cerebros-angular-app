import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hyphenate'
})
export class HyphenatePipe implements PipeTransform {
  transform(value: string, country: string): string {
    if (!value) {
      return '';
    }

    let pattern: string;

    if (country === 'INDIA') {
      pattern = 'XXXX-XXXX-XXXX';
    } else if (country === 'USA') {
      pattern = 'XXX-XX-XXXX';
    } else if (country === 'IRELAND') {
      pattern = 'A0000000';
    } else {
      pattern = '';
    }

    value = value.replace(/[^A-Z0-9]/g, ''); // Remove non-numeric characters
    let formattedValue = '';

    let j = 0;
    for (let i = 0; i < pattern.length; i++) {
      if (pattern.charAt(i) === 'A') {
        if (j < value.length) {
          formattedValue += value.charAt(j);
          j++;
        }
      }
      else if (pattern.charAt(i) === '-') {
        formattedValue += '-';
      } else if (pattern.charAt(i) === 'X' || pattern.charAt(i) === '0') {
        if (j < value.length) {
          formattedValue += value.charAt(j);
          j++;
        }
      } else {
        formattedValue += pattern.charAt(i);
      }
    }

    // Format the value using regular expressions
    if (country === 'INDIA') {
      formattedValue = formattedValue.replace(/^(\d{4})(\d{4})(\d{4})$/, '$1-$2-$3');
    } else if (country === 'USA') {
      formattedValue = formattedValue.replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
    } else if (country === 'IRELAND') {
      formattedValue = formattedValue.replace(/^([A-Z])(\d{7})$/, '$1$2');
    }

    // Restrict typing once the pattern length is reached
    if (formattedValue.length >= pattern.length) {
      console.log('formattedValue.length >= pattern.length', formattedValue);
      // disable adding more characters
      let input = document.getElementById('idNumber');
      if (input) {
        input.setAttribute('maxlength', pattern.length.toString());
      }

    }

    return formattedValue;
  }
}