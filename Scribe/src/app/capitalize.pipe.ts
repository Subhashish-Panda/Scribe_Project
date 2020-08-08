import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let firstchar=value.substring(0,1);
    let remchar=value.substring(1,value.length);
    let newvalue=firstchar.toUpperCase()+remchar.toLowerCase();
    return newvalue;
  }

}
